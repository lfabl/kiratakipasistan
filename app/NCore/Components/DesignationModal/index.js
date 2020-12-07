import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import Modal from 'react-native-modal';

//NCore Components
import Text from "../Text";

//NCore Theme
import {
    GeneralPadding, BetweenObjectsMargin,
} from "../../index";
import Normalize from "../Normalize";

const DesignationModal = ({ style, title, modalVisible, setModalVisible, onSubmitPress, children }) => {
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
                        fontSize: Normalize(16),
                        color: "white",
                        alignSelf: "flex-start"
                    }}>{title}</Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                    >
                        <Icon
                            name={"times"}
                            color={"white"}
                            size={20}
                            style={{
                                alignSelf: "flex-end",
                            }}
                        >
                        </Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    {
                        children
                    }
                </View>
                <View style={styles.constContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false)
                            onSubmitPress()
                        }}
                    >
                        <Text style={{
                            fontFamily: "Exo2.0-Bold",
                            color: "white",
                        }}>Kiracıyı Sil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: 6,
    },
    headerContainer: {
        width: "100%",
        backgroundColor: "#192430",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        padding: GeneralPadding / 4,
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    contentContainer: {
        width: "100%",
        marginBottom: 4
    },
    constContainer: {
        width: "100%",
        backgroundColor: "#C60202",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        padding: GeneralPadding / 4,
        alignItems: "center",
        justifyContent: "center"
    },
});
export default DesignationModal;