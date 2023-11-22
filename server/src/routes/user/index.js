'use strict';

const express = require('express');
const userController = require('../../controllers/user.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authenticationV2 } = require('../../utils/authUtils');
const router = express.Router();

// without authentication
router.get('/search/:keySearch', asyncHandler(userController.getListSearch));

// authentication
router.use(authenticationV2);
router.get('', asyncHandler(userController.getPaginated));
router.post('', asyncHandler(userController.create));
router.get('/id', asyncHandler(userController.getById));
router.get('/cstc', asyncHandler(userController.getAllByCSTC));
router.patch('/update/:id', asyncHandler(userController.update));
router.patch('/insert', asyncHandler(userController.insertFields));
router.delete('/:id', asyncHandler(userController.delete));

module.exports = router;
