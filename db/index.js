

// 导入mysql数据库
const mysql=require('mysql2')

// 创建数据库连接
const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'wallts'
})

// 对外暴露数据库
module.exports = db