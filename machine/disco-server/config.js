const { assign } = require('xstate')
const context = {
    state: undefined,
};

const config = {
    id: 'disco',
    initial: 'off',
    context,
    states: {
        off: {
            invoke: {
                id: 'isOff',
                src: 'isOff'
            },
            on: {
                TURN_ON: 'on',
                BREAK: 'broken'
            }
        },
        on: {
            type: 'parallel',
            invoke: {
                id: 'isOn',
                src: 'isOn'
            },
            on: {
                BREAK: 'broken'
            },
            states: {
                color: {
                    initial: 'steady',
                    states: {
                        steady: {
                            invoke: {
                                id: 'setColorToSteady',
                                src: 'setColorToSteady'
                            },
                            on: {
                                SET_COLOR_TO_CHANGING: {
                                    target: 'changing',
                                    actions: assign({ color: 'changing' })
                                }
                            }
                        },
                        changing: {
                            invoke: {
                                id: 'setColorToChanging',
                                src: 'setColorToChanging'
                            },
                            on: {
                                SET_COLOR_TO_STEADY: {
                                    target: 'steady',
                                    actions: assign({ color: 'steady' })
                                }
                            }
                        }
                    }
                },
                speed: {
                    initial: 'low',
                    states: {
                        low: {
                            invoke: {
                                id: 'setSpeedToLow',
                                src: 'setSpeedToLow'
                            },
                            on: {
                                SET_SPEED_TO_MED: {
                                    target: 'med',
                                    actions: assign({ speed: 'med' })
                                },
                                SET_SPEED_TO_HIGH: {
                                    target: 'high',
                                    actions: assign({ speed: 'high' })
                                }
                            }
                        },
                        med: {
                            invoke: {
                                id: 'setSpeedToMed',
                                src: 'setSpeedToMed'
                            },
                            on: {
                                SET_SPEED_TO_LOW: {
                                    target: 'low',
                                    actions: assign({ speed: 'low' })
                                },
                                SET_SPEED_TO_HIGH: {
                                    target: 'high',
                                    actions: assign({ speed: 'high' })
                                }
                            }
                        },
                        high: {
                            invoke: {
                                id: 'setSpeedToHigh',
                                src: 'setSpeedToHigh'
                            },
                            on: {
                                SET_SPEED_TO_LOW: {
                                    target: 'low',
                                    actions: assign({ speed: 'low' })
                                },
                                SET_SPEED_TO_MED: {
                                    target: 'med',
                                    actions: assign({ speed: 'med' })
                                }
                            }
                        }
                    }
                },
                lightMode: {
                    initial: 'flashing',
                    states: {
                        flashing: {
                            invoke: {
                                id: 'setLightModeToFlashing',
                                src: 'setLightModeToFlashing'
                            },
                            on: {
                                SET_LIGHTMODE_TO_STEADY: {
                                    target: 'steady',
                                    actions: assign({ lightMode: 'steady' })
                                }
                            }
                        },
                        steady: {
                            invoke: {
                                id: 'setLightModeToSteady',
                                src: 'setLightModeToSteady'
                            },
                            on: {
                                SET_LIGHTMODE_TO_FLASHING: {
                                    target: 'flashing',
                                    actions: assign({ lightMode: 'flashing' })
                                }
                            }
                        }
                    }
                }
            }
        },

        broken: {
            invoke: {
                id: 'isBroken',
                src: 'isBroken'
            },
            on: {
                FIX: 'off',
            }
        },
    }
}

module.exports = config