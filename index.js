import express from "express";

const axios = require("axios");
const app = express();

app.use(express.json());

const TELEGRAM_BOT_TOKEN = "7555481001:AAERIJWsceiwXXvuDFgI0zguoZcK-IvYRgA";
const ADMIN_CHAT_ID = "5757629291";

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
    res.status(500).send("Ошибка отправки в Telegram");
  }
});

app.get("/", (req, res) => {
  res.send("Bot is working ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
