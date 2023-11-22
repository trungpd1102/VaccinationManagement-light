'use strict';

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

// check apikey
router.use(apiKey);
// check permissions
router.use(permission('0000'));

// init routes
router.use('/v1/api/khachhang', require('./khachHang'));
router.use('/v1/api/cosotiemchung', require('./coSoTiemChung'));
router.use('/v1/api/danhsachkho', require('./danhSachKho'));
router.use('/v1/api/nhacungcap', require('./nhaCungCap'));
router.use('/v1/api/hanghoa', require('./hangHoa'));
router.use('/v1/api/dichvu', require('./dichVu'));
router.use('/v1/api/phieu', require('./phieu'));
router.use('/v1/api/user', require('./user'));
router.use('/v1/api/vaitro', require('./vaiTro'));
router.use('/v1/api/hanhchinh', require('./hanhChinh'));
router.use('/v1/api/kho', require('./kho'));
router.use('/v1/api/lichhentiem', require('./lichHenTiem'));
router.use('/v1/api/thongke', require('./thongke'));
// router.use('/v1/api/tonkho', require('./tonKho'));

router.use('/v1/api', require('./access'));

module.exports = router;
