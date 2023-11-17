var express = require('express');
var router = express.Router();

var api_tg = require('../controllers/api/tacgia.api');
var api_sach = require('../controllers/api/sach.api');
var api_user = require('../controllers/api/user.api');
var api_bluan = require('../controllers/api/bluan.api');

router.get('/tg', api_tg.getListTG);
router.get('/tg/:id', api_tg.getOneTG);
router.post('/tg/add', api_tg.addTG);
router.put('/tg/update/:id', api_tg.updateTG);
router.delete('/tg/delete/:id', api_tg.deleteTG);


router.get('/sach', api_sach.getListSach);
router.get('/sach/:id', api_sach.getOneSach);
router.post('/sach/add', api_sach.addSach);
router.put('/sach/update/:id', api_sach.updateSach);
router.delete('/sach/delete/:id', api_sach.deleteSach);


router.get('/user', api_user.getListUser);
router.get('/user/:id', api_user.getOneUser);
router.post('/user/add', api_user.addUser);
router.put('/user/update/:id', api_user.updateUser);
router.delete('/user/delete/:id', api_user.deleteUser);

router.post('/user/dn', api_user.dangNhap);

router.get('/bluan', api_bluan.getListBLuan);
router.get('/bluan/:id', api_bluan.getOneBluan);
router.post('/bluan/add', api_bluan.addBLuan);
router.put('/bluan/update/:id', api_bluan.updateBLuan);
router.delete('/bluan/delete/:id', api_bluan.deleteBLuan);


module.exports = router;



