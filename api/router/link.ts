import {Router} from 'express';
import Links from '../models/links';
import generateUniqueId from '../generatorId';

const linkRoute = Router();

linkRoute.post('/links', async (req, res, next) => {
  try {
    const postData = {
      shortUrl: generateUniqueId(),
      originalUrl: req.body.url,
    };

    const link = new Links(postData);
    await link.save();
    res.send(link);
  } catch (e) {
    next(e);
  }
});

export default linkRoute;