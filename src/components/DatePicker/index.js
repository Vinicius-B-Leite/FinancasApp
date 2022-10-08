import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { Container, Header } from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DatePicker({onChange, data, onClose}) {

    const [dateNow, setDateNow] = useState(data)

    return (
        <Container>
            {
                Platform.OS === 'ios' && (
                    <Header>
                        <TouchableOpacity onPress={() => onClose()}>
                            <Text>Fechar</Text>
                        </TouchableOpacity>
                    </Header>
                )
            }
            <DateTimePicker
                value={dateNow}
                mode="date"
                display="default"
                style={{backcroundColor: '#fff'}}
                onChange={(e, d) => {
                    const currentDate = d || dateNow
                    setDateNow(currentDate)
                    onChange(currentDate)
                }}
            />
        </Container>
    );
}