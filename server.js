// 匯入 Express 和 path 模組
const express = require('express');
const path = require('path');
const app = express(); // 建立 Express 應用程式實例

// 匯入路由模組
const customerRoutes = require('./routes/customer');

// 設定 EJS 樣板引擎和 Views 資料夾
app.set('view engine', 'ejs');
// 假設 views 資料夾在根目錄中，使用 path.join 來確保路徑正確
app.set('views', path.join(__dirname, 'views')); 

// 設定靜態檔案路徑讀取public資料夾中的CSS, JS, images
app.use(express.static(path.join(__dirname, 'public'))); 
// 🌟 啟用中介軟體：讓 Express 能夠解析 POST 請求中的表單數據
app.use(express.urlencoded({ extended: true }));


// 定義根路徑路由
app.get('/', (req, res) => {
    res.render('index'); 
});

app.get('/:pageName', (req, res) => {
    // 從 URL 中擷取變數
    const page = req.params.pageName; 
    if (page === 'index') {
        res.redirect('/'); 
    }
    res.render(page); // 對應ejs進行渲染
});

app.use(customerRoutes);

// 錯誤頁面路由 (404)，必須放在所有其他路由的最後面
app.use((req, res) => {
    res.status(404).render('404'); // 渲染 views/404.ejs 樣板，並設置狀態碼 404
});





// 服務器會在運行時監聽端口3000，收集客戶端請求
const port = 3000;
const ip = "localhost";

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


