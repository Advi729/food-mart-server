const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user-controller');
const verifySignUp = require('../middlewares/verify-sign-up');
const authorization = require('../middlewares/auth-jwt');
const multerUpload = require('../middlewares/upload-single-image');

// router.use(function(req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// User sign up
router.post('/api/auth/signup', verifySignUp.checkDuplicateEmail, userControllers.userSignUp);

// User log in 
router.post('/api/auth/login', userControllers.userLogIn);

// User profile image upload
router.post('/api/user/upload', authorization.verifyToken, multerUpload.uploadSinglePhoto, userControllers.updateProfileImage);

// Admin log in 
router.post('/api/auth/admin-login', userControllers.adminLogIn);

// Users list
router.get('/api/admin/users-list', userControllers.usersList);

// delete a user
router.get('/api/admin/delete-user/:id', userControllers.deleteUser);
// authorization
router.get('/api/test/user', authorization.verifyToken, (req, res) => {
  res.json('user logged in.');
})

router.get('/api/test/admin', authorization.verifyToken, authorization.isAdmin, (req, res) => {
  res.json('admin logged in.');
})

module.exports = router;
