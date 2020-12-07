import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome5';

//NCore Theme
import {
    GeneralPadding
} from "../../index";

//NCore Components
import Text from "../Text";
import Normalize from "../Normalize";
import ChoiceModal from "../ChoiceModal";
import TextInput from "../TextInput";
import Modal from "../Modal";
import ImageModule from "./ImageModule";
const ComponentsDemonstrator = ({ style, title, items, onDeleteItem, onAddItem, onEditItem, disabled }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
    const [itemName, setItemName] = useState("");
    const [images, setImages] = useState([]);

    const [editIndex, setEditIndex] = useState(0);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editItemName, setEditItemName] = useState("");
    const [editImages, setEditImages] = useState([]);
    return (
        <View style={[styles.container, style]}>
            <Modal
                modalVisible={descriptionModalVisible}
                setModelVisible={(val) => setDescriptionModalVisible(val)}
                modelText={"Yeni demirbaş ekleme sınırına ulaştınız."}
            >

            </Modal>
            <ChoiceModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title={title}
                onSubmitPress={() => itemName !== "" ? onAddItem({
                    itemName: itemName,
                    images: images
                }) : null}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={{
                            flex: 1
                        }}
                        placeholder={"Yeni " + title}
                        value={itemName}
                        editable={true}
                        onChangeText={(text) => setItemName(text)}
                    />
                    <ImageModule
                        images={images}
                        disabled={true}
                        setImages={(newVal) => {
                            setImages(newVal)
                        }}
                    >
                    </ImageModule>
                </View>
            </ChoiceModal>

            <ChoiceModal
                modalVisible={editModalVisible}
                setModalVisible={setEditModalVisible}
                title={title}
                onSubmitPress={() => editItemName !== "" ? onEditItem({
                    itemName: editItemName,
                    images: editImages,
                    index: editIndex
                }) : null}>
                <View style={styles.modalView}>
                    <TextInput
                        style={{
                            flex: 1
                        }}
                        placeholder={"Yeni " + title}
                        value={editItemName}
                        editable={disabled}
                        onChangeText={(text) => setEditItemName(text)}
                    />
                    <ImageModule
                        images={editImages}
                        disabled={disabled}
                        setImages={(newVal) => {
                            setEditImages(newVal)
                        }}
                    >
                    </ImageModule>
                </View>
            </ChoiceModal>

            <View style={styles.header}>
                <Text style={styles.title}>
                    {title}
                </Text>
                {
                    disabled ? <TouchableOpacity
                        onPress={() => {
                            if (items.length < 8) {
                                setModalVisible(true)
                            }
                            else {
                                setDescriptionModalVisible(true)
                            }
                        }}
                    >
                        <Icon
                            name={"plus-circle"}
                            color={"#66ff00"}
                            size={Normalize(16)}
                            style={{
                                alignSelf: "flex-end",
                                marginHorizontal: Normalize(4)
                            }}
                        >
                        </Icon>
                    </TouchableOpacity> : null
                }
            </View>
            <ScrollView>
                {
                    items && items.length > 0 ?
                        items.map((item, index) => {
                            return <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    if (disabled) {
                                        setEditModalVisible(true);
                                    } else {
                                        setEditModalVisible(false)
                                    }
                                    setEditItemName(item.name);
                                    setEditImages(item.images);
                                    setEditIndex(index)
                                }}
                            >
                                <View
                                    style={styles.item}
                                >
                                    <Text style={styles.itemText}>
                                        {
                                            item.name
                                        }
                                    </Text>
                                    <ImageModule
                                        images={item.images}
                                        setImages={(newVal) => {
                                            setEditImages(newVal)
                                        }}
                                    />
                                    {
                                        disabled ? <TouchableOpacity
                                            onPress={() => onDeleteItem(index)}
                                        >
                                            <Icon
                                                name={"trash"}
                                                color={"#D00000"}
                                                size={Normalize(14)}
                                                style={{
                                                    alignSelf: "flex-end"
                                                }}
                                            >
                                            </Icon>
                                        </TouchableOpacity> : null
                                    }
                                </View>
                            </TouchableOpacity>
                        })
                        : <Text style={{ color: "rgb(135, 135, 135)" }}>Hiç demirbaş eklenmedi.</Text>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        borderBottomWidth: 0.8,
        borderBottomColor: "grey",
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6
    },
    title: {
        fontFamily: "Exo2.0-Black",
        color: "#CACACA",
        fontSize: Normalize(13)
    },
    item: {
        padding: GeneralPadding / 4,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#DEDEDE",
        marginBottom: 6,
        borderRadius: 6
    },
    itemText: {
        fontFamily: "Exo2.0-Medium",
        color: "#272727",
        fontSize: Normalize(13)
    },
});
export default ComponentsDemonstrator;