import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function StudentForm() {
    const navigation = useNavigation();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cedula, setCedula] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const handleSaveStudent = () => {
        axios.post("http://localhost/quinto-api/api.php", {
            NOM_EST: nombre,
            APE_EST: apellido,
            CED_EST: cedula,
            TEL_EST: telefono,
            DIR_EST: direccion,
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(response => {
            navigation.goBack();
        }).catch(error => {
            console.error(error);
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
                <Text style={{ color: "#f0f0f0" }}>Crear</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center'
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
        backgroundColor: "#164220",
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 5
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