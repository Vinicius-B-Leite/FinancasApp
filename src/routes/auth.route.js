import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SingIn from '../pages/SingIn'
import SingUp from "../pages/SingUp";




const Stack = createNativeStackNavigator()

export default function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SingIn' component={SingIn} options={{ headerShown: false }} />
            <Stack.Screen name='SingUp' component={SingUp} options={{
                headerStyle: {
                    backgroundColor: '#131313'
                },
                headerTintColor: '#fff',
                headerTitle: 'Voltar',
                headerBackTitleVisible: false,
                borderBottomWidth: 1

            }} />
        </Stack.Navigator>
    )
}