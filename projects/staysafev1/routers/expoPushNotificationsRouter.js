import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/', async (req, res) => {
  const { to, title, body, data, sound } = req.body;

  if (!to || !title || !body) {
    return res.status(400).json({ message: 'Missing required fields: to, title, body' });
  }

  const message = {
    to: to,
    sound: sound || 'default',
    title: title,
    body: body,
    data: data,
  };

  try {
    const response = await axios.post('https://exp.host/--/api/v2/push/send', message, {
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    });

    console.log('Expo push notification response:', response.data);
    res.status(200).json({ isSuccess: true, result: response.data, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending Expo push notification:', error);
    res.status(500).json({ isSuccess: false, result: null, message: `Failed to send notification: ${error.message}` });
  }
});

export default router;