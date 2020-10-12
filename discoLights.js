const { Machine, interpret } = require('xstate')

const { config, implementation } = require('./machine/disco-server')

const discoLights = Machine(config, implementation)

const disco = interpret(discoLights)

isOff.onTransition(state => {
    console.log('state.toStrings()')
})

isOn.onTransition(state => {
    console.log('state.toStrings()')
})

setColor.onTransition(state => {
    console.log('state.toStrings()')
})

setSpeed.onTransition(state => {
    console.log('state.toStrings()')
})

setLightMode.onTransition(state => {
    console.log('state.toStrings()')
})

disco.start()