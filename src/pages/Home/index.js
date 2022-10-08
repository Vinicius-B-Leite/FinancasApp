import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import MenuHamburg from '../../components/MenuHamburg'
import { Background, Container, Nome, Saldo, Title, List } from './styles'
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../service/firebaseConnection'
import { format } from 'date-fns';

export default function Home() {

    const { user } = useContext(AuthContext)
    const [historico, setHistorico] = useState([])
    const [saldo, setSaldo] = useState(0)

    useEffect(()=>{
        async function loadList(){
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot)=>{
                setSaldo(snapshot.val().saldo)
            })

            await firebase.database().ref('historico').child(user.uid)
            .orderByChild('data').equalTo(format(new Date(), 'dd/MM/yy')).limitToLast(5).on('value', (snapshot) =>{
                setHistorico([])

                snapshot.forEach(i=>{
                    console.log(i)
                    let data = {
                        key: i.key,
                        tipo: i.val().tipo,
                        valor: i.val().valor
                    }
                    setHistorico(oldHis => [...oldHis, data].reverse())
                })
            })
        }
        loadList()
    }, [])

    return (
        <Background>
            <MenuHamburg />
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>R$ {saldo.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
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