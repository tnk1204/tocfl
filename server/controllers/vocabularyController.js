const { Vocabulary, Lesson, UserVocabulary } = require('../models');
const { Op } = require('sequelize');
const ApiError = require('../utils/apiError');

// Get all vocabulary items (with pagination and filters)
exports.getAllVocabulary = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 50, 
      lessonId, 
      search, 
      category,
      difficulty 
    } = req.query;
    
    const offset = (page - 1) * limit;
    
    // Build filter conditions
    const where = {};
    
    if (lessonId) {
      where.lessonId = lessonId;
    }
    
    if (search) {
      where[Op.or] = [
        { hanzi: { [Op.like]: `%${search}%` } },
        { pinyin: { [Op.like]: `%${search}%` } },
        { meaning: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (difficulty) {
      where.difficulty = difficulty;
    }
    
    // Execute query
    const { count, rows } = await Vocabulary.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Lesson,
          attributes: ['id', 'titleZh', 'titleVi', 'orderNum']
        }
      ],
      order: [['id', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Get vocabulary item by ID
exports.getVocabularyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const vocabulary = await Vocabulary.findByPk(id, {
      include: [
        {
          model: Lesson,
          attributes: ['id', 'titleZh', 'titleVi', 'orderNum']
        }
      ]
    });
    
    if (!vocabulary) {
      return next(new ApiError(`Vocabulary item not found with id ${id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: vocabulary
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Get vocabulary by lesson ID
exports.getVocabularyByLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    
    const vocabulary = await Vocabulary.findAll({
      where: { lessonId },
      order: [['id', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      count: vocabulary.length,
      data: vocabulary
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Create new vocabulary item (admin only)
exports.createVocabulary = async (req, res, next) => {
  try {
    const { 
      hanzi, 
      pinyin, 
      meaning, 
      lessonId, 
      example, 
      examplePinyin, 
      exampleMeaning,
      audioUrl,
      imageUrl,
      category,
      difficulty
    } = req.body;
    
    // Validate required fields
    if (!hanzi || !pinyin || !meaning || !lessonId) {
      return next(new ApiError('Please provide hanzi, pinyin, meaning and lessonId', 400));
    }
    
    // Check if lesson exists
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      return next(new ApiError(`Lesson not found with id ${lessonId}`, 404));
    }
    
    // Create vocabulary
    const vocabulary = await Vocabulary.create({
      hanzi,
      pinyin,
      meaning,
      lessonId,
      example,
      examplePinyin,
      exampleMeaning,
      audioUrl,
      imageUrl,
      category,
      difficulty: difficulty || 1
    });
    
    res.status(201).json({
      success: true,
      data: vocabulary
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Update vocabulary item (admin only)
exports.updateVocabulary = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const vocabulary = await Vocabulary.findByPk(id);
    
    if (!vocabulary) {
      return next(new ApiError(`Vocabulary item not found with id ${id}`, 404));
    }
    
    // Update vocabulary
    await vocabulary.update(req.body);
    
    res.status(200).json({
      success: true,
      data: vocabulary
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Delete vocabulary item (admin only)
exports.deleteVocabulary = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const vocabulary = await Vocabulary.findByPk(id);
    
    if (!vocabulary) {
      return next(new ApiError(`Vocabulary item not found with id ${id}`, 404));
    }
    
    await vocabulary.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Vocabulary item deleted successfully'
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Get user's flashcards
exports.getUserFlashcards = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { dueOnly = false, lessonId } = req.query;
    
    const where = { userId };
    
    // Filter by lesson if provided
    if (lessonId) {
      where['$Vocabulary.lessonId$'] = lessonId;
    }
    
    // Filter by due date if requested
    if (dueOnly === 'true') {
      where.nextReview = {
        [Op.lte]: new Date()
      };
    }
    
    const flashcards = await UserVocabulary.findAll({
      where,
      include: [
        {
          model: Vocabulary,
          attributes: ['id', 'hanzi', 'pinyin', 'meaning', 'example', 'examplePinyin', 'exampleMeaning', 'audioUrl', 'imageUrl', 'lessonId']
        }
      ],
      order: [['nextReview', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      count: flashcards.length,
      data: flashcards
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Update flashcard review status
exports.updateFlashcardStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { vocabularyId } = req.params;
    const { proficiency } = req.body;
    
    if (proficiency === undefined || proficiency < 0 || proficiency > 5) {
      return next(new ApiError('Please provide a valid proficiency level (0-5)', 400));
    }
    
    // Calculate next review date based on spaced repetition algorithm
    const now = new Date();
    let nextReview;
    
    switch (proficiency) {
      case 0: // Failed completely
        nextReview = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes
        break;
      case 1: // Hard
        nextReview = new Date(now.getTime() + 1 * 60 * 60 * 1000); // 1 hour
        break;
      case 2: // Difficult
        nextReview = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 hours
        break;
      case 3: // Medium
        nextReview = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day
        break;
      case 4: // Easy
        nextReview = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days
        break;
      case 5: // Very easy
        nextReview = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
        break;
      default:
        nextReview = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day
    }
    
    // Find or create user vocabulary entry
    const [userVocabulary, created] = await UserVocabulary.findOrCreate({
      where: { userId, vocabularyId },
      defaults: {
        userId,
        vocabularyId,
        proficiency,
        nextReview,
        reviewCount: 1
      }
    });
    
    // If entry already exists, update it
    if (!created) {
      await userVocabulary.update({
        proficiency,
        nextReview,
        reviewCount: userVocabulary.reviewCount + 1,
        lastPracticed: now
      });
    }
    
    res.status(200).json({
      success: true,
      data: userVocabulary
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Save vocabulary to user's saved list
exports.saveVocabulary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { vocabularyId } = req.params;
    
    // Check if vocabulary exists
    const vocabulary = await Vocabulary.findByPk(vocabularyId);
    if (!vocabulary) {
      return next(new ApiError(`Vocabulary item not found with id ${vocabularyId}`, 404));
    }
    
    // Find or create user vocabulary entry
    const [userVocabulary, created] = await UserVocabulary.findOrCreate({
      where: { userId, vocabularyId },
      defaults: {
        userId,
        vocabularyId,
        isSaved: true
      }
    });
    
    // If entry already exists, update it
    if (!created) {
      await userVocabulary.update({
        isSaved: true
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Vocabulary saved successfully',
      data: userVocabulary
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Remove vocabulary from user's saved list
exports.unsaveVocabulary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { vocabularyId } = req.params;
    
    const userVocabulary = await UserVocabulary.findOne({
      where: { userId, vocabularyId }
    });
    
    if (!userVocabulary) {
      return next(new ApiError(`Vocabulary item not found in user's saved list`, 404));
    }
    
    await userVocabulary.update({
      isSaved: false
    });
    
    res.status(200).json({
      success: true,
      message: 'Vocabulary removed from saved list successfully'
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

// Get user's saved vocabulary
exports.getSavedVocabulary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const savedVocabulary = await UserVocabulary.findAll({
      where: { 
        userId,
        isSaved: true
      },
      include: [
        {
          model: Vocabulary,
          attributes: ['id', 'hanzi', 'pinyin', 'meaning', 'example', 'examplePinyin', 'exampleMeaning', 'audioUrl', 'imageUrl', 'lessonId'],
          include: [
            {
              model: Lesson,
              attributes: ['id', 'titleZh', 'titleVi', 'orderNum']
            }
          ]
        }
      ]
    });
    
    res.status(200).json({
      success: true,
      count: savedVocabulary.length,
      data: savedVocabulary
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
}; 