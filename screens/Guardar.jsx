import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

export default function StudentForm() {
    const navigation = useNavigation();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cedula, setCedula] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [students, setStudents] = useState([]);

    

    const comprobarEstudiante = () => {
        console.log(cedula);
        axios
            .get(`https://services-project-production.up.railway.app/rest/get/${cedula}`)
            .then((response) => {
                
                    
                    showMessage({
                        message: "Ya existe un estudiante con esa cedula",
                        type: "warning",
                        icon: "warning",
                      });
                
            })
            .catch((error) => {
                handleSaveStudent();
            }
            );
    }


    const handleSaveStudent = () => {


        axios.post(`https://services-project-production.up.railway.app/rest/save/${cedula}`, {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            direccion: direccion,
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(response => {
            
            showMessage({
                message: "Estudiante guardado",
                type: "success",
                icon: "success",
              });
            navigation.goBack();
        }).catch(error => {
            console.error("Error al guardar estudiante, revise el formulario");
        });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.itemName} >Cedula</Text>
            <TextInput style={styles.input} onChangeText={text => setCedula(text)} value={cedula} />

            <Text style={styles.itemName} >Nombre</Text>
            <TextInput style={styles.input} onChangeText={text => setNombre(text)} value={nombre} />

            <Text style={styles.itemName} >Apellido</Text>
            <TextInput style={styles.input} onChangeText={text => setApellido(text)} value={apellido} />

            <Text style={styles.itemName} >Telefono</Text>
            <TextInput style={styles.input} onChangeText={text => setTelefono(text)} value={telefono} />

            <Text style={styles.itemName} >Direccion</Text>
            <TextInput style={styles.input} onChangeText={text => setDireccion(text)} value={direccion} />

            <Pressable style={styles.button} title="Guardar Estudiante" onPress={comprobarEstudiante}>
                <Text style={{ color:"#000000"}}>Crear</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 20,
        color: "red",
        textAlign: "center"
    },
    button: {
        alignSelf: "center",
        alignItems: "center",
        width: 90,
        borderRadius: 15,
        backgroundColor: "#d9dbda",
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 20
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        borderColor: "#0c0c0c",
        color: "#0c0c0c",
        textAlign: "center",
        fontSize: 18,
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold"
    },
})