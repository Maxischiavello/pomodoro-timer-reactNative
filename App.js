import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import Timer from './components/Timer'
import GlobalContext, { defaultValue } from './components/global/GlobalContext'

export default function App() {

  const [activeTimer, setActiveTimer] = useState(defaultValue)
  const [isWorking, setIsWorking] = useState(true)
  const [reset, setReset] = useState(false)
  
  return (
    <View style={styles.container}>

      <StatusBar style={styles.auto} />

      <Text style={[styles.center, styles.title]}>Tiempo de {isWorking ? 'trabajo' : 'descanso'}</Text>

      <GlobalContext.Provider value={{ activeTimer, setActiveTimer, isWorking, setIsWorking, reset, setReset }}>
        <Timer />
      </GlobalContext.Provider>

      <View style={[styles.buttonContainer, styles.center]}>

        <TouchableHighlight
          onPress={() => setActiveTimer(!activeTimer)}
          style={styles.button}
        >
          <Text>{activeTimer ? 'Iniciar' : 'Pausar'}</Text>  
        </TouchableHighlight>

  
        <TouchableHighlight 
          onPress={() => setReset(true)}
          style={styles.button}
        >
          <Text>Reiniciar</Text>
        </TouchableHighlight>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
  center: {
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
  }, 
  buttonContainer: {
    padding: 10,
    flexDirection: 'column'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10
  }
});
