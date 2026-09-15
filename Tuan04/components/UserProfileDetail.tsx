import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export default function UserProfileDetail() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(data => {
        const result = data as User;
        setUser(result);
      })
      .catch(error => {
        console.log('Lỗi:', error);
      });
  }, []);

  if (user === null) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>

      <Text style={styles.text}>
        ID: {user?.id}
      </Text>

      <Text style={styles.text}>
        Họ tên: {user?.name}
      </Text>

      <Text style={styles.text}>
        Username: {user?.username}
      </Text>

      <Text style={styles.text}>
        Email: {user?.email}
      </Text>

      <Text style={styles.text}>
        Phone: {user?.phone}
      </Text>

      <Text style={styles.text}>
        Website: {user?.website}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
});