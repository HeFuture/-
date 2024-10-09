
// 导入数据库连接
const db = require('../db/index')
const { commentCount, likeCount, isLike } = require('./comments')

// 新建walls
exports.insertWall = (req, res) => {
    // data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgurl
    const data = req.body
    const sql = 'insert into walls (type,message,name,userId,moment,label,color,imgurl) values (?,?,?,?,?,?,?,?)'
    db.query(sql, [data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgurl], (err, result) => {
        if (err) {
            return res.send(err)
        }
        res.send({
            status: 0,
            message: '新建成功'
        })
    })
}


// 查询留言墙
exports.findWallPage = (req, res) => {
    const { page, type, label } = req.body
    const pagesize = 5;
    const offset = (page - 1) * pagesize
    let values;
    let sql;
    if (label == -1) {
        sql = `SELECT * FROM walls WHERE type=? ORDER BY moment DESC LIMIT ?, ?;`
        values = [type, offset, pagesize]

    } else {
        sql = `SELECT * FROM walls WHERE type=? AND label=? ORDER BY moment DESC LIMIT ?, ?;`
        values = [type, label, offset, pagesize]
    }
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.send(err)
        }
        // 查找相应 wall 的赞、喜欢、举报、撤销数据、评论数
        for (let i = 0; i < result.length; i++) {
            // 喜欢
            result[i].like = likeCount(result[i].id, 0)
            // 举报
            result[i].report = likeCount(result[i].id, 0)
            // 撤销数据
            result[i].revoke = likeCount(result[i].id, 0)
            // 查询评论总数
            result[i].comcount = commentCount(result[i].id)
            // 点赞
            result[i].islike = isLike(result[i].id, result[i].userId)
        }

        res.send(result)
    })
}

// 获取ip地址
exports.getUserIp = (req, res) => {
    var ip = req.ip
    res.send({
        status: 0,
        ip: ip
    })
}