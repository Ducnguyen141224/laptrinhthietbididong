import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

type Post = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function PullToRefresh() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Hàm gọi API
  const fetchPosts = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos'
    );

    const data = await response.json();

    setPosts(data as Post[]);
  };

  // Load dữ liệu lần đầu
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await fetchPosts();
      } catch (error) {
        console.log('Lỗi:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Kéo xuống để refresh
  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await fetchPosts();
    } catch (error) {
      console.log('Lỗi:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Loading lần đầu
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Danh sách công việc
      </Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>
              {item.title}
            </Text>
          </View>
        )}

        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },

  text: {
    color: '#000000',
    marginTop: 10,
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },

  title: {
    fontSize: 16,
    color: '#000000',
  },
});