import React, { useState } from "react";
import {
    View,
    TextInput as NativeTextInput,
    StyleSheet,
} from "react-native";

const SearchBar = ({ style, value, onChangeText, placeholder}) => {
    return (
        <View style={styles.searchSection}>
            <NativeTextInput
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder={placeholder}
                style={[
                    styles.textInput,
                    style
                ]}
            />
        </View>

    );
}
const styles = StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'gray',
        alignItems: "flex-end",
        marginBottom: 20
    },
    textInput: {
        padding: 0,
        fontFamily: "Exo2.0-SemiBold",
        color: "gray",
        marginLeft: 5
    }
})
export default SearchBar