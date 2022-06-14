const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Текст должен быть не короче 2 символов'],
      maxlength: [30, 'Текст должен быть не длиннее 30 символов'],
    },
    about: {
      type: String,
      required: [true, 'Поле "about" должно быть заполнено'],
      minlength: [2, 'Текст должен быть не короче 2 символов'],
      maxlength: [30, 'Текст должен быть не длиннее 30 символов'],
    },
    avatar: {
      type: String,
      required: [true, 'Поле "avatar" должно быть заполнено'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
