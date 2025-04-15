const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const TELEGRAM_BOT_TOKEN = "твой_токен_бота";
const ADMIN_CHAT_ID = "твой_chat_id"; // можно тот же что и сейчас

app.post("/send", async (req, res) => {
  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).send("Заполните все поля.");
  }

  const text = `📩 Новое сообщение с сайта:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💬 Сообщение:\n${message}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: ADMIN_CHAT_ID,
      text: text,
    });
    res.send("OK");
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Ошибка отправки в Telegram");
  }
});

app.get("/", (req, res) => {
  res.send("Telegram proxy bot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
