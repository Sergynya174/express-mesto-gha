const Card = require('../models/card');

const {
  ERROR_CODES,
  NOT_FOUND,
  ERROR_DEFAULT,
  ERROR_CREATED,
} = require('../utils/error');

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
        return res.status(ERROR_CODES).send({ message: `Переданы некорректные данные ${err.message}` });
      }
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      res.send({ message: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODES).send({ message: 'Некорректные данные' });
      }
      res.status(ERROR_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODES).send({ message: 'Некорректные данные' });
      }
      res.status(ERROR_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cardData) => {
      if (!cardData) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      res.send({ data: cardData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODES).send({ message: 'Некорректные данные' });
      }
      res.status(ERROR_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};
