import React from "react";
import {
    Text as NativeText,
    StyleSheet
} from "react-native";

const Text = ({ style, children, onPress }) => {
    return (
        <NativeText
            style={[styles.text, style]}
            onPress={onPress}
        >
            {children}
        </NativeText>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontFamily: "Exo2.0-Medium"
    }
});

export default Text