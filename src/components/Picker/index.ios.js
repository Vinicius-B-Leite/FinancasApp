import React from 'react';
import { Picker } from '@react-native-picker/picker'


export default function Pickerr({ onChange, tipo }) {
    return (
            <Picker style={{width: '90%', height: 45, backgroundColor: '#fff', marginTop: 20, marginHorizontal: 15}} selectedValue={tipo} onValueChange={(itemValue, itemIndex) => onChange(itemValue) }>
                <Picker.Item label='Receita' value='receita' />
                <Picker.Item label='Despesa' value='despesa' />
            </Picker>
    );
}