


// 导入数据库连接
const db = require('../db/index')


// 查询评论总数
exports.commentCount = (id) => {
    const sql = 'SELECT COUNT(*) AS count from comments where wallId=?'
    db.query(sql, [id], (err, result) => {
        return result
    })
}
// 喜欢数量
exports.likeCount = (id, type) => {
    const sql = 'SELECT COUNT(*) AS count FROM feedbacks where wallId=? AND type=?'
    db.query(sql, [id, type], (err, result) => {
        return result
    })
}

// 点赞
exports.isLike = (wallId, userId, type) => {
    const sql = `SELECT COUNT(*) AS count FROM feedbacks where wallId=? AND userId=? AND type=0`
    db.query(sql, [wallId, userId, type], (err, result) => {
        return result
    })
}