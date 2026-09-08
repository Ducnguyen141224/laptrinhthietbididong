import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';

export default function Bai1_UseState() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');

  const handleClear = () => {
    setFullName('');
    setAge('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Bài 3.1.1: useState</Text>

        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Nhập họ tên"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Tuổi</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Nhập tuổi"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
        />

        <View style={styles.resultBox}>
          <Text style={styles.greeting}>
            {fullName
              ? `Xin chào, ${fullName}!`
              : 'Vui lòng nhập họ tên'}
          </Text>

          {age !== '' && parseInt(age) < 18 && (
            <Text style={styles.warning}>
              Cảnh báo: Bạn chưa đủ 18 tuổi!
            </Text>
          )}
        </View>

        <View style={styles.button}>
          <Button
            title="Xóa dữ liệu"
            onPress={handleClear}
            color="#EF4444"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#111827',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    borderRadius: 10,
    fontSize: 16,
    color: '#111827',
  },

  resultBox: {
    backgroundColor: '#F0FDF4',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },

  greeting: {
    fontSize: 17,
    color: '#15803D',
    fontWeight: '600',
  },

  warning: {
    color: '#DC2626',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },

  button: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});