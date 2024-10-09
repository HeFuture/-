
// 登录注册路由组件
var express = require('express');
// 导入路由
var router = express.Router();
const wallHandle = require('../router_handle/walls')

// 新建walls
router.post('/insertWall', wallHandle.insertWall)
// 查询留言墙
router.post('/findWallPage', wallHandle.findWallPage)

// 获取ip地址
router.post('/getUserIp', wallHandle.getUserIp)

module.exports = router;