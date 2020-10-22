import express from 'express'
import Subscriber, { SubscriberModel } from '../model/subscriberModel';
const router = express.Router();



const getSubscriber = async (req: express.Request, res: any, next: express.NextFunction) => {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber === undefined)
      return res.status(404).json('Cannot find Subscriber')
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.subscriber = subscriber;
  next()

}

// Getting all
router.get('/', async (req, res) => {
  try {
    const subscriber = await Subscriber.find()
    res.json(subscriber)
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
});



// delete all
router.delete('/', async (req, res) => {
  try {
    const subscriber = await Subscriber.remove({})
    res.json('Deleted all USERS')
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
});


// Getting One
// @parames :{}
router.get('/:id', getSubscriber, (req, res: any) => {
  res.json(res.subscriber)
});

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

// Updating one
router.patch('/:id', getSubscriber, async (req, res: any) => {
  // we only want to change the thing that are send by the user
  if (req.body.name !== null)
    res.subscriber.name = req.body.name

  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }

  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  }
  catch (err) {
    res.status(400).json({ message: err.message })

  }
});

// Deleting One
router.delete('/:id', getSubscriber, async (req, res: any) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })

  }

});



// creating middleware


module.exports = router;
