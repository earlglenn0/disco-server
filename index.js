const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { Machine, interpret } = require('xstate')
const discoConfig = require('./discoConfig')
const discoImplementation = require('./discoImplementation')
const { formatState } = require('./utils')

io.on('connection', (socket) => {
  console.log('user connected');
  const discoMachine = Machine(discoConfig, discoImplementation)
  const service = interpret(discoMachine)
  service.start()
  service.onTransition(state => {
    io.emit('STATE_CHANGED', {
      ...formatState(state.value),
      ...state.context,
      isBroken: state.value === 'broken'
    })
  })

  const events = [
    'TURN_ON', 'TURN_OFF',
    'SET_COLOR_TO_CHANGING', 'SET_COLOR_TO_STEADY',
    'SET_SPEED_TO_LOW', 'SET_SPEED_TO_MEDIUM', 'SET_SPEED_TO_HIGH',
    'SET_LIGHTMODE_TO_STEADY', 'SET_LIGHTMODE_TO_FLASHING'
  ]

  events.forEach(event => {
    socket.on(event, () => {
      service.send(event)
    })
  })
  
  socket.on('disconnect', () => {
    service.stop()
    console.log('user disconnected');
  });
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});