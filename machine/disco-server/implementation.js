const implementation = {
    services: {
        setColorToChanging: () => (send) => {
            process.stdout.once('data', () => {
                send('SET_COLOR_TO_CHANGING')
            })
        },
        setColorToSteady: () => (send) => {
            process.stdout.once('data', () => {
                send('SET_COLOR_TO_STEADY')
            })
        },
        setSpeedToLow: () => (send) => {
            process.stdout.once('data', () => {
                send('SET_SPEED_TO_LOW')
            })
        },
        setSpeedToMed: () => (send) => {
            process.stdout.once('data', () => {
                send('SET_SPEED_TO_MED')
            })
        },
        setSpeedToHigh: () => (send) => {
            process.stdout.once('data', () => {
                send('SET_SPEED_TO_HIGH')
            })
        },
        setLightModeToFlashing: () => (send) => {
            process.stdout.once('data', () => {
                send('SET_LIGHTMODE_TO_FLASHING')
            })
        },
        setColorToChanging: () => (send) => {
            process.stdout.once('data', () => {
                send('SET_COLOR_TO_CHANGING')
            })
        },
        setColorToChanging: () => (send) => {
            process.stdout.once('data', () => {
                send('SET_COLOR_TO_CHANGING')
            })
        },
        setColorToChanging: () => (send) => {
            process.stdout.once('data', () => {
                send('SET_COLOR_TO_CHANGING')
            })
        },
    },
}

module.exports = implementation