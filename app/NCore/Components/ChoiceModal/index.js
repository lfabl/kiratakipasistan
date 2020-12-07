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
    GeneralPadding, BetweenObjectsMargin,
} from "../../index";
import Normalize from "../Normalize";

const ChoiceModal = ({ style, title, modalVisible, setModalVisible, onSubmitPress, children }) => {
    return (
        <Modal
            isVisible={modalVisible} style={{
                flex: 1,
                alignItems: "center",
                padding: GeneralPadding
            }}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={{
                        fontFamily: "Exo2.0-Bold",
                        fontSize: Normalize(16)
                    }}>{title}</Text>
                </View>
                <View style={styles.contentContainer}>
                    {
                        children
                    }
                </View>
                <View style={styles.constContainer}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={{
                            fontFamily: "Exo2.0",
                            fontWeight: "600",
                            alignSelf: "flex-end",
                            color: "rgba(39, 39, 39, 0.7)",
                            margin: GeneralPadding / 4
                        }}>İptal</Text>
                    </TouchableOpacity>
                    {
                        onSubmitPress ? <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false) 
                                onSubmitPress() 
                            }}
                        >
                            <Text style={{
                                fontFamily: "Exo2.0",
                                fontWeight: "600",
                                alignSelf: "flex-end",
                                color: "#30D5C8",
                                margin: GeneralPadding / 4
                            }}>Tamam</Text>
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
    headerContainer: {
        width: "100%",
        marginBottom: 16,
    },
    contentContainer: {
        width: "100%",
        maxHeight: "88%",
        marginBottom: 4,
    },
    constContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
export default ChoiceModal;