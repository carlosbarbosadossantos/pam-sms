import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as SMS from 'expo-sms';

export default function SmsScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const sendSMS = async () => {
        const cleanedNumber = phoneNumber.replace(/\D/g, '');

        if (!cleanedNumber || cleanedNumber.length < 8 || !message.trim()) {
            Alert.alert("Erro", "Preencha um número válido e uma mensagem.");
            return;
        }

        const isAvailable = await SMS.isAvailableAsync();

        if (isAvailable) {
            await SMS.sendSMSAsync([cleanedNumber], message);
        } else {
            Alert.alert("Erro", "Envio de SMS não está disponível neste dispositivo.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enviar SMS</Text>
            <Text style={styles.subtitle}>Preencha os campos abaixo</Text>

            <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="(99) 99999-9999"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholderTextColor="#999"
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={4}
                placeholder="Digite sua mensagem..."
                value={message}
                onChangeText={setMessage}
                placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={sendSMS}>
                <Text style={styles.buttonText}>Enviar SMS</Text>
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
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#2196F3',
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
