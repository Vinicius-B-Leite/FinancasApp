import React, { useContext, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import MenuHamburg from '../../components/MenuHamburg'
import { Background, Container, Nome, Saldo, Title, List } from './styles'
import HistoricoList from '../../components/HistoricoList';

export default function Home() {

    const { user } = useContext(AuthContext)
    const [historico, setHistorico] = useState([
        {key: '1', tipo: 'receita', valor: 2000},
        {key: '2', tipo: 'despesa', valor: 2000},
        {key: '3', tipo: 'receita', valor: 2000},
        {key: '4', tipo: 'despesa', valor: 10.99},
    ])
    return (
        <Background>
            <MenuHamburg />
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>R$ 200,00</Saldo>
            </Container>

            <Title>Últimas movimentações</Title>

            <List 
                data={historico}
                keyExtractor={item => item.key}
                renderItem={({item})=> (<HistoricoList data={item}/>)}
                showsVerticalScrollIndicator={false}
            />
        </Background>
    );
}