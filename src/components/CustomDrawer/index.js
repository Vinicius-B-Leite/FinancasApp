import React, { useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { AuthContext } from '../../contexts/auth';

export default function CustomDrawer(props) {
    const { user, singout } = useContext(AuthContext)
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={{ width: 85, height: 85, resizeMode: 'contain' }} />
                <Text style={{ color: '#fff', fontSize: 18, marginTop: 5 }}>Buenas-vindas</Text>
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold', paddingBottom: 25 }}>{user && user.nome} </Text>
            </View>

            <DrawerItemList
                {...props}
            />
            <DrawerItem
                {...props}
                label='Sair'
                inactiveTintColor='#fff'
                onPress={() => singout()}
                inactiveBackgroundColor='#c62c36' />
        </DrawerContentScrollView>
    );
}