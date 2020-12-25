import React, { useEffect, useState } from "react";
import {
    View,
    Alert,
    Dimensions,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    PermissionsAndroid,
    StyleSheet,
} from "react-native";

//Components
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from "react-native-vector-icons/FontAwesome5";
import Lightbox from 'react-native-lightbox';
import { ReactNativeFile } from 'apollo-upload-client';

//NCore
import TouchableHighlight from "../../TouchableHighlight";
import Modal from "../../Modal";
import ImagePicker from "../../ImagePicker";
import { launchCamera } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const ImageModule = ({ images, setImages, disabled }) => {
    /* Controller States */
    const [existImages, setExistImages] = useState(typeof images !== "undefined" ? images : []);
    const [modalVisible, setModalVisible] = useState(false);
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
    const [lightBoxOpen, setLightBoxOpen] = useState(false);


    /* LifeCycle Hooks */
    useEffect(() => {
        PermissionsAndroid.requestMultiple([
            'android.permission.CAMERA',
            'android.permission.WRITE_EXTERNAL_STORAGE'
        ])
    });

    useEffect(() => {
        setExistImages(images)
    }, [images])

    console.log(existImages)
    /* Functions */
    const handleRemoveItem = index => {
        // assigning the list to temp variable
        const temp = [...existImages];

        // removing the element using splice
        temp.splice(index, 1);

        // updating the list
        setImages(temp);
        setExistImages(temp);
    }

    const renderer = () => {
        return existImages.map((item, index) => {
            return <View style={styles.itemContainer}
                key={index}
            >
                {/* Item Image */}
                {
                    <Lightbox
                        didOpen={() => setLightBoxOpen(true)}
                        onOpen={() => setLightBoxOpen(true)}
                        willClose={() => setLightBoxOpen(false)}
                        swipeToDismiss={true}
                        renderHeader={() => null}
                        onLongPress={() => {
                            disabled ? Alert.alert(
                                'Resimi Sil',
                                'Resim silinsin mi?',
                                [
                                    {
                                        text: 'İptal Et',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Tamam',
                                        onPress: async () => {
                                            handleRemoveItem(index)
                                        }
                                    }
                                ],
                                {
                                    cancelable: true
                                }
                            ) : null

                        }}
                        underlayColor={"rgba(0,0,0,0)"}
                        springConfig={{ tension: 900000, friction: 900000 }}
                        activeProps={
                            {
                                style: {
                                    width: lightBoxOpen === false ? 60 : width,
                                    height: lightBoxOpen === false ? 60 : height,
                                    backgroundColor: lightBoxOpen === false ? "rgba(0,0,0,0 ) " : "white",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                resizeMode: lightBoxOpen === true ? 'contain' : "cover",
                            }
                        }
                    >

                        {/* Image */}
                        <ImageBackground
                            source={typeof item.newImage !== "undefined" ? { uri: item.newImage.uri } : { uri: "data:image/" + item.image.substr(item.image.lastIndexOf('.') + 1) + `;base64,${item.imageBase64}` }}
                            style={styles.itemImage}
                            imageStyle={styles.itemImageStyle}
                        >

                        </ImageBackground>
                    </Lightbox>
                }
            </View>
        })
    }

    return <View style={styles.container}>
        {/* Description Modal */}
        <Modal
            modalVisible={descriptionModalVisible}
            setModelVisible={(val) => setDescriptionModalVisible(val)}
            modelText={"Yeni demirbaş fotoğrafı ekleme sınırına ulaştınız."}
        />
        <ImagePicker
            visible={modalVisible}
            setVisible={(val) => {
                setModalVisible(val)

            }}
            onPressPhoneCamera={async () => {
                setModalVisible(false)
                launchCamera({
                    mediaType: "photo",
                    saveToPhotos: true,
                    storageOptions: {
                        skipBackup: true,
                        path: 'tmp_files'
                    },
                    includeBase64: true
                }, async (response) => {
                    if (response.didCancel === true) {
                    }
                    else {
                        console.log(response)
                        const base64 = response.base64;

                        const path = `${RNFetchBlob.fs.dirs.DCIMDir}/${response.fileName}`;
                        console.log(path)
                        try {
                            const data = await RNFetchBlob.fs.writeFile(path, base64, 'base64');
                            console.log(data, 'data');
                        } catch (error) {
                            console.log(error.message);
                        }

                        const newImages = existImages;

                        newImages.push({

                            newImage: new ReactNativeFile({
                                uri: "file:///" + path,
                                name: response.fileName,
                                type: response.type
                            })
                        });

                        setImages(newImages);
                        setExistImages(newImages);

                    }
                })
            }}
            onPressGalery={async () => {
                setModalVisible(false)

                ImageCropPicker.openPicker({
                    multiple: true,
                    maxFiles: (8 - existImages.length) > 0,
                    mediaType: "photo",
                }).then(async (response) => {
                    if (response.didCancel === true) {
                    }
                    else {
                        const _existImages = existImages;
                        for (let index = 0; index < response.length; index++) {
                            if (8 - _existImages.length > 0) {
                                const m = response[index];
                                const pathArray = m.path.toString().split("/");
                                const name = pathArray[pathArray.length - 1];
                                const file = new ReactNativeFile({
                                    uri: m.path,
                                    name: name,
                                    type: m.mime
                                });
                                _existImages.push({
                                    newImage: file
                                });
                            }

                            if (index + 1 === response.length) {
                                setImages(_existImages);
                                setExistImages(_existImages);
                            }
                        }
                      
                    }
                });

            }}
        >

        </ImagePicker>
        {/* Render Photos */}
        {
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.rendererScrollContainer}
            >
                {
                    renderer()
                }

                {/* New photo Button */}
                {
                    existImages.length < 8 && disabled ? <TouchableOpacity
                        style={styles.newPhotoButtonContainer}
                        onPress={() => {
                            if (existImages.length < 8) {
                                setModalVisible(true);

                            }
                            else {
                                setDescriptionModalVisible(true)
                            }
                        }}
                    >
                        <Icon
                            name={"plus"}
                            size={22}
                            color={"black"}
                        >

                        </Icon>
                    </TouchableOpacity> : null
                }
            </ScrollView>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column"
    },
    newPhotoContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    newPhotoButtonContainer: {
        width: 60,
        height: 60,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center"

    },
    newPhotoTitle: {
        fontSize: 12
    },
    rendererScrollContainer: {
        marginTop: 10
    },
    itemContainer: {
        flexDirection: "column",
        alignItems: "flex-end"
    },
    itemImage: {
        width: 60,
        height: 60,
        marginRight: 10,
        alignSelf: "flex-end",
        marginTop: 10
    },
    itemImageStyle: {
        borderRadius: 5
    },
    itemRemoveContainer: {
        width: 20,
        height: 20,
        top: -6,
        left: 6,
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
    },
    itemRemove: {
        backgroundColor: "#192430",
        width: 20,
        height: 20,
        borderRadius: 10,
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ImageModule;