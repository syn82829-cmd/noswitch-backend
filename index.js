const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

const CRYPTOBOT_TOKEN = process.env.CRYPTOBOT_TOKEN;

if (!CRYPTOBOT_TOKEN) {
  console.error('❌ CRYPTOBOT_TOKEN не найден в Environment Variables!');
}

app.use(cors({
  origin: ['https://noswitch-mini-app.onrender.com', 'https://noswitch.ru'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => res.send('✅ NoSwitch Backend работает!'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'NoSwitch backend online' });
});

// === СОЗДАНИЕ ИНВОЙСА CRYPTOBOT ===
app.post('/create-invoice', async (req, res) => {
  if (!CRYPTOBOT_TOKEN) {
    return res.status(500).json({ success: false, error: 'Токен не настроен' });
  }

  try {
    const { amount = 250, description = 'Подписка NoSwitch VPN — 1 месяц' } = req.body;

    const response = await axios.post('https://pay.crypt.bot/api/createInvoice', {
      asset: 'USDT',
      amount: amount,
      description: description,
      paid_btn_name: 'open_app',
      paid_btn_url: 'https://t.me/yourbot?start=paid'
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
    console.error('CryptoBot error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Не удалось создать инвойс' });
  }
});

app.post('/create-user', (req, res) => {
  res.json({ success: true, message: 'Пользователь создан (тест)' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 NoSwitch Backend запущен на порту ${PORT}`);
  if (!CRYPTOBOT_TOKEN) console.error('⚠️ CRYPTOBOT_TOKEN не задан!');
});
