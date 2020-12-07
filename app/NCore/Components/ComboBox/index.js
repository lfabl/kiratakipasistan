import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from "react-native";

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

//NCore Components
import Text from "../Text";
import Normalize from "../Normalize";
import ChoiceModal from "../ChoiceModal";

//NCore Theme
import {
    GeneralPadding,
    BetweenObjectsMargin
} from "../../index";

const ComboBox = ({ title, types, defaultSelectTypeKey, onSelectType, disabled, style, customModal, customModalFunction }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [placeHolder, setPlaceHolder] = useState("")
    useEffect(() => {
        const newTypes = types;
        const result = newTypes.filter(word => word.key === defaultSelectTypeKey);
        setPlaceHolder(result.length !== 0 ? result[0].name : "")
    })
    return (
        <View style={[styles.container, style]}>

            <ChoiceModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title={title}
            >
                <ScrollView>
                    {
                        types && types !== [] && types.length !== 0 ?
                            types.map((item, index) => {
                                return <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => {
                                        onSelectType(item.key)
                                        setModalVisible(false)
                                    }}
                                    key={index}
                                >
                                    <Text style={{
                                        fontFamily: "Exo2.0-Medium",
                                        fontSize: Normalize(16),
                                        color: defaultSelectTypeKey === item.key ? "#FF7F00" : "black",
                                    }}>
                                        {
                                            item.name
                                        }
                                    </Text>
                                </TouchableOpacity>
                            })
                            : null
                    }
                </ScrollView>
            </ChoiceModal>

            <TouchableOpacity
                onPress={() => {
                    if(disabled === true){
                        if(typeof customModal !== "undefined" && customModal === true){
                            customModalFunction(true);
                        }
                        else {
                            setModalVisible(true)
                        }
                    }

                }}
                disabled={!disabled}
            >
                <Text style={[styles.title]}>
                    {title}
                </Text>

                <View style={styles.comboBoxContainer}>
                    <Text style={styles.comboBoxText}>
                        {
                            placeHolder
                        }
                    </Text>
                    {
                        disabled === true ?
                            <Icon
                                name={"caret-down"}
                                color={"#656565"}
                                size={20}
                                style={{
                                    alignSelf: "flex-end"
                                }}
                            >
                            </Icon> : null
                    }
                </View>
            </TouchableOpacity>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },

    title: {
        fontFamily: "Exo2.0-Black",
        color: "#CACACA",
        fontSize: Normalize(13)
    },
    comboBoxContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: 'gray',
        padding: GeneralPadding / 10
    },
    comboBoxText: {
        fontFamily: "Exo2.0-SemiBold",
        color: "gray",
        marginLeft: 2,
        padding: 0
    },
    modalItem: {
        marginBottom: 6,
        paddingVertical: 2,
        alignSelf: "flex-start",
        width: "100%"
    },
})
export default ComboBox;