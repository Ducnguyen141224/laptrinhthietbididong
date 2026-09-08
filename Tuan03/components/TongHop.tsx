
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Pressable,
} from "react-native";

// ==========================
// 1. Kiểu dữ liệu Todo
// ==========================
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

// ==========================
// 2. Reducer
// ==========================
type Action =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
}

// ==========================
// 3. Context sáng / tối
// ==========================
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

// ==========================
// Component TodoItem
// ==========================
type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.todoItem,
        { backgroundColor: isDark ? "#333" : "#f5f5f5" },
      ]}
    >
      <Pressable
        style={styles.todoContent}
        onPress={() => onToggle(todo.id)}
      >
        <Text
          style={[
            styles.todoText,
            {
              color: isDark ? "white" : "black",
              textDecorationLine: todo.completed ? "line-through" : "none",
            },
          ]}
        >
          {todo.title}
        </Text>

        <Text
          style={[
            styles.status,
            { color: todo.completed ? "green" : "orange" },
          ]}
        >
          {todo.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
        </Text>
      </Pressable>

      <Button
        title="Xóa"
        color="red"
        onPress={() => onDelete(todo.id)}
      />
    </View>
  );
}

// ==========================
// Component chính
// ==========================
function TodoApp() {
  // useContext
  const { isDark, toggleTheme } = useContext(ThemeContext);

  // useReducer
  const [todos, dispatch] = useReducer(todoReducer, [
    {
      id: "1",
      title: "Học React Native",
      completed: false,
    },
  ]);

  // useState
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");

  // useEffect
  useEffect(() => {
    console.log(`Danh sách hiện có ${todos.length} công việc`);
  }, [todos.length]);

  // useMemo lọc công việc
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [todos, keyword]);

  // useMemo đếm công việc chưa hoàn thành
  const remainingCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  // Thêm công việc
  const handleAddTodo = () => {
    if (title.trim() === "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
    };

    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });

    setTitle("");
  };

  // useCallback đánh dấu hoàn thành
  const handleToggleTodo = useCallback((id: string) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  }, []);

  // useCallback xóa công việc
  const handleDeleteTodo = useCallback((id: string) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1e1e1e" : "white" },
      ]}
    >
      <Text
        style={[
          styles.header,
          { color: isDark ? "white" : "black" },
        ]}
      >
        Quản lý công việc cá nhân
      </Text>

      {/* Chuyển giao diện sáng / tối */}
      <View style={styles.themeRow}>
        <Text
          style={[
            styles.label,
            { color: isDark ? "white" : "black" },
          ]}
        >
          Chế độ tối
        </Text>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
        />
      </View>

      {/* Nhập công việc */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#333" : "white",
            color: isDark ? "white" : "black",
            borderColor: isDark ? "#777" : "#ccc",
          },
        ]}
        value={title}
        onChangeText={setTitle}
        placeholder="Nhập công việc..."
        placeholderTextColor={isDark ? "#bbb" : "#777"}
      />

      <Button
        title="Thêm công việc"
        onPress={handleAddTodo}
      />

      {/* Tìm kiếm */}
      <TextInput
        style={[
          styles.input,
          styles.searchInput,
          {
            backgroundColor: isDark ? "#333" : "white",
            color: isDark ? "white" : "black",
            borderColor: isDark ? "#777" : "#ccc",
          },
        ]}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm kiếm công việc..."
        placeholderTextColor={isDark ? "#bbb" : "#777"}
      />

      {/* Số công việc chưa hoàn thành */}
      <Text
        style={[
          styles.remaining,
          { color: isDark ? "#4dabff" : "blue" },
        ]}
      >
        Công việc chưa hoàn thành: {remainingCount}
      </Text>

      {/* Danh sách */}
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyText,
              { color: isDark ? "#ccc" : "#666" },
            ]}
          >
            Không có công việc nào
          </Text>
        }
      />
    </View>
  );
}

// ==========================
// Component export chính
// ==========================
export default function TongHop() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((previous) => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      <TodoApp />
    </ThemeContext.Provider>
  );
}

// ==========================
// CSS
// ==========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  searchInput: {
    marginTop: 20,
  },

  remaining: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 15,
  },

  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
  },

  todoContent: {
    flex: 1,
  },

  todoText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  status: {
    fontSize: 13,
    marginTop: 4,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 30,
  },
});
