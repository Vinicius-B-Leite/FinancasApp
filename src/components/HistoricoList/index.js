import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Tipo, IconView, TipoText, ValorText } from './styles'



export default function HistoricoList({ data }) {
    return (
        <Container>
            <Tipo>
                <IconView tipo={data.tipo}>
                    <Ionicons name={`arrow-${data.tipo === 'receita' ? 'up' : 'down'}`} size={20} color="#fff" />


                    <TipoText>{data.tipo}</TipoText>
                </IconView>
            </Tipo>

            <ValorText>R$ {data.valor}</ValorText>
        </Container>
    );
}