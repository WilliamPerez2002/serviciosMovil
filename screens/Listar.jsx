import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import TextInputBuscar from "../components/text_input.jsx";
import{GET_ALL_API, DELETE_API} from '@env';

const StudentList = () => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Fetch updated data here
      cargarEstudiantes();
    }
  }, [isFocused]);

  const cargarEstudiantes = () => {
    axios
      .get(GET_ALL_API)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [expandedItem, setExpandedItem] = useState(null);

  const handlePress = (item) => {
    if (expandedItem === item) {
      setExpandedItem(null);
    } else {
      setExpandedItem(item);
    }
  };

  const eliminarEstudiante = (cedula) => {
    axios.delete(DELETE_API+cedula)
      .then(response => {
        cargarEstudiantes();
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

    const renderItem = ({ item }) => {
      const isExpanded = expandedItem === item;

      return (
        <Pressable onPress={() => handlePress(item)}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>
              {item.nombre} {item.apellido}
            </Text>
            {isExpanded && (
              <>
                <Text style={styles.itemDetails}> <Text style={styles.subtitles}>Cédula:</Text> {item.cedula}</Text>
                <Text style={styles.itemDetails}> <Text style={styles.subtitles}>Dirección:</Text> 
                   {item.direccion}
                </Text>
                <Text style={styles.itemDetails}> <Text style={styles.subtitles}>Teléfono:</Text> {item.telefono}</Text>
                <View style={styles.buttonSeparator}>
                  <TouchableOpacity
                    style={[styles.deleteButton, { backgroundColor: 'red' }]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={{ color: 'white' }}>Eliminar</Text>
                  </TouchableOpacity>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(false);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text>¿Estás seguro que deseas eliminar?</Text>
                        <TouchableOpacity
                          style={styles.modalButton}
                          onPress={() => {
                            eliminarEstudiante(item.cedula);
                            setModalVisible(false);
                          }}
                        >
                          <Text style={{ color: 'white' }}>Sí, eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.modalButton}
                          onPress={() => {
                            setModalVisible(false);
                          }}
                        >
                          <Text style={{ color: 'white' }}>Cancelar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>

                  <TouchableOpacity
                    style={[styles.deleteButton, { backgroundColor: '#0dc1f2' }]}
                    title="Actualizar"
                    onPress={() =>
                      navigation.navigate("Editar", {
                        estudiante: { cedula: item.cedula, nombre: item.nombre, apellido: item.apellido, direccion: item.direccion, telefono: item.telefono }
                      })
                    }
                  >
                    <Text style={{ color: 'white' }}>Actualizar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </Pressable>
      );
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Estudiantess</Text>

      <TextInputBuscar setStudents={setStudents} />

      <FlatList
      style={{ width: "100%", marginTop: 20, marginBottom: 20,padding: 10 }}
        data={students}
        keyExtractor={(item) => item.cedula}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Pressable style={styles.button} onPress={() => navigation.navigate("Guardar")}>
        <Text style={{ color: "#000000" }}>Agregar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    color: "#000000",
    textAlign: "center",
  },
  subtitles:{
    fontSize: 16,
    fontWeight: "bold",

  },
  itemContainer: {
    flexDirection: "column",
    padding: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDetails: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  }, buttonSeparator: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  deleteButton: {
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    width: 90, // Establece un ancho mínimo inicial
    borderRadius: 15,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
    marginTop: 10,

  }, 
  
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 90, // Establece un ancho mínimo inicial
    borderRadius: 15,
    backgroundColor: '#d9dbda',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});

export default StudentList;