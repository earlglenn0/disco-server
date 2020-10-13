const discoConfig = {
  id: 'disco',
  initial: 'off',
  context: {
    clicks: 0,
    max_clicks: 10
  },
  states: {
    off: {
      on: {
        TURN_ON: [
          {
            target: '#broken',
            cond: 'hasReachedLimit'
          },
          {
            target: 'on',
            actions: 'incrementClick'
          }
        ]
      }
    },
    on: {
      type: 'parallel',
        on: {
          TURN_OFF: [
            {
              target: '#broken',
              cond: 'hasReachedLimit'
            },
            {
              actions: 'incrementClick',
              target: 'off'
            }
          ]
        },
        states: {
          color: {
            initial: 'steady',
            states: {
              steady: {
                on: {
                  SET_COLOR_TO_CHANGING: [
                    {
                      target: '#broken',
                      cond: 'hasReachedLimit',
                    },
                    {
                      target: 'changing',
                      actions: 'incrementClick',
                    }
                  ],
                }
              },
              changing: {
                on: {
                  SET_COLOR_TO_STEADY: [
                    {
                      target: '#broken',
                      cond: 'hasReachedLimit',
                    },
                    {
                      target: 'steady',
                      actions: 'incrementClick',
                    }
                  ]
                }
              }
            }
          },
          speed: {
            initial: 'low',
            states: {
              low: {
                on: {
                  SET_SPEED_TO_MEDIUM: [
                    {
                      target: '#broken',
                      cond: 'hasReachedLimit',
                    },
                    {
                      target: 'medium',
                      actions: 'incrementClick',
                    }
                  ],
                  SET_SPEED_TO_HIGH: [
                    {
                      target: '#broken',
                      cond: 'hasReachedLimit',
                    },
                    {
                      target: 'high',
                      actions: 'incrementClick',
                    }
                  ]
                }
              },
              medium: {
                on: {
                  SET_SPEED_TO_LOW: [
                    {
                      target: '#broken',
                      cond: 'hasReachedLimit',
                    },
                    {
                      target: 'low',
                      actions: 'incrementClick'
                    }
                  ],
                  SET_SPEED_TO_HIGH: [
                    {
                      target: '#broken',
                      cond: 'hasReachedLimit',
                    },
                    {
                      target: 'high',
                      actions: 'incrementClick',
                    }
                  ]
                }
              },
              high: {
                on: {
                  SET_SPEED_TO_LOW: [
                    {
                      target: '#broken',
                      cond: 'hasReachedLimit',
                    },
                    {
                      target: 'low',
                      actions: 'incrementClick',
                    }
                  ],
                  SET_SPEED_TO_MEDIUM: [
                    {
                      target: '#broken',
                      cond: 'hasReachedLimit',
                    },
                    {
                      target: 'medium',
                      actions: 'incrementClick'
                    }
                  ]
                }
              }
            }
          },
          lightMode: {
            initial: 'steady',
              states: {
                steady: {
                  on: {
                    SET_LIGHTMODE_TO_FLASHING: [
                      {
                        target: '#broken',
                        cond: 'hasReachedLimit',
                      },
                      {
                        target: 'flashing',
                        actions: 'incrementClick'
                      }
                    ],
                  }
                },
                flashing: {
                  on: {
                    SET_LIGHTMODE_TO_STEADY: [
                      {
                        target: '#broken',
                        cond: 'hasReachedLimit',
                      },
                      {
                        target: 'steady',
                        actions: 'incrementClick',
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
    }
  }
}

module.exports = discoConfig