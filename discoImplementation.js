const discoImplementation = {
  guards: {
    hasReachedLimit: (context) => context.clicks >= context.max_clicks,
  }
}

module.exports = discoImplementation