import React, { useContext } from "react";

import AuthRoutes from "./auth.route";
import AppRoutes from "./app.route";
import { AuthContext } from "../contexts/auth";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function Routes() {
    const { singned, loading } = useContext(AuthContext)

    if (loading){
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size='large' color='#131313'/>
        </View>
    }
    return (
        <NavigationContainer>
            {singned ? <AppRoutes /> : <AuthRoutes />  }
        </NavigationContainer>
        
    )
}