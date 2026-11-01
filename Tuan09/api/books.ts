import { Platform } from 'react-native';
import type { Book } from '../types';

// Điện thoại thật: cấu hình EXPO_PUBLIC_API_URL=http://IP_MAY_TINH:3000 trong .env
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000');

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export const fetchBooks = () => request<Book[]>('/books');
export const fetchBookById = (id: string) => request<Book>(`/books/${id}`);
