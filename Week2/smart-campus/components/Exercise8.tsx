import React from "react";
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";

export default function Exercise8() {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={{
                    padding: 20,
                    paddingTop: 100,
                }}
                keyboardShouldPersistTaps="handled"
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",

                    }}
                >
                    Đăng ký khóa học
                </Text>

                <TextInput
                    placeholder="Họ và tên"
                    style={{
                        borderWidth: 1,
                        padding: 12,
                        marginTop: 20,
                    }}
                />

                <TextInput
                    placeholder="Mã sinh viên"
                    style={{
                        borderWidth: 1,
                        padding: 12,
                        marginTop: 15,
                    }}
                />

                <TextInput
                    placeholder="Email"
                    style={{
                        borderWidth: 1,
                        padding: 12,
                        marginTop: 15,
                    }}
                />

                <TextInput
                    placeholder="Tên khóa học"
                    style={{
                        borderWidth: 1,
                        padding: 12,
                        marginTop: 15,
                    }}
                />

                <TextInput
                    placeholder="Nội dung ghi chú"
                    multiline
                    style={{
                        borderWidth: 1,
                        padding: 12,
                        marginTop: 15,
                        height: 200,
                    }}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}