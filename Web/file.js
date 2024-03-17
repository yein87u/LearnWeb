//添加http模塊
const http = require("http");
const path = require("path");

//用http模塊創建NodeJS後端服務器
const server = http.createServer((request, response) => {
    console.log(request.url, request.method);

    const fs = require("fs");
    //統一讀取、發送html源代碼
    const sendResponse = (filename, statusCode, response, contentType) => {
        fs.readFile(path.join(__dirname, filename), (error, data) => {
            if (error) {
                response.statusCode = 500;
                response.setHeader("Content-Type", "text/plain");
                response.end("Sorry, internal error.");
            } else {
                response.statusCode = statusCode;
                response.setHeader("Content-Type", contentType);
                response.end(data);
            }
        });
    };

    const url = request.url;
    const method = request.method;

    console.log(url);
    console.log(__dirname);

    if (request.method === "GET") {
        if (url === "/") {
            sendResponse("index.html", 200, response, "text/html");
        } else if (url === "/style.css") {
            sendResponse("style.css", 200, response, "text/css");
        } else if (url === "/about.html") {
            sendResponse("about.html", 200, response, "text/html");
        } else {
            sendResponse("404.html", 404, response, "text/html");
        }
    } else {

    }

    //response.end("Hello Node Server!");
});

//服務器會在運行時監聽端口3000，收集客戶端請求
const port = 3000;
const ip = "192.168.1.109";

server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);
});