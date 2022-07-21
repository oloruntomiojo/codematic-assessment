const { data } = require('./data/data.json');

export default function handler(req, res) {
  const {
    query: { timezone },
    method,
  } = req;

  if (method === 'GET') {
    const date = new Date();

    let timeZoneData = data.find((element) => element.timezone === timezone);

    if (timeZoneData === undefined) {
      res
        .status(400)
        .send({ message: 'Please provide a VALID african timezone e.g WAT' });

      return false;
    }

    const time = date.toLocaleTimeString('en-GB', {
      timeZone: timeZoneData.timeZoneLocation,
    });

    res.status(200).send({ message: 'successful', time });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end({ message: `Method ${method} not allowed` });
  }
}
