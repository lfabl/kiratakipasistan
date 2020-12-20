import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native";

import Modal from 'react-native-modal';

//NCore Components
import Text from "../Text";

//NCore Theme
import {
    GeneralPadding
} from "../../index";
import Normalize from "../Normalize";

const ChoiceModal = ({ style, title, modalVisible, setModalVisible, onCanelPress, onSubmitPress, children }) => {
    return (
        <Modal
            isVisible={modalVisible}
            style={styles.modalContainer}
        >
            {/* Container */}
            <View style={styles.container}>

                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    {
                        children
                    }
                </View>

                {/* Bottom */}
                <View style={styles.bottomContainer}>

                    {/* Canel Button */}
                    <TouchableOpacity onPress={() => typeof onCanelPress !== "undefined" ? onCanelPress() : setModalVisible(false)}>
                        <Text style={styles.canel}>İptal</Text>
                    </TouchableOpacity>

                    {/* Submit Button */}
                    {
                        onSubmitPress ? <TouchableOpacity onPress={() => {
                            onSubmitPress()
                        }}>
                            <Text style={styles.submit}>Tamam</Text>
                        </TouchableOpacity> : null
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        padding: GeneralPadding / 2,
        borderRadius: 6,
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
        padding: GeneralPadding
    },
    headerContainer: {
        width: "100%",
        marginBottom: 16,
    },
    title: {
        fontFamily: "Exo2.0-Bold",
        fontSize: Normalize(16)
    },
    contentContainer: {
        width: "100%",
        maxHeight: "88%",
        marginBottom: 4,
    },
    bottomContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    canel: {
        fontFamily: "Exo2.0",
        fontWeight: "600",
        alignSelf: "flex-end",
        color: "rgba(39, 39, 39, 0.7)",
        margin: GeneralPadding / 4
    },
    submit: {
        fontFamily: "Exo2.0",
        fontWeight: "600",
        alignSelf: "flex-end",
        color: "#30D5C8",
        margin: GeneralPadding / 4
    },
});
export default ChoiceModal;