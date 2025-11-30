
const express = require('express');
const router = express.Router(); // 🌟 關鍵：建立 Router 實例
const bcrypt = require('bcrypt'); // 密碼雜湊
const pool = require('../db');

// 處理前端提交表單的 POST 請求
router.post('/register', async (req, res) => {
    // 接收資料：資料會存在 req.body 中
    const { username, password, email } = req.body;
    console.log(username)
    console.log(password)
    console.log(email)

    // 基礎檢查
    if (!username || !email || !password) {
        // 使用 400 Bad Request
        return res.status(400).send('請填寫所有必要的註冊欄位。');
    }

    // 安全步驟：密碼雜湊 (Hashing)
    const saltRounds = 10; 
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 建立當前時間
    const currentTime = new Date();

    // 資料庫欄位校正
    const sql = `
        INSERT INTO userinformation (user_name, password, email, create_time) 
        VALUES (?, ?, ?, ?)
    `; 
    
    // 將變數綁定 SQL 語句中的?
    const values = [username, password_hash, email, currentTime];

    // 將資料寫入資料庫
    const [result] = await pool.execute(sql, values);

    console.log(`註冊成功！使用者名稱: ${username}, 新增 ID: ${result.insertId}`);

    // 回覆客戶端 (例如：重導向回首頁)
    res.redirect('/'); 
});


module.exports = router; // 將這個路由實例匯出