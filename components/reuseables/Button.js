import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export default function Button({ onPress, style, text, textStyle }){
    return (
        <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
            <Text style={[textStyle, {textAlign: 'center', fontSize: 22}]}>{text}</Text>
        </TouchableOpacity>
    )
}

// Button definitions
export const StyledButton = styled.TouchableOpacity`
    border-width: 2px;
    border-radius: 3px;
    border-color: black;
    height: 60px;
    align-self: stretch; 
    justify-content: center;
    margin: 5px 20px 5px 20px;
    justify-content: center;
    align-items: center;
`
export const DeleteButton = styled(StyledButton)`
    border-color: red;
`
export const PrimaryButton = styled(StyledButton)`
    border-color: black;
    background-color: black;
`
export const ApproveButton = styled(StyledButton)`
    background-color: green;
    border-color: green;
`
export const RejectButton = styled(StyledButton)`
    background-color: red;
    border-color: red;
`

// Text definitions
export const StyledButtonText = styled.Text`
    font-size: 22px;
`
export const DeleteText = styled(StyledButtonText)`
    color: red;
`
export const PrimaryText = styled(StyledButtonText)`
    color: white
`
export const Heading1 = styled.Text `
    font-size: 30px;
    padding: 20px;
`
export const Heading2 = styled.Text`
    font-size: 20px;
    padding: 10px;
`
export const Heading3 = styled.Text`
    font-size: 16px;
    padding: 10px;
`

// Containers
export const CenterView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    align-self: stretch;   
`

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderRadius: 3,
        height: 60,
        margin: 30,
        justifyContent: 'center',
    },
})