const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// === НАСТРОЙКИ ===
const CRYPTOBOT_TOKEN = '574231:AAI24ZYd1QYyn5b7FHndGQwDv040Pc8uscb'; // твой токен

app.use(cors({
  origin: ['https://noswitch-mini-app.onrender.com', 'https://noswitch.ru'],
  credentials: true
}));
app.use(express.json());

// Главная страница
app.get('/', (req, res) => {
  res.send('✅ NoSwitch Backend работает!');
});

// Проверка здоровья
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'NoSwitch backend online' });
});

// === СОЗДАНИЕ ИНВОЙСА CRYPTOBOT ===
app.post('/create-invoice', async (req, res) => {
  try {
    const { amount = 250, description = 'Подписка NoSwitch VPN — 1 месяц' } = req.body;

    const response = await axios.post('https://pay.crypt.bot/api/createInvoice', {
      asset: 'USDT',                    // можно TON, BTC, ETH
      amount: amount,
      description: description,
      paid_btn_name: 'open_app',
      paid_btn_url: 'https://t.me/yourbot?start=paid'   // позже заменишь на свой бот
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Crypto-Pay-API-Token': CRYPTOBOT_TOKEN
      }
    });

    res.json({
      success: true,
      invoice_url: response.data.result.invoice_url,
      invoice_id: response.data.result.invoice_id
    });

  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ 
      success: false, 
      error: 'Не удалось создать инвойс' 
    });
  }
});

// === ТЕСТОВЫЙ МАРШРУТ (оставляем) ===
app.post('/create-user', (req, res) => {
  res.json({
    success: true,
    message: 'Пользователь создан (тестовая заглушка)',
    configUrl: 'https://example.com/config.vpn'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 NoSwitch Backend запущен на порту ${PORT}`);
});
