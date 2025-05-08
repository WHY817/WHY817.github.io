const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public')); // 提供前端靜態文件

// 模擬影像數據
const userImages = {
    user1: [
        { id: 1, url: '/images/image1.jpg' },
        { id: 2, url: '/images/image2.jpg' },
    ],
    user2: [
        { id: 1, url: '/images/video1.mp4' },
        { id: 2, url: '/images/video2.mp4' },
    ],
};

// 提供影像數據
app.get('/api/images', (req, res) => {
    const account = req.query.account;
    const images = userImages[account] || [];
    res.json(images);
});

// 接收提交數據
app.post('/api/submit', (req, res) => {
    const { account, response, images } = req.body;

    // 模擬數據儲存（實際應該儲存到數據庫）
    console.log(`收到帳號: ${account}`);
    console.log(`文字回答: ${response}`);
    console.log(`影像數據:`, images);

    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('伺服器正在 http://localhost:3000 運行');
});