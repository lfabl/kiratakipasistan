import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
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

const ComponentsDemonstrator = ({ style, title, items, setItems, disabled }) => {
    /* Modals Controller States */
    const [titleModalType, setTitleModalType] = useState(0); /* 0 = "new"  1 = "edit" */
    const [titleModalVisible, setTitleModalVisible] = useState(false);
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

    /* Item Controller States */
    const [itemName, setItemName] = useState("");
    const [itemNameErrMessage, setItemNameErrMessage] = useState("");
    const [editIndex, setEditIndex] = useState(0);
    const [editImages, setEditImages] = useState([]);

    const onAddItem = (name) => {
        let newItems = items;
        newItems.push({ name: name.itemName, images: name.images })
        setItems(newItems)

    }

    const onEditItem = (data) => {
        const newItems = [];
        items.map((item, index) => {
            index === data.index ?
                newItems.push({ name: data.itemName, images: data.images })
                : newItems.push(item)
        })
        setItems(newItems)
    }

    const onDeleteItem = (indexOnDelete) => {
        const newItems = items.filter((item, index) => index !== indexOnDelete);
        setItems(newItems)
    }


    return (
        <View style={[styles.container, style]}>

            {/* Add Choice Modal */}
            <ChoiceModal
                modalVisible={titleModalVisible}
                setModalVisible={setTitleModalVisible}
                title={title}
                onCanelPress={() => {
                    //Modal kapatıldığında değişkenleri sıfırlılyırouz
                    setItemName("");
                    setTitleModalVisible(false);
                    setItemNameErrMessage("");
                }}
                onSubmitPress={() => {
                    if (itemName !== "") {
                        if (titleModalType === 0) {
                            //Onaylama işlemi yapıldığında önce değişiklikleri yapıp ardından değişkenleri sıfırlıyoruz
                            onAddItem({
                                itemName: itemName,
                                images: []
                            });
                            setItemName("");
                        }
                        else {
                            onEditItem({
                                index: editIndex,
                                itemName: itemName,
                                images: JSON.parse(JSON.stringify(editImages)),
                            });
                        }
                        setTitleModalVisible(false);
                    }
                    else {
                        setItemNameErrMessage("Lütfen " + title + " başlığını giriniz")
                    }

                }}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder={"Yeni " + title}
                        value={itemName}
                        editable={true}
                        onChangeText={(text) => {
                            setItemNameErrMessage("");
                            setItemName(text);
                        }}
                        containerStyle={{
                            marginBottom: 6
                        }}

                    />
                    {/* Error Message */}
                    {
                        itemNameErrMessage !== "" ? <Text style={styles.itemErrMessage}>
                            {itemNameErrMessage}
                        </Text> : null
                    }
                </View>
            </ChoiceModal>



            {/* Description Modal */}
            <Modal
                modalVisible={descriptionModalVisible}
                setModelVisible={(val) => setDescriptionModalVisible(val)}
                modelText={"Yeni demirbaş ekleme sınırına ulaştınız."}
            />

            {/* Main Container */}
            <View style={styles.header}>

                {/* Title */}
                <Text style={styles.title}>
                    {title}
                </Text>

                {/* New Item Button */}
                {
                    disabled ? <TouchableOpacity
                        onPress={() => {
                            /* Yeni bir item eklenmek istendiğinde ilk başta gerekli yerleri sıfırlayıp, gerekli kontrolleri sağlayıp, oluşturma işlemini tetikliyoruz */
                            console.log(items)
                            setItemName("");
                            setEditImages([]);
                            setEditIndex(0);
                            if (items.length < 8) {
                                setTitleModalVisible(true);
                                setTitleModalType(0);
                            }
                            else {
                                setDescriptionModalVisible(true);
                            }
                        }}
                    >
                        <Icon
                            name={"plus-circle"}
                            color={"#66ff00"}
                            size={Normalize(16)}
                            style={styles.newChoicePlusIcon}
                        >
                        </Icon>
                    </TouchableOpacity> : null
                }
            </View>

            {/* Render Items */}
            <ScrollView>
                {
                    items && items.length > 0 ?
                        items.map((item, index) => {
                            return <TouchableOpacity
                                key={index}
                                disabled={!disabled}
                                onPress={!disabled ? null : () => {
                                    /* Bir itemın detaylarına girmek istediğimizde kullandığımız işlemler */
                                    if (disabled) {
                                        setTitleModalVisible(true);
                                    } else {
                                        setTitleModalVisible(false)
                                    }
                                    setItemName(item.name);
                                    setEditIndex(index);
                                    setTitleModalType(1);
                                }}
                            >
                                {/* Item Container */}
                                <View style={styles.item}>
                                    {/* Title Container */}
                                    <View style={styles.itemTextContainer}>
                                        {/* Item Title */}
                                        <Text style={[styles.itemText, {
                                            flex: 1,
                                            marginRight: 5
                                        }]}>
                                            {
                                                item.name
                                            }
                                        </Text>
                                        {/* Item Title */}
                                        <Text style={styles.itemText}>
                                            {
                                                item.images.length
                                            }/8
                                        </Text>
                                    </View>

                                    {/* Render Images */}
                                    <ImageModule
                                        images={item.images}
                                        disabled={disabled}
                                        setImages={(newVal) => {
                                            setEditImages(newVal);
                                            onEditItem({
                                                index: index,
                                                itemName: item.name,
                                                images: newVal,
                                            });
                                        }}
                                    />

                                    {/* Delete Item Container */}
                                    {
                                        disabled ? <View style={styles.deleteItemContainer}>
                                            <TouchableOpacity
                                                onPress={() => onDeleteItem(index)}
                                                style={styles.deleteItemPressableSite}
                                            >

                                                <Icon
                                                    name={"trash"}
                                                    color={"#D00000"}
                                                    size={Normalize(14)}
                                                >
                                                </Icon>

                                            </TouchableOpacity>
                                        </View> : null
                                    }
                                </View>
                            </TouchableOpacity>
                        })
                        : <Text style={styles.nullText}> Hiç demirbaş eklenmedi.</Text>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        borderWidth: 4,
        borderColor: "white",
        elevation: 6,
        padding: 2,
        borderRadius: 6,
        backgroundColor: "white"
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
        backgroundColor: "white"
    },
    title: {
        fontFamily: "Exo2.0-Black",
        color: "#CACACA",
        fontSize: Normalize(13)
    },
    newChoicePlusIcon: {
        alignSelf: "flex-end",
        marginHorizontal: Normalize(4)
    },
    item: {
        padding: GeneralPadding / 4,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#DEDEDE",
        padding: 10,
        borderRadius: 6,
        marginBottom: 8
    },
    itemTextContainer: {
        width: "100%",
        flexDirection: "row"
    },
    itemText: {
        fontFamily: "Exo2.0-Medium",
        color: "#272727",
        fontSize: Normalize(13)
    },
    deleteItemContainer: {
        width: "100%",
        alignItems: "flex-end"
    },
    deleteItemPressableSite: {
        paddingLeft: 10,
        paddingTop: 10
    },
    nullText: {
        color: "rgb(135, 135, 135)"
    },
    itemErrMessage: {
        width: "100%",
        fontSize: 11,
        color: "red",
        fontFamily: "Exo2.0-Light"
    }
});
export default ComponentsDemonstrator;