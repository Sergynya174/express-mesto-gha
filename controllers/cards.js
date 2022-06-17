const Card = require('../models/card');

const {
  BAD_REQUEST,
  NOT_FOUND,
  ERROR_DEFAULT,
  ERROR_CREATED,
} = require('../utils/error-codes');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(ERROR_CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `Переданы некорректные данные ${err.message}` });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.send({ message: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};
