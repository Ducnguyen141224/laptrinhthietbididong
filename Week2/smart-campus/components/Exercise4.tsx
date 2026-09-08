import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

function PrimaryButton() {
    const [loading, setLoading] = useState(false);

    return (
        <Pressable
            disabled={loading}
            onPress={() => {
                setLoading(true);

                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }}
            style={({ pressed }) => ({
                padding: 15,
                marginTop: 10,
                borderWidth: 1,
                backgroundColor: pressed ? "#ccc" : "white",
            })}
        >
            <Text style={{ textAlign: "center" }}>
                {loading ? "Đang xử lý..." : "Đăng ký khóa học"}
            </Text>
        </Pressable>
    );
}

function SecondaryButton() {
    return (
        <Pressable
            style={({ pressed }) => ({
                padding: 15,
                marginTop: 10,
                borderWidth: 1,
                backgroundColor: pressed ? "#ddd" : "white",
            })}
        >
            <Text style={{ textAlign: "center" }}>
                Xem chi tiết
            </Text>
        </Pressable>
    );
}

function IconButton() {
    return (
        <Pressable
            style={({ pressed }) => ({
                width: 50,
                height: 50,
                marginTop: 10,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                opacity: pressed ? 0.5 : 1,
            })}
        >
            <Text>+</Text>
        </Pressable>
    );
}

export default function Exercise4() {
    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                paddingTop: 40,
            }}
        >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Trạng thái nút
            </Text>

            <PrimaryButton />

            <SecondaryButton />

            <IconButton />
        </View>
    );
}