import React from "react";
import Home from '../pages/Home'
import { createDrawerNavigator } from "@react-navigation/drawer";
import Perfil from "../pages/Profile";
import New from "../pages/New";
import CustomDrawer from "../components/CustomDrawer";


const Drawer = createDrawerNavigator()

export default function AppRoutes() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props}/>}
            screenOptions={{
                
                drawerLabelStyle: {
                    fontWeight: 'bold'
                },
                
                drawerStyle:{
                    backgroundColor: '#000'
                },
                drawerItemStyle:{
                    marginVertical: 5
                },
                drawerActiveTintColor: '#FFF',
                drawerActiveBackgroundColor: '#00b94a',
                drawerInactiveBackgroundColor: '#000',
                drawerInactiveTintColor: '#DDD'
            }}
            
        >
            <Drawer.Screen name='Home' component={Home} options={{headerShown: false}} />
            <Drawer.Screen name='New' component={New} options={{headerShown: false}}/>
            <Drawer.Screen name='Profile' component={Perfil} options={{headerShown: false}}/>
        </Drawer.Navigator>
    )
}