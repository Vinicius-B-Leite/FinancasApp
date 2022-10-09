import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #131313;
    align-items: center;
`
export const ChangeContainer = styled.View`
    flex-direction: row;
    justify-content: ${props => props.justifyContent || 'space-between'};
    align-items: center;
    width: 100%;
    marginVertical: 5px;
`
export const Nome = styled.TextInput.attrs({
    placeholderTextColor: '#fff'
})`
    text-align: center;
    font-size: 32px;
    color: #fff;
    text-transform: capitalize;
`

export const Email = styled.TextInput.attrs({
    placeholderTextColor: '#fff'
})`
    color: #fff;
    font-size: 18px;
`
export const RegistrorTotais = styled.Text`
    font-size: 18px;
    color: #fff;
`
export const Tema = styled.Text`
    color: #fff;
    font-size: 18px;
`

export const NewLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: #00b94a;
    width: 90%;
    height: 45px;
    border-radius: 10px;
    margin-bottom: 10px;
`
export const NewText = styled.Text`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
`
export const Logout = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background-color: #c62c36;
    width: 90%;
    height: 45px;
    border-radius: 10px;
`
export const LogoutText = styled.Text`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
` 