const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vocabulary = sequelize.define('Vocabulary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hanzi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pinyin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  meaning: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lessonId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'lesson_id'
  },
  example: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  examplePinyin: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'example_pinyin'
  },
  exampleMeaning: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'example_meaning'
  },
  audioUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'audio_url'
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'image_url'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  difficulty: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'vocabulary',
  timestamps: true,
  underscored: true
});

module.exports = Vocabulary; 