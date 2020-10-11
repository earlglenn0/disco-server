const { Machine, interpret } = require('xstate')

const { config, implementation } = require('./machines/disco')

const discoLights = Machine(config, implementation)

const { isOff } = interpret(discoLights)

isOff.onTransition(state => {
    console.log('state.toStrings()')
})

isOff.start()