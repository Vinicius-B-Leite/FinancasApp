import styled from 'styled-components/native';


export const Background = styled.View`
    flex: 1;
    background-color: ${props => props.theme.backgroundColor};
`
export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#222'
})`
    height: 50px;
    width: 90%;
    background-color: rgba(255, 255, 255, 0.9);
    margin-top: 30px;
    font-size: 16px;
`
export const SubmitButton = styled.TouchableOpacity`
    height: 50px;
    width: 90%;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    background-color:${props => props.theme.primary};
`
export const SubmitText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #fff;
`