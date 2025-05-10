import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import call from 'react-native-phone-call';

export default function PhoneScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');

    const makePhoneCall = () => {
        const cleanedNumber = phoneNumber.replace(/\D/g, '');

        if (!cleanedNumber || cleanedNumber.length < 8) {
            Alert.alert("Erro", "Por favor, insira um número de telefone válido.");
            return;
        }

        const args = {
            number: cleanedNumber,
            prompt: false
        };

        call(args).catch(console.error);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fazer uma Ligação</Text>
            <Text style={styles.subtitle}>Insira o número abaixo para ligar</Text>
            <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="(99) 99999-9999"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={makePhoneCall}>
                <Text style={styles.buttonText}>Ligar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
