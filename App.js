import 'react-native-gesture-handler';
import React from 'react-native';
import Contexts from './src/contexts/index'
import ThemeContextProvider, { ThemeContext } from './src/contexts/theme';
import AuthProvider from './src/contexts/auth';
import { useTheme } from 'styled-components/native';
import { myTheme } from './src/theme';
import { green } from './src/theme/green';
import Templete from './src/Templete';

export default function App() {

  return (
    <Contexts>
      <Templete/>
    </Contexts>
  );
}
