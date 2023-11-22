'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authenticationV2 } = require('../../utils/authUtils');
const router = express.Router();

//login
router.post('/access/login', asyncHandler(accessController.login));

// signUp
router.post('/access/signup', asyncHandler(accessController.signUp));

// authentication
router.use(authenticationV2);
router.post('/access/logout', asyncHandler(accessController.logout));
router.post('/access/handlerRefreshToken', asyncHandler(accessController.handlerRefreshToken));

module.exports = router;
