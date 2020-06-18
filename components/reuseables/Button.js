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

export const StyledButton =  styled.TouchableOpacity`
    border-width: 2;
    border-radius: 3;
    height: 60;
    justify-content: center;
`

export const CenterView = styled.View`
    flex: 1;
    background-color: white;
    justify-content: space-between;
    alignItems: center;
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