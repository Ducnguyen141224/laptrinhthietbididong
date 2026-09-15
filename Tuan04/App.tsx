import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Newsfeed from './components/Newsfeed';
import UserProfileDetail from './components/UserProfileDetail';
import ProductSearch from './components/ProductSearch';
import ApiErrorHandling from './components/ApiErrorHandling';
import FilteredList from './components/FilteredList';
import Pagination from './components/Pagination';
import PullToRefresh from './components/PullToRefresh';
export default function App() {
  return (
    // <Newsfeed />
    // <UserProfileDetail />
    // <ProductSearch />
    // <ApiErrorHandling />
    // <FilteredList />
    // <Pagination />
    <PullToRefresh />

  );
}


