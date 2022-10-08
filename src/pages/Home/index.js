import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import MenuHamburg from '../../components/MenuHamburg'
import { Background, Container, Nome, Saldo, Title, List } from './styles'
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../service/firebaseConnection'
import { format, isPast } from 'date-fns';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from '../../components/DatePicker';


export default function Home() {

    const { user } = useContext(AuthContext)
    const [historico, setHistorico] = useState([])
    const [showPicker, setShowPicker] = useState(false)
    const [saldo, setSaldo] = useState(0)

    const [newDate, setNewDate] = useState(new Date())

    useEffect(() => {
        async function loadList() {
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo)
            })

            await firebase.database().ref('historico').child(user.uid)
                .orderByChild('data').equalTo(format(newDate, 'dd/MM/yy')).limitToLast(5).on('value', (snapshot) => {
                    setHistorico([])

                    snapshot.forEach(i => {
                        console.log(i)
                        let data = {
                            key: i.key,
                            tipo: i.val().tipo,
                            valor: i.val().valor,
                            data: i.val().data
                        }
                        setHistorico(oldHis => [...oldHis, data].reverse())
                    })
                })
        }
        loadList()
    }, [newDate])

    function deletarItem(item) {
        // if (isPast(new Date(item.data))){
        //     alert("Você não pode excluir uma data antiga")
        //     return
        // }

        Alert.alert(
            'Atenção',
            `Você deseja deletar o regitro ${item.tipo} - ${item.valor}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => deletarItemSucesso(item)
                }
            ]
        )
    }

    async function deletarItemSucesso(item) {

        await firebase.database().ref('historico').child(user.uid).child(item.key).remove().then(async () => {
            let novoSaldo = saldo
            item.tipo === 'despesa' ? novoSaldo += parseFloat(item.valor) : novoSaldo -= parseFloat(item.valor)

            await firebase.database().ref('users').child(user.uid).child('saldo').set(novoSaldo)
        })
    }

    return (
        <Background>
            <MenuHamburg />
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>R$ {saldo.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
            </Container>

            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <AntDesign name="calendar" size={24} color="#fff" />
                </TouchableOpacity>
                <Title>Últimas movimentações</Title>
            </View>


            <List
                data={historico}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (<HistoricoList data={item} deletarItem={deletarItem} />)}
                showsVerticalScrollIndicator={false}
            />
            {
                showPicker && (
                    <DatePicker
                        onClose={() => setShowPicker(false)}
                        data={newDate}
                        onChange={(data) => { 
                            setNewDate(data)
                            setShowPicker(false)
                        }}
                    />)
            }
        </Background>
    );
}