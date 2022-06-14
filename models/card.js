const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Текст должен быть не короче 2 символов'],
      maxlength: [30, 'Текст должен быть не длиннее 30 символов'],
    },
    link: {
      type: String,
      required: [true, 'Поле "link" должно быть заполнено'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
