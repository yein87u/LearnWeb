// 確保在模組最開始就加載環境變數
require('dotenv').config();

const mysql = require('mysql2/promise'); // 匯入 mysql2 並使用 Promise 版本

// 從環境變數 (process.env) 中讀取配置
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// 建立並匯出連線池 (Connection Pool)
const pool = mysql.createPool(dbConfig);

// 測試連線是否成功
pool.getConnection()
    .then(connection => {
        console.log('Database connected successfully! (Pool Check)');
        connection.release(); // 釋放連線回連線池
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });


module.exports = pool; // 匯出連線池供其他模組使用
