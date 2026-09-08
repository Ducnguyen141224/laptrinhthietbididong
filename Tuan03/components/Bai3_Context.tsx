
import React, { createContext, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserContext = createContext<any>(null);

function ProfileScreen() {
  const user = useContext(UserContext);

  return (
    <View style={styles.profileBox}>
      <Text style={styles.text}>Xin chào {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
    </View>
  );
}

export default function Bai3_UseContext() {
  return (
    <UserContext.Provider
      value={{
        name: 'Nguyễn Văn Đức',
        email: 'vanduc141224@gmail.com',
      }}
    >
      <View style={styles.container}>
        <ProfileScreen />
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  profileBox: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#007bff',
    backgroundColor: '#f5f9ff',
  },

  text: {
    fontSize: 18,
    color: '#007bff',
    marginBottom: 5,
  },
});

