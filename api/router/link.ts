import {Router} from 'express';
import {Links, Id} from '../models/links';
import generateUniqueId from '../generatorId';
import type {IPostData} from '../types';

const linkRoute = Router();

linkRoute.post('/links', async (req, res, next) => {
  try {
    let status = true;
    let uniqueId = '';
    while (status) {
      let generatedId = generateUniqueId();
      const id = await Id.find({usedId: generatedId});
      if (!id[0]) {
        uniqueId = generatedId;
        status = false;
        break;
      }
    }

    const postData: IPostData = {
      shortUrl: uniqueId,
      originalUrl: req.body.url,
    };
    const id = new Id({usedId: postData.shortUrl});
    await id.save();
    const link = new Links(postData);
    await link.save();
    res.send(link);
  } catch (e) {
    next(e);
  }
});

linkRoute.get('/:shortUrl', async (req, res, next) => {
  try {
    const link = await Links.find({shortUrl: req.params.shortUrl});

    if (!link[0]) {
      return res.status(404).send({error: 'Not found'});
    }
    const url = link[0].originalUrl;
    res.redirect(`<script>window.open(url,'_blank');</script>`);
  } catch (e) {
    next(e);
  }
});

export default linkRoute;