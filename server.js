// 匯入 Express 和 path 模組
const express = require('express');
const path = require('path');
const app = express(); // 建立 Express 應用程式實例
const pool = require('./db'); // 引入資料庫連線池模組


// 匯入路由模組
const customerRoutes = require('./routes/customer');

// 設定 EJS 樣板引擎和 Views 資料夾
app.set('view engine', 'ejs');
// 假設 views 資料夾在根目錄中，使用 path.join 來確保路徑正確
app.set('views', path.join(__dirname, 'views')); 

// 設定靜態檔案路徑讀取public資料夾中的CSS, JS, images
app.use(express.static(path.join(__dirname, 'public'))); 
// 啟用中介軟體：讓 Express 能夠解析 POST 請求中的表單數據
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 攔截 /favicon.ico 請求，並回傳 204 No Content, 告訴瀏覽器：「請求成功，但沒有內容可以回傳」
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); 
});

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

async function startServer() {
    try {
        // 🎯 測試資料庫連線：從連線池中獲取一個連線，確認服務器是否正常運行
        const connection = await pool.getConnection();
        console.log('資料庫連線測試成功！');
        connection.release(); // 釋放連線

        // 資料庫連線成功後才啟動伺服器
        app.listen(port, () => {
            console.log(`伺服器運行在 http://${ip}:${port}`);
        });
    } catch (err) {
        // 如果資料庫連線失敗，則印出錯誤並停止應用程式啟動
        console.error('❌ 伺服器啟動失敗：無法連接資料庫！', err.message);
        process.exit(1); 
    }
}

// 啟動伺服器
startServer();


