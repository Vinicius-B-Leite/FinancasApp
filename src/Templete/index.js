import React, { useContext } from 'react';
import { StatusBar, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { ThemeContext } from '../contexts/theme';
import Routes from '../routes';

export default function Templete() {
    const { theme } = useContext(ThemeContext)

    return (
        <ThemeProvider theme={theme}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <Routes />
        </ThemeProvider>
    );
}