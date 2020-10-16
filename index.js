const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const config = require('./config')
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
  brokers: [config.kafka_server]
})
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-consumer-group' })

const events = [
  'TURN_ON', 'TURN_OFF',
  'SET_COLOR_TO_CHANGING', 'SET_COLOR_TO_STEADY',
  'SET_SPEED_TO_LOW', 'SET_SPEED_TO_MEDIUM', 'SET_SPEED_TO_HIGH',
  'SET_LIGHTMODE_TO_STEADY', 'SET_LIGHTMODE_TO_FLASHING'
]

const run = async () => {
  await producer.connect()

  io.on('connection', (socket) => {
    console.log('user connected')
    events.forEach(event => {
      socket.on(event, async () => {
        await producer.send({
          topic: config.kafka_topic_produce,
          messages: [{ value: event }]
        })
      })
    })
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  await consumer.connect()
  await consumer.subscribe({ topic: config.kafka_topic_consume })
  await consumer.run({
    eachMessage: async ({ message }) => {
      io.emit('STATE_CHANGED', JSON.parse(message.value))
    }
  })
}

http.listen(3001, () => {
  run().catch(console.log)
})