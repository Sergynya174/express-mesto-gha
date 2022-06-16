const userRouter = require('express').Router();
const {
  getUsers,
  createUsers,
  getUser,
  patchUserProfile,
  patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', createUsers);
userRouter.patch('/me', patchUserProfile);
userRouter.patch('/me/avatar', patchUserAvatar);

module.exports = userRouter;
