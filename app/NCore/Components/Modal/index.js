import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";
import NativeModal from 'react-native-modal';
import Text from "../Text"
const Modal = ({ modalVisible, setModelVisible, modelText }) => {
    return (
        <NativeModal
            style={styles.modalContainer}
            isVisible={modalVisible}
        >
            <TouchableOpacity
                style={{
                    margin: 0,
                    padding: 0,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => setModelVisible(false)}
            >
                <View style={{
                    padding: 20,
                    margin: 20,
                    backgroundColor: "white",
                    borderRadius: 10,
                    alignItems: "center"
                }}>
                    <Text style={{
                        flexWrap: "wrap",
                        fontFamily: "Exo2.0-SemiBold"
                    }}>{modelText}</Text>
                </View>
            </TouchableOpacity>
        </NativeModal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0,
        padding: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})

export default Modal;