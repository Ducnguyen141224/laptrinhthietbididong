import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import MovieCard, { Movie } from './components/MovieCard';

const API = 'https://6aba25b55b549d818d620785.mockapi.io/products/movies';

const LIMIT = 10;

function MainScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [isTile, setIsTile] = useState(false);

  const [errorPage, setErrorPage] =
    useState<number | null>(null);

  const [reload, setReload] = useState(0);

  // chống gọi API trùng
  const fetchingRef = useRef(false);

  // GET API
  useEffect(() => {
    const getMovies = async () => {
      if (fetchingRef.current) return;

      fetchingRef.current = true;
      setErrorPage(null);

      if (page > 1) {
        setLoadingMore(true);
      }

      try {
        const res = await fetch(
          `${API}?page=${page}&limit=${LIMIT}`
        );

        if (res.status === 404) {
          setHasMore(false);
          return;
        }

        if (!res.ok) {
          throw new Error('Lỗi API');
        }

        const data: Movie[] = await res.json();

        setMovies((old) => {
          const list =
            page === 1
              ? data
              : [...old, ...data];

          // chống trùng id
          const map = new Map(
            list.map((item) => [
              item.id,
              item,
            ])
          );

          return Array.from(map.values());
        });

        setHasMore(data.length === LIMIT);
      } catch {
        setErrorPage(page);
      } finally {
        fetchingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
        setRefreshing(false);
      }
    };

    getMovies();
  }, [page, reload]);

  // click phim
  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find(
        (item) => item.id === id
      );

      if (movie) {
        Alert.alert(
          `${movie.title} (${movie.year})`
        );
      }
    },
    [movies]
  );

  // load trang tiếp
  const onEndReached = () => {
    if (
      fetchingRef.current ||
      !hasMore ||
      errorPage !== null
    ) {
      return;
    }

    setPage((p) => p + 1);
  };

  // refresh
  const onRefresh = () => {
    setRefreshing(true);
    setHasMore(true);

    if (page === 1) {
      setReload((r) => r + 1);
    } else {
      setPage(1);
    }
  };

  // thử lại trang lỗi
  const retry = () => {
    setReload((r) => r + 1);
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Movie App
        </Text>

        <View style={styles.row}>
          <Text>Dạng lưới</Text>

          <Switch
            value={isTile}
            onValueChange={setIsTile}
          />
        </View>
      </View>

      <FlatList
        key={isTile ? '2' : '1'}
        data={movies}
        numColumns={isTile ? 2 : 1}
        keyExtractor={(item) => item.id}

        columnWrapperStyle={
          isTile
            ? { gap: 10 }
            : undefined
        }

        renderItem={({ item }) => (
          <View
            style={
              isTile
                ? { flex: 1, maxWidth: '50%' }
                : undefined
            }
          >
            <MovieCard
              movie={item}
              layout={
                isTile ? 'tile' : 'row'
              }
              onSelect={handleSelect}
            />
          </View>
        )}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}

        ListFooterComponent={
          errorPage !== null ? (
            <View style={styles.footer}>
              <Text>Tải thất bại</Text>

              <Button
                title="Thử lại"
                onPress={retry}
              />
            </View>
          ) : loadingMore ? (
            <ActivityIndicator />
          ) : !hasMore ? (
            <Text style={styles.footer}>
              — Đã hết danh sách —
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },

  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footer: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 15,
  },
});