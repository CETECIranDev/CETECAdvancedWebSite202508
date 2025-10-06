// pages/api/views/home.js
import { redis } from "../../../utils/redis";

export default async function handler(req, res) {
  try {
    // افزایش تعداد بازدید صفحه اصلی
    const views = await redis.incr('pageviews:home');

    res.status(200).json({ views });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
