import React, { useState } from 'react';
import { View, Text, TextInput, Button,StyleSheet,TouchableOpacity } from 'react-native';
import { SendEmail } from './MailSend';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

export default function MailScreen() {
    const { theme, toggleTheme } = useTheme();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState();
    const navigation = useNavigation();
    const[mail,setMail] = useState();
    const [message,setMessage] = useState();

    const handleEmailSend = async () => {
        try {
            const body = `Phone Number: ${phoneNumber}\nSubject: ${subject}`;
            await SendEmail('ecotracker407@gmail.com', 'User Feedback', body);
            navigation.navigate('Redirect'); 
        } catch (error) {
            alert('Failed to send email. Please check your email settings.');
            console.log('Error sending message', error)
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.label, { color: theme.titleColor }]}>Enter your phone number</Text>
        <TextInput
            style={[styles.input, { backgroundColor: 'white', color: 'black'}]}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            placeholder="Phone Number"
        />
        <Text style={[styles.label, { color: theme.titleColor }]}>Enter your email address</Text>
        <TextInput 
            style={[styles.input, { backgroundColor: 'white', color: 'black'}]}
            value={mail}
            onChangeText={text => setMail(text)}
            placeholder="Email"
        />  
        <Text style={[styles.label, { color: theme.titleColor }]}>Enter the subject</Text>
        <TextInput
           style={[styles.input, { backgroundColor: 'white', color: 'black'}]}
            value={subject}
            onChangeText={text => setSubject(text)}
            placeholder="Subject"
        />
        <Text style={[styles.label, { color: theme.titleColor }]}>Enter your message</Text>
        <TextInput    
            style={[styles.input, { backgroundColor: 'white', color: 'black'}]}
            value={message}
            onChangeText={text  => setMessage(text)}
            placeholder="Message"
        />
        <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.buttonColor}]}
            onPress={handleEmailSend}
          >
            <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>Send Email</Text>
        </TouchableOpacity>
    </View>
    );
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: 'white',  
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#00FF00',  
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: '#FFF',  
    },
    button: {
    backgroundColor: 'red',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
})