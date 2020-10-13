const { assign } = require('xstate')

const discoImplementation = {
  actions: {
    incrementClick: assign({ clicks: context => context.clicks + 1 })
  },
  guards: {
    hasReachedLimit: (context) => context.clicks >= context.max_clicks,
  }
}

module.exports = discoImplementation