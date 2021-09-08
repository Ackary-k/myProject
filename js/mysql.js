const mysql = require('mysql');
// 创建连接池
const mysqlConnection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_database',
})

module.exports = mysqlConnection;

