import React from 'react';
import { FlatList, View } from 'react-native';
import type { ReactElement } from 'react';
import type { Book } from '../types';
import BookCard from './BookCard';

type Props = {
  books: Book[];
  onPressBook: (id: string) => void;
  ListEmptyComponent?: ReactElement;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function BookGrid({ books, onPressBook, ListEmptyComponent, refreshing, onRefresh }: Props) {
  return <FlatList
    data={books}
    keyExtractor={b => b.id}
    numColumns={2}
    renderItem={({ item }) => <BookCard book={item} onPress={onPressBook} />}
    columnWrapperStyle={{ gap: 8 }}
    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    contentContainerStyle={{ padding: 8, flexGrow: books.length === 0 ? 1 : undefined }}
    ListEmptyComponent={ListEmptyComponent}
    refreshing={refreshing}
    onRefresh={onRefresh}
  />;
}
