const mysql = require('mysql2/promise'); // 匯入 mysql2 並使用 Promise 版本

// 🌟 資料庫連線設定 (請替換為你的實際資訊)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
    waitForConnections: true,
    connectionLimit: 10, // 設定連線池大小
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
