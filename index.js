const { PORT = 3001 } = process.env

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const config = require('./config')
const kafka = require('kafka-node')
const Producer = kafka.HighLevelProducer
const client = new kafka.KafkaClient(config.kafka_server)
const producer = new Producer(client)
const Consumer = kafka.Consumer
const consumer = new Consumer(client, [{ topic: config.kafka_topic_consume, partition: 0 }], {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: 'utf8',
  fromOffset: false
})

const events = [
  'TURN_ON', 'TURN_OFF',
  'SET_COLOR_TO_CHANGING', 'SET_COLOR_TO_STEADY',
  'SET_SPEED_TO_LOW', 'SET_SPEED_TO_MEDIUM', 'SET_SPEED_TO_HIGH',
  'SET_LIGHTMODE_TO_STEADY', 'SET_LIGHTMODE_TO_FLASHING'
]

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);

  const produceEvent = (topic, payload) => {
    const payloads = [{
      topic,
      messages: [ payload]
    }]
    producer.send(payloads, (err, data) => {
      if (err) {
        console.log('producer failed')
      } else {
        console.log('producer succeeded')
      }
    })
  }
  
  producer.on('ready', () => {
    producer.createTopics(['machine-changes', 'machine-input'], false, (err, data) => {
      console.log({ data })
    })
    console.log('producer ready')
    io.on('connection', (socket) => {
      console.log('user connected')
      events.forEach(event => {
        socket.on(event, () => {
          console.log('event: ', event)
          produceEvent(config.kafka_topic_produce, event)
        })
      })
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    })
    consumer.on('message', (message) => {
      console.log({ message })
      io.emit('STATE_CHANGED', JSON.parse(message.value))
    })
  })
  
});