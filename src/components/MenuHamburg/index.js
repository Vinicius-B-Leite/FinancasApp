import React from 'react';

import { Feather } from '@expo/vector-icons';
import { Container, ButtonMenu } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function MenuHamburg() {
    const navigaton = useNavigation()
    return (
        <Container>
            <ButtonMenu onPress={() => navigaton.toggleDrawer()}>

                <Feather name="menu" size={30} color="#fff" />
            </ButtonMenu>
        </Container>
    );
}