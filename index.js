const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const config = require('./config')
const kafka = require('kafka-node')
const Producer = kafka.Producer
const client = new kafka.KafkaClient(config.kafka_server)
const producer = new Producer(client)
const Consumer = kafka.Consumer
const consumer = new Consumer(client, [{ topic: config.kafka_topic_consume, partition: 0 }], { autoCommit: false })

const events = [
  'TURN_ON', 'TURN_OFF',
  'SET_COLOR_TO_CHANGING', 'SET_COLOR_TO_STEADY',
  'SET_SPEED_TO_LOW', 'SET_SPEED_TO_MEDIUM', 'SET_SPEED_TO_HIGH',
  'SET_LIGHTMODE_TO_STEADY', 'SET_LIGHTMODE_TO_FLASHING'
]

producer.on('ready', () => {
  console.log('producer ready')
  io.on('connection', (socket) => {
    console.log('user connected')
    events.forEach(event => {
      socket.on(event, () => {
        const payloads = [
          {
            topic: config.kafka_topic_produce,
            messages: [event]
          }
        ]
        producer.send(payloads, (err, data) => {
          if (err) {
            console.log('producer failed: ', event)
          } else {
            console.log('producer succeeded: ', event)
          }
        })
      })
    })
    consumer.on('message', (message) => {
      console.log({ message })
      io.emit('STATE_CHANGED', JSON.parse(message.value))
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  })
})

http.listen(3001, () => {
  console.log('listening on *:3001');
});