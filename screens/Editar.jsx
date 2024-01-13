import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import{PUT_API} from '@env';

export default function StudentForm({ route }) {
    const navigation = useNavigation();
    const { estudiante } = route.params;
    useEffect(() => {
        if (estudiante) {
            setNombre(estudiante.nombre);
            setApellido(estudiante.apellido);
            setCedula(estudiante.cedula);
            setTelefono(estudiante.telefono);
            setDireccion(estudiante.direccion);
        }
    }, [estudiante]);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cedula, setCedula] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const handleSaveStudent = () => {
        axios.put(PUT_API+cedula, {
            nombre: nombre,
            apellido: apellido,
            cedula: cedula,
            telefono: telefono,
            direccion: direccion,
        }).then(response => {
            showMessage({
                message: "Estudiante actualizado",
                type: "success",
                icon: "success",
              });
            navigation.goBack();
        }).catch(error => {
            console.error("Error al actualizar estudiante");

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

            <Pressable style={styles.button} title="Guardar Estudiante" onPress={handleSaveStudent}>
                <Text style={{ color:"#000000"}}>Guardar</Text>
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
        margin: 20,
        
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