const {
  verificationUser,
  createUser,
  findUserInfoById,
  updateUserInfoById,
} = require('../controller/userInfoController');

const Router = require('express');
const router = Router();

router.get('/:condition', verificationUser);

router.post('/', createUser);

router.get('/:username', findUserInfoById);

router.put('/:username', updateUserInfoById);

module.exports = router;
