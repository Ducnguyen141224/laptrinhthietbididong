import React from "react";
import { View, Text } from "react-native";

function CourseCard({ ten }: { ten: string }) {
    return (
        <View
            style={{
                flexBasis: "45%",
                minWidth: 150,
                maxWidth: 300,
                flexGrow: 1,
                borderWidth: 1,
                padding: 15,
                margin: 5,

            }}
        >
            <Text style={{ fontWeight: "bold" }}>
                {ten}
            </Text>

            <Text style={{ marginTop: 5 }}>
                Khóa học dành cho sinh viên
            </Text>
        </View>
    );
}

export default function Exercise7() {
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
                    marginBottom: 15,
                }}
            >
                Danh sách khóa học
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                <CourseCard ten="Phát triển ứng dụng di động" />
                <CourseCard ten="Lập trình Web" />
                <CourseCard ten="Cơ sở dữ liệu" />
                <CourseCard ten="Trí tuệ nhân tạo" />
            </View>
        </View>
    );
}