'use strict';

const express = require('express');
const khachHangController = require('../../controllers/khachHang.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authenticationV2 } = require('../../utils/authUtils');
const router = express.Router();

// without authentication
router.get('/search/:keySearch', asyncHandler(khachHangController.getListSearchKhachHangs));
router.get('/timkiemnangcao/:keySearch', asyncHandler(khachHangController.searchNangCaoPaginated));

// authentication
router.use(authenticationV2);
router.get('', asyncHandler(khachHangController.getPaginatedKhachHangs));
router.post('', asyncHandler(khachHangController.createKhachHang));
router.patch('/update/:id', asyncHandler(khachHangController.updateKhachHang));
router.patch('/insert', asyncHandler(khachHangController.insertFieldIntoKhachHangs));
router.delete('/:id', asyncHandler(khachHangController.deleteKhachHang));

module.exports = router;
