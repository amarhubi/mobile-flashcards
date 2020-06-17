import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function Button({ onPress, style, text, textStyle }){
    return (
        <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
            <Text style={[textStyle, {textAlign: 'center', fontSize: 22}]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderRadius: 3,
        height: 60,
        margin: 30,
        justifyContent: 'center',
    },
})