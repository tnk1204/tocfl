const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titleZh: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'title_zh'
  },
  titleVi: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'title_vi'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  levelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'level_id'
  },
  orderNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    field: 'order_num'
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'image_url'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'lessons',
  timestamps: true,
  underscored: true
});

module.exports = Lesson; 