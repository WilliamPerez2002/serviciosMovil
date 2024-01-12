import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import Listar from './screens/Listar';
import Editar from './screens/Editar';
import Guardar from './screens/Guardar';
const Stack = createNativeStackNavigator();
const Navigation =()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Listar" component={Listar} />
                <Stack.Screen name="Editar" component={Editar} />
                <Stack.Screen name="Guardar" component={Guardar} />
            </Stack.Navigator>
            <FlashMessage position="bottom" />

        </NavigationContainer>
    );
};
export default Navigation;