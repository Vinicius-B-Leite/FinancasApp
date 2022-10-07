import React, { useContext } from 'react';
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from './styles';
import {AuthContext} from '../../contexts/auth'
import { useNavigation } from '@react-navigation/native';
import MenuHamburg from '../../components/MenuHamburg';

export default function Perfil() {
  const {singout, user} = useContext(AuthContext)
  const navigation = useNavigation()
  return (
    <Container>
      <MenuHamburg/>
      <Nome>{user && user.nome}</Nome>
      <NewLink onPress={() => navigation.navigate('New')}>
        <NewText>Registrar Gastos</NewText>
      </NewLink>
      <Logout onPress={() => singout()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}