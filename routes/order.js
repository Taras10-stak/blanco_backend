// backend/routes/order.js
const express = require('express');
const router = express.Router();
const sendMail = require('../sendMail');

router.post('/place-order', async (req, res) => {
   try {
      await sendMail(req.body);
      res.status(200).json({ message: 'Замовлення надіслано!' });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Помилка відправки' });
   }
});

module.exports = router;