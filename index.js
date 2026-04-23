<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NoSwitch VPN</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="bg-zinc-950 text-white min-h-screen">
  <div class="max-w-md mx-auto p-6">
    <div class="text-center pt-12">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-2xl mb-6">
        🔄
      </div>
      <h1 class="text-4xl font-bold mb-2">NoSwitch</h1>
      <p class="text-emerald-400 text-xl">Один VPN. Навсегда.</p>
      <p class="text-zinc-400 mt-8 text-lg">Без переключений.<br>Wildberries + YouTube одновременно</p>
    </div>

    <div class="mt-12 space-y-4">
      <button onclick="buySubscription()" 
              class="w-full bg-white text-black font-semibold py-4 rounded-3xl text-xl active:scale-95 transition">
        Купить подписку — 250 ₽/мес
      </button>

      <button onclick="createVpnAccount()" 
              class="w-full border border-emerald-500 text-emerald-400 font-medium py-4 rounded-3xl text-lg">
        Создать аккаунт VPN (тест)
      </button>

      <button onclick="showHowItWorks()" 
              class="w-full border border-zinc-700 font-medium py-4 rounded-3xl text-lg">
        Как это работает →
      </button>
    </div>

    <div id="status" class="mt-8 text-center text-sm text-zinc-400"></div>
  </div>

  <script>
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.ready();

    const BACKEND_URL = 'https://noswitch-backend.onrender.com';

    async function createVpnAccount() {
      const statusEl = document.getElementById('status');
      statusEl.innerHTML = '⏳ Подключаюсь к серверу...';

      try {
        const res = await fetch(`${BACKEND_URL}/create-user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            telegramId: tg.initDataUnsafe?.user?.id || 123456,
            username: tg.initDataUnsafe?.user?.username || 'test'
          })
        });

        const data = await res.json();
        statusEl.innerHTML = `✅ ${data.message}<br>Конфиг будет здесь`;
        tg.showAlert('Аккаунт VPN создан! (пока тестовая заглушка)');
      } catch (e) {
        statusEl.innerHTML = '❌ Ошибка соединения с бэкендом';
        console.error(e);
      }
    }

    function buySubscription() {
      tg.showAlert('Платёж через Telegram Stars будет здесь (скоро добавим)');
    }

    function showHowItWorks() {
      tg.showAlert('VPN всегда включён\nSplit-tunneling: российские сайты идут напрямую, заблокированные — через VPN');
    }

    // Приветствие
    const user = tg.initDataUnsafe?.user;
    document.getElementById('status').innerHTML = `
      Привет, ${user?.first_name || 'друг'}!<br>
      Готов к NoSwitch?
    `;
  </script>
</body>
</html>
