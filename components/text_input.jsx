import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import axios from "axios";

const TextInputBuscar = (params) => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');


  const cargarEstudiantes = () => {
    console.log(number);
    axios
      .get("http://localhost/quinto-api/api.php?CED_EST=".concat(number))
      .then((response) => {

        console.log(response.data);
        params.setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }



  return (
    <SafeAreaView style={styles.SafeAreaView}>
     
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Buscar por cédula"
        keyboardType="text"
      />

<Button
  onPress={cargarEstudiantes}
  title="Buscar"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
  
/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  SafeAreaView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",

    marginTop: 20,
    
},


  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputBuscar;