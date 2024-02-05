import {Router} from "express";

const linkRoute = Router();

linkRoute.post('', (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
});

export default linkRoute;