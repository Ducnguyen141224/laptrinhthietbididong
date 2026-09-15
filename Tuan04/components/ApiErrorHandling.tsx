import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';

type CustomError = {
  message: string;
};

export default function ApiErrorHandling() {
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      console.log('Bắt đầu gọi API');

      // URL sai để tạo lỗi
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/abcxyz'
      );

      // fetch gặp 404 KHÔNG tự nhảy vào catch
      if (!response.ok) {
        throw new Error(`API lỗi: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      const customError = error as CustomError;

      console.log('ĐÃ VÀO CATCH');
      console.log(customError.message);

      setMessage(customError.message);

      Alert.alert(
        'Lỗi API',
        customError.message
      );
    }
  };

  return (
    <View style={styles.container}>

      <Button
        title="GỌI API LỖI"
        onPress={fetchData}
      />

      {message !== '' && (
        <Text style={styles.error}>
          {message}
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 20,
  },

  error: {
    color: 'red',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});