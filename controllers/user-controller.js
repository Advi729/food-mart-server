const asyncHandler = require('express-async-handler');
const userHelpers = require('../helpers/user-helper');

// User sign up
const userSignUp = asyncHandler(async(req, res) => {
    try {
        const user = await userHelpers.addUser(req.body);
        if (user) {
            res.json({status: true});
            console.log(user, 'usersrrsignup');
            // res.json(user);
        }
    } catch (error) {
        console.error(error);
    }
});

// User log in 
const userLogIn = asyncHandler(async(req, res) => {
    try {
        const user = await userHelpers.findUser(req.body);
        if (user) {
            res.json({status: true, user});
        }
    } catch (error) {
        console.error('error in login controller: ', error);
    }
});

// update profile image
const updateProfileImage = asyncHandler(async(req, res) => {
    try {
        console.log('in upload controller.');
        const uploaded = await userHelpers.uploadProfile(req);
        if(uploaded) {
            res.json({status: true});
        }
    } catch (error) {
        console.error('error in upload profile controller: ', error);
    }
});

// admin login 
const adminLogIn = asyncHandler(async(req, res) => {
    try {
        const admin = await userHelpers.findAdmin(req.body);
        if (admin) {
            res.json({status: true, admin});
        }
    } catch (error) {
        console.error('error in login controller: ', error);
    }
});

// list of all users
const usersList = asyncHandler(async (req, res) => {
    try {
        const users = await userHelpers.findAllUsers();
        console.log('users in findAllusers: ', users);
        if(users) {
            res.json({users});
        }
    } catch (error) {
        console.error('error in userslist ctrlller: ', error);
    }
});

// delete a user 
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await userHelpers.deleteTheUser(id);
        if (deletedUser) {
            res.json('user deleted.');
        }
    } catch (error) {
        console.error('error in deletesuer controler: ', error);
    }
});

module.exports = { userSignUp, userLogIn, updateProfileImage, adminLogIn, usersList, deleteUser };