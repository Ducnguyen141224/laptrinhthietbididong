import React from "react";
import {
    View,
    Text,
    SectionList,
} from "react-native";

const sections = [
    {
        title: "Hôm nay",
        data: [
            "Lịch thi cuối kỳ đã được cập nhật",
            "Thông báo đăng ký môn học",
        ],
    },
    {
        title: "Tuần này",
        data: [
            "Thông báo nghỉ học",
            "Lịch học mới đã được cập nhật",
        ],
    },
    {
        title: "Trước đó",
        data: [
            "Thông báo học phí",
            "Thông báo hoạt động sinh viên",
        ],
    },
];

export default function Exercise6() {
    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                paddingTop: 40,
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 15,
                }}
            >
                Thông báo
            </Text>

            <SectionList
                sections={sections}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View
                        style={{
                            borderWidth: 1,
                            padding: 12,
                            marginBottom: 8,
                        }}
                    >
                        <Text>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({ section }) => (
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginTop: 10,
                            marginBottom: 8,
                        }}
                    >
                        {section.title}
                    </Text>
                )}
                stickySectionHeadersEnabled={true}
            />
        </View>
    );
}