import { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { vibrate } from '../../utils'
import GlobalContext from '../global/GlobalContext'
import styles from './styles'

const DEFAULT_WORK_MINS = 0.17
const DEFAULT_BREAK_MINS = 0.05

const minToSec = min => min * 60

let interval

export default () => {
    const { activeTimer, setActiveTimer, isWorking, setIsWorking, reset, setReset } = useContext(GlobalContext)

    const [timeRemaining, setTimeRemaining] = useState(minToSec(DEFAULT_WORK_MINS))

    useEffect(() => {
        if (Math.floor(timeRemaining) === 0) {
            vibrate()
            setTimeRemaining((isWorking) ? minToSec(DEFAULT_BREAK_MINS)
                : minToSec(DEFAULT_WORK_MINS))

            setIsWorking(prev => !prev)
        }
    }, [timeRemaining])

    useEffect(() => {
        console.log('Iniciamos o pausamos temporizador')
        if (activeTimer) {
            // hay que detenerlo
            clearInterval(interval)
        } else {
            interval = setInterval(() => {
                setTimeRemaining(prev => prev - 1)
            }, 1000)
        }
    }, [activeTimer])

    useEffect(() => {
        if (reset === true) {
            console.log('Reiniciamos el temporizador')
            clearInterval(interval)
            setActiveTimer(true)
            setTimeRemaining(minToSec(DEFAULT_WORK_MINS))
            setIsWorking(true)
            setReset(false)
        }
    }, [reset])

    const mins = Math.floor(timeRemaining / 60)
    const secs = Math.floor(timeRemaining % 60)

    const paddZero = value => value < 10 ? `0${value}` : value

    return (
        <View style={styles.center}>
            <Text style={styles.text}>{paddZero(mins)}:{paddZero(secs)}</Text>
        </View>
    )
}