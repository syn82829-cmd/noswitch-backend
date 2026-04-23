const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Разрешаем запросы из Telegram Mini App
app.use(cors({
  origin: ['https://noswitch-mini-app.onrender.com', 'https://noswitch.ru'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ NoSwitch Backend работает!');
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'NoSwitch backend online',
    time: new Date().toISOString()
  });
});

// Позже здесь будет создание пользователя в Amnezia VPN
app.post('/create-user', (req, res) => {
  res.json({
    success: true,
    message: 'Пользователь создан (пока заглушка)',
    configUrl: 'https://example.com/config.vpn'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 NoSwitch Backend запущен на порту ${PORT}`);
});
