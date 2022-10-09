import React, { useContext } from "react";
import Home from '../pages/Home'
import { createDrawerNavigator } from "@react-navigation/drawer";
import Perfil from "../pages/Profile";
import New from "../pages/New";
import CustomDrawer from "../components/CustomDrawer";
import { useTheme } from "styled-components/native";
import { ThemeContext } from "../contexts/theme";


const Drawer = createDrawerNavigator()

export default function AppRoutes() {
    const theme = useTheme()
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props}/>}
            screenOptions={{
                
                drawerLabelStyle: {
                    fontWeight: 'bold'
                },
                
                drawerStyle:{
                    backgroundColor: theme.backgroundColor
                },
                drawerItemStyle:{
                    marginVertical: 5
                },
                drawerActiveTintColor: theme.color,
                drawerActiveBackgroundColor: theme.primary,
                drawerInactiveBackgroundColor: theme.backgroundSecond,
                drawerInactiveTintColor: theme.colorSecond  
            }}
            
        >
            <Drawer.Screen name='Home' component={Home} options={{headerShown: false}} />
            <Drawer.Screen name='New' component={New} options={{headerShown: false}}/>
            <Drawer.Screen name='Profile' component={Perfil} options={{headerShown: false}}/>
        </Drawer.Navigator>
    )
}