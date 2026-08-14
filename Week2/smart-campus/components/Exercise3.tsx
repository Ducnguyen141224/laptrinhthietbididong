import React, { useState } from "react";
import { View, Text, Image } from "react-native";

function CourseCard() {
    const [loiAnh, setLoiAnh] = useState(false);

    return (
        <View
            style={{
                borderWidth: 1,
                padding: 10,
                marginTop: 10,
            }}
        >
            {!loiAnh ? (
                <Image
                    source={{
                        uri: "https://abc-khong-ton-tai-12345.com/image.jpg",
                    }}
                    style={{
                        width: "100%",
                        height: 150,
                    }}
                    onError={() => setLoiAnh(false)}
                />
            ) : (
                <View
                    style={{
                        height: 150,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>Không thể tải hình ảnh</Text>
                </View>
            )}

            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 10,
                }}
            >
                Phát triển ứng dụng di động
            </Text>

            <Text>
                Môn học dành cho sinh viên ngành công nghệ thông tin.
            </Text>
        </View>
    );
}

export default function Exercise3() {
    return (
        <View style={{ padding: 20, paddingTop: 50 }}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                }}
            >
                Khóa học
            </Text>

            <CourseCard />
        </View>
    );
}