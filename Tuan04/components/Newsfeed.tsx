import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

type Post = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Newsfeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        const result = data as Post[];
        setPosts(result);
      })
      .catch(error => {
        console.log('Lỗi:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>News Feed</Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#ffffff',
    },
  
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#000000',
    },
  
    item: {
      padding: 15,
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
    },
  
    title: {
      fontSize: 16,
      color: '#000000',
    },
  });