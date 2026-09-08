import React from "react";
import { View, Text, FlatList } from "react-native";

const thongBao = [
    {
        id: "1",
        tieuDe: "Lịch thi cuối kỳ",
        noiDung: "Lịch thi cuối kỳ đã được cập nhật.",
    },
    {
        id: "2",
        tieuDe: "Thông báo nghỉ học",
        noiDung: "Sinh viên chú ý lịch nghỉ học mới.",
    },
    {
        id: "3",
        tieuDe: "Đăng ký môn học",
        noiDung: "Thời gian đăng ký môn học sắp bắt đầu.",
    },
];

export default function Exercise5() {
    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                paddingTop: 50,
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Danh sách thông báo
            </Text>

            <FlatList
                data={thongBao}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            borderWidth: 1,
                            padding: 15,
                            marginBottom: 10,
                        }}
                    >
                        <Text style={{ fontWeight: "bold" }}>
                            {item.tieuDe}
                        </Text>

                        <Text style={{ marginTop: 5 }}>
                            {item.noiDung}
                        </Text>
                    </View>
                )}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 5 }} />
                )}
                ListHeaderComponent={() => (
                    <Text style={{ marginBottom: 10 }}>
                        Các thông báo mới nhất
                    </Text>
                )}
                ListFooterComponent={() => (
                    <Text style={{ marginTop: 10 }}>
                        Đã hiển thị hết thông báo
                    </Text>
                )}
                ListEmptyComponent={() => (
                    <Text>Không có thông báo nào.</Text>
                )}
            />
        </View>
    );
}