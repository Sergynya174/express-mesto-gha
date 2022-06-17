const User = require('../models/user');

const {
  BAD_REQUEST,
  NOT_FOUND,
  ERROR_DEFAULT,
  ERROR_CREATED,
} = require('../utils/error-codes');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(ERROR_CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные ${err.message}` });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные ${err.message}` });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные ${err.message}` });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};
