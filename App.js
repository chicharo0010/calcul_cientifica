import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [smallDisplay, setSmallDisplay] = useState('');

  const handlePress = (value) => {
    if (display.length < 45) {
      setDisplay(display + value);
    }
  };

  const calculateResult = () => {
    try {
      // Validar división por cero
      if (display.includes('/0')) {
        throw new Error('División por cero');
      }

      // Validar tangente en 90° y 270°
      if (display.includes('Math.tan(90') || display.includes('Math.tan(270')) {
        throw new Error('Error: Tangente no definida en 90° y 270°');
      }

      const expression = display
        .replace(/Math\.sin\(/g, 'Math.sin((Math.PI / 180) * ')
        .replace(/Math\.cos\(/g, 'Math.cos((Math.PI / 180) * ')
        .replace(/Math\.tan\(/g, 'Math.tan((Math.PI / 180) * ')
        .replace(/sqrt\(/g, 'Math.sqrt('); // Reemplazar sqrt por Math.sqrt

      const evalResult = eval(expression);
      setSmallDisplay(display);
      setResult(evalResult.toString());
      setDisplay('');
    } catch (error) {
      if (error.message === 'División por cero') {
        setResult('Error: División por 0');
      } else if (error.message === 'Error: Tangente no definida en 90° y 270°') {
        setResult('Error: Tangente no definida');
      } else {
        setResult('Error');
      }
    }
  };

  const clearDisplay = () => {
    setDisplay('');
    setResult('');
    setSmallDisplay('');
  };

  const deleteLast = () => {
    setDisplay(display.slice(0, -1)); // Borra el último carácter
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.display}>
        <Text style={styles.smallDisplayText}>{smallDisplay}</Text>
        <Text style={styles.resultText}>{result || display}</Text>
      </ScrollView>
      <View style={styles.buttons}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => clearDisplay()} style={styles.button}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteLast()} style={styles.button}>
            <Text style={styles.buttonText}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('(')} style={styles.button}>
            <Text style={styles.buttonText}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(')')} style={styles.button}>
            <Text style={styles.buttonText}>)</Text>
          </TouchableOpacity>
        </View>

        {/* Fila de funciones científicas */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePress('Math.sin(')} style={styles.button}>
            <Text style={styles.buttonText}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Math.cos(')} style={styles.button}>
            <Text style={styles.buttonText}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Math.tan(')} style={styles.button}>
            <Text style={styles.buttonText}>tan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Math.log(')} style={styles.button}>
            <Text style={styles.buttonText}>log</Text>
          </TouchableOpacity>
        </View>

        {/* Nueva fila para raíz cuadrada y potencia */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePress('sqrt(')} style={styles.button}>
            <Text style={styles.buttonText}>√</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('**')} style={styles.button}>
            <Text style={styles.buttonText}>^</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('0')} style={styles.button}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('.')} style={styles.button}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
        </View>

        {/* Fila de números */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePress('7')} style={styles.button}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('8')} style={styles.button}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('9')} style={styles.button}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('/')} style={styles.button}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>

        {/* Fila de números */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePress('4')} style={styles.button}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('5')} style={styles.button}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('6')} style={styles.button}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('*')} style={styles.button}>
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
        </View>

        {/* Fila de números */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePress('1')} style={styles.button}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('2')} style={styles.button}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('3')} style={styles.button}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('-')} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        {/* Última fila */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePress('+')} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => calculateResult()} style={styles.buttonEquals}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
    justifyContent: 'center',
  },
  display: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Fondo oscuro
    padding: 20,
  },
  smallDisplayText: {
    fontSize: 24,
    color: '#888', // Texto gris oscuro
    textAlign: 'right',
  },
  resultText: {
    fontSize: 48, 
    color: '#FFFFFF', // Texto claro
    textAlign: 'right',
  },
  buttons: {
    flex: 2,
    justifyContent: 'space-evenly', // Mejora la distribución de los botones
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 80,  // Tamaño ajustado para hacer los botones circulares
    height: 80,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 5,
    borderRadius: 40,  // Bordes redondeados ajustados
  },
  buttonEquals: {
    width: 80,  // Tamaño igual para el botón de igual
    height: 80,
    backgroundColor: '#ff5722',  // Color distintivo
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 5,
    borderRadius: 40,  // Bordes redondeados ajustados
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',  // Texto claro
  },
});
