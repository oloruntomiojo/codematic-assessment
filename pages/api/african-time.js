import { cors, runMiddleware } from '../../utils/cors';
import { data } from './data/data.json';

export default async function handler(req, res) {
  // run cors middleware
  await runMiddleware(req, res, cors);

  const {
    query: { timezone },
    method,
  } = req;

  if (method === 'GET') {
    const date = new Date();

    let timeZoneData = data.find((element) => element.timezone === timezone);

    // check for empty query value
    if (timeZoneData === undefined) {
      res.status(400).json({
        success: false,
        message: 'Please provide a VALID african timezone e.g WAT',
      });

      return false;
    }

    // use timezone locations from database to set appropiate time
    const time = date.toLocaleTimeString('en-GB', {
      timeZone: timeZoneData.timeZoneLocation,
    });

    res.status(200).json({ success: true, message: 'successful', time });
  } else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .end({ success: false, message: `Method ${method} not allowed` });
  }
}
