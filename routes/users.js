const userRouter = require('express').Router();
const {
  getUsers,
  createUsers,
  getUser,
  putchUserProfile,
  putchUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUsers);
userRouter.patch('/me', putchUserProfile);
userRouter.patch('/me/avatar', putchUserAvatar);

module.exports = userRouter;
