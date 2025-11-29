
const express = require('express');
const router = express.Router(); // 🌟 關鍵：建立 Router 實例

// 處理前端提交表單的 POST 請求
router.post('/submit-customer', (req, res) => {
    // 1. 接收資料：資料會存在 req.body 中
    const customerName = req.body.name; // 來自 input name="name"
    const customerEmail = req.body.email; // 來自 input name="email"
    
    // 2. 進行資料庫操作（下一步）
    console.log(`收到客戶名稱: ${customerName}, 信箱: ${customerEmail}`);

    // 3. 回覆客戶端 (例如：重導向回首頁)
    res.redirect('/'); 
});


module.exports = router; // 將這個路由實例匯出