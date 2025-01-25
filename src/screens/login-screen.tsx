import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Email:', email);
    } catch (error) {
      setError('error');
    }
    setLoading(false);
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;
