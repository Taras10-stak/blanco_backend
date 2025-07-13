// backend/index.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/place-order', async (req, res) => {
   const { user, cartItems, total } = req.body;

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'tarasyc14@gmail.com',          // <-- заміни на свою пошту
         pass: 'bayb ttwo cott kzwp'              // <-- заміни на згенерований "App password"
      }
   });

   const itemsList = cartItems.map((item, i) => `${i + 1}) ${item.name} — ${item.quantity} шт — ${item.price} грн`).join('\n');

   const mailOptions = {
      from: 'tarasyc14@gmail.com',            // <-- твоя пошта
      to: 'tarassydor@i.ua',              // <-- або інша пошта, куди надсилати
      subject: 'Нове замовлення з сайту',
      text: `
Нове замовлення!

👤 Клієнт: ${user.firstName} ${user.lastName}
📞 Телефон: ${user.phone}
📧 Email: ${user.email}
🚚 Доставка: ${user.deliveryMethod}
📍 Адреса: ${user.address}
📞 Дзвінок: ${user.callPreference}

🛒 Замовлення:
${itemsList}

💰 Сума: ${total} грн
`
   };

   try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Замовлення успішно надіслане!' });
   } catch (err) {
      console.error('Помилка надсилання пошти:', err);
      res.status(500).json({ message: 'Не вдалося надіслати замовлення' });
   }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Сервер працює на порті: ${PORT}`);
});