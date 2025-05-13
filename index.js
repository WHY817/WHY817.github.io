const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// 請將此處改成你的 GitHub Pages 網址，允許跨域請求
const allowedOrigins = ['https://why817-github-io.onrender.com/'];

app.use(cors({
  origin: function(origin, callback){
    // 允許無來源請求（Postman、Server端）
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// 模擬使用者資料
const users = {
  testuser: { username: 'testuser', imageUrl: 'https://via.placeholder.com/300/09f/fff.png' },
  user2: { username: 'user2', imageUrl: 'https://via.placeholder.com/300/f90/000.png' }
};

// 登入 API
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (!username || !users[username]) {
    return res.status(400).json({ message: '帳號不存在' });
  }
  res.json(users[username]);
});

// 提交資料 API
app.post('/api/submit', (req, res) => {
  const { username, imageSize, textAnswer } = req.body;
  if (!username || !imageSize || !textAnswer) {
    return res.status(400).json({ message: '資料不完整' });
  }
  console.log('收到資料:', { username, imageSize, textAnswer });
  // 這裡可改成寫入資料庫或檔案
  res.json({ message: '資料已收到' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
