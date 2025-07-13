// backend/sendMail.js
const nodemailer = require('nodemailer');

const sendMail = async (orderData) => {
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'your.email@gmail.com',
         pass: 'your_app_password', // App Password, не звичайний пароль
      },
   });

   const { user, cartItems, total } = orderData;

   const itemList = cartItems.map(item =>
      `• ${item.name} (${item.quantity} x ${item.price}) = ${item.quantity * item.price} грн`
   ).join('\n');

   const mailOptions = {
      from: 'your.email@gmail.com',
      to: 'your.email@gmail.com',
      subject: 'Нове замовлення',
      text: `
Нове замовлення!

Ім'я: ${user.firstName} ${user.lastName}
Телефон: ${user.phone}
Email: ${user.email}
Адреса: ${user.address}
Спосіб доставки: ${user.deliveryMethod}
Зв’язок: ${user.callPreference}

Товари:
${itemList}

Сума: ${total} грн
   `
   };

   await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
