const { assign } = require('xstate')
const context = {
    clicks: 0,
    max_clicks: 20
}

const config = {
    id: 'disco',
    initial: 'off',
    context,
    states: {
        off: {
            on: {
                TURN_ON: [{
                    target: '#broken',
                    cond: 'hasReachedLimit'
                },
                {
                    target: 'on',
                    actions: assign({ clicks: context => context.clicks + 1 })
                }]
            }
        },
        on: {
            type: 'parallel',
            on: {
                TURN_OFF: [{
                    target: '#broken',
                    cond: 'hasReachedLimit'
                },
                {
                    actions: assign({ clicks: context => context.clicks + 1 }),
                    target: 'off'
                }]
            },
            states: {
                color: {
                    initial: 'steady',
                    states: {
                        steady: {
                            on: {
                                SET_COLOR_TO_CHANGING: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',
                                },
                                {
                                    target: 'changing',
                                    actions: assign({ clicks: context => context.clicks + 1 }),
                                }
                                ],
                            }
                        },
                        changing: {
                            on: {
                                SET_COLOR_TO_STEADY: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',
                                },
                                {
                                    target: 'steady',
                                    actions: assign({ clicks: context => context.clicks + 1 }),
                                }]
                            }
                        }
                    }
                },
                speed: {
                    invoke: {
                        id: 'setSpeed',
                        src: 'setSpeed'
                    },
                    initial: 'low',
                    states: {
                        low: {
                            on: {
                                SET_SPEED_TO_MEDIUM: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',
                                },
                                {
                                    target: 'medium',
                                    actions: assign({ clicks: context => context.clicks + 1 }),
                                }
                                ],
                                SET_SPEED_TO_HIGH: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',
                                },
                                {
                                    target: 'high',
                                    actions: assign({ clicks: context => context.clicks + 1 }),
                                }
                                ]
                            }
                        },
                        medium: {
                            on: {
                                SET_SPEED_TO_LOW: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',
                                },
                                {
                                    target: 'low',
                                    actions: assign({ clicks: context => context.clicks + 1 })
                                }],
                                SET_SPEED_TO_HIGH: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',
                                },
                                {
                                    target: 'high',
                                    actions: assign({ clicks: context => context.clicks + 1 }),
                                }]
                            }
                        },
                        high: {
                            on: {
                                SET_SPEED_TO_LOW: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',
                                },
                                {
                                    target: 'low',
                                    actions: assign({ clicks: context => context.clicks + 1 }),
                                }],
                                SET_SPEED_TO_MEDIUM: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',

                                },
                                {
                                    target: 'medium',
                                    actions: assign({ clicks: context => context.clicks + 1 })
                                }]
                            }
                        }
                    }
                },
                lightMode: {
                    initial: 'steady',
                    states: {
                        steady: {
                            on: {
                                SET_LIGHTMODE_TO_FLASHING: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',

                                },
                                {
                                    target: 'flashing',
                                    actions: assign({ clicks: context => context.clicks + 1 })
                                }
                                ],
                            }
                        },
                        flashing: {

                            on: {
                                SET_LIGHTMODE_TO_STEADY: [{
                                    target: '#broken',
                                    cond: 'hasReachedLimit',

                                },
                                {
                                    target: 'steady',
                                    actions: assign({ clicks: context => context.clicks + 1 }),
                                }
                                ],
                            }
                        },
                    }
                }
            }
        },

        broken: {
            id: 'broken',
            type: 'final'
        },
    }
}

module.exports = config