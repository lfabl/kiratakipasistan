import React ,{useState}from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import Modal from "react-native-modal";

const ImagePicker = ({ visible, setVisible ,onModalHide, onPressDelete}) => {
    const [modalHideProps,setModalHideProps] =  useState("")
    return <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        onModalHide={()=> onModalHide(modalHideProps)}
    >
        <View style={styles.container}>
            {/* Title */}
            <TouchableOpacity style={styles.itemContainer} >
                <Text style={styles.title}>
                    Fotoğraf Seçin
                </Text>
            </TouchableOpacity>

            {/* Phone Camera */}
            <TouchableOpacity style={styles.itemContainer} onPress={() => {
                setVisible(false);
                setModalHideProps("phoneCamera")
            }}>
                <Text style={styles.subTitle}>
                    Telefon Kamerası
                </Text>
            </TouchableOpacity>


            {/* Galery */}
            <TouchableOpacity style={styles.itemContainer} onPress={() => {
                setVisible(false);
                setModalHideProps("gallery")
            }}>
                <Text style={styles.subTitle}>
                    Kütüphaneden Seçin
                </Text>
            </TouchableOpacity>

            {
                onPressDelete ? < TouchableOpacity style={styles.itemContainer} onPress={() => onPressDelete()}>
                    <Text style={styles.subTitle}>
                        Fotoğrafı Kaldır
                    </Text>
                </TouchableOpacity> : null
            }

            <View style={styles.canelContainer}>
                <TouchableOpacity
                    style={styles.canel}
                    onPress={() => setVisible(false)}
                >
                    <Text style={styles.canelTitle}>
                        İptal
                    </Text>
                </TouchableOpacity>

            </View>
        </View>

    </Modal >
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "white",
        justifyContent: "space-between",
        padding: 20
    },
    itemContainer: {
        width: "100%",
        paddingVertical: 5,
        marginVertical: 10,
    },
    title: {
        fontFamily: "Exo2.0-Bold",
        fontSize: 20,
        color: "#000000"
    },
    subTitle: {
        fontFamily: "Exo2.0-Regular",
        fontSize: 18,
        color: "#000000"
    },
    canelContainer: {
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    canel: {
        padding: 10,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    canelTitle: {
        fontFamily: "Exo2.0-Regular",
        fontSize: 16,
        color: "#2ec4b6"
    }
});

export default ImagePicker;