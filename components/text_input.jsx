import React from 'react';
import { StyleSheet, TextInput,Text, TouchableOpacity, View} from 'react-native';
import axios from "axios";
import { Feather, Entypo, AntDesign  } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

const TextInputBuscar = (params) => {
  const [cedula, setCedula] = React.useState('');
  const [clicked, setClicked] = React.useState(false);


  const cargarEstudiantes = (num) => {
    console.log(cedula);

    if (cedula == '' || num == 0) {
      axios
        .get("https://services-project-production.up.railway.app/rest/all")
        .then((response) => {
          params.setStudents(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }else{

      axios
        .get(`https://services-project-production.up.railway.app/rest/search/${cedula}`)
        .then((response) => {
  
          params.setStudents(response.data);
        })
        .catch((error) => {
          showMessage({
            message: "Estudiante no encontrado",
            type: "danger",
            icon: "danger",
          });
        });
    }


  }



  return (
 

<View style={styles.container}>
      <View
        style={
            styles.searchBar__clicked
        }
      >
        {/* search Icon */}
        <AntDesign
          name="idcard"
          size={24}
          color="#000000"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={setCedula}
          value={cedula}
          onFocus={() => {
            setClicked(true);
            }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {
  clicked ? (
    <Entypo
      name="cross"
      size={20}
      color="#000000"
      style={{ padding: 1 }}
      onPress={() => {
        setClicked(false);
        setCedula('');
        cargarEstudiantes(0);
      }}
    />
  ) : (
    <View style={{ width: 22, height: 22, padding: 1 }} /> // Empty view with the same size as the icon
  )
}

      </View>
     
    <TouchableOpacity
      style={styles.button}
      onPress={() => cargarEstudiantes(1)}
    >
       <Feather
          name="search"
          size={20}
          color="#000000"
          style={{ marginLeft: 1 }}
        />
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",

  },
  
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "70%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "#d9dbda",
    borderRadius: 25,
    padding: 12,
    marginLeft: 10,
  },
});

export default TextInputBuscar;

