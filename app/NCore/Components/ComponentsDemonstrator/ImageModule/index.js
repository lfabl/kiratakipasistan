import React, {
    useEffect,
    useState
} from "react";
import {
    PermissionsAndroid,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Dimensions,
    View
} from "react-native";
import ImageCropPicker from 'react-native-image-crop-picker';
import TouchableHighlight from "../../TouchableHighlight";
import Icon from "react-native-vector-icons/FontAwesome5";
import Lightbox from 'react-native-lightbox';
import Modal from "../../Modal";
import {
    ReactNativeFile
} from 'apollo-upload-client';

const ImageModule = ({ images, setImages, disabled }) => {
    const [existImages, setExistImages] = useState(typeof images !== "undefined" ? images : []);
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
    const [lightBoxOpen, setLightBoxOpen] = useState(false);
    useEffect(() => {
        setImages(existImages)
    }, [existImages])
    useEffect(() => {
        PermissionsAndroid.requestMultiple([
            'android.permission.CAMERA',
            'android.permission.WRITE_EXTERNAL_STORAGE'
        ])
    });
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    const handleRemoveItem = index => {
        // assigning the list to temp variable
        const temp = [...existImages];

        // removing the element using splice
        temp.splice(index, 1);

        // updating the list
        setExistImages(temp);
    }
    const renderer = () => {
        return existImages.map((item, index) => {
            return <View style={{
                flexDirection: "column",
                alignItems: "flex-end"
            }}
                key={index}
            >
                {
                    <Lightbox
                        didOpen={() => setLightBoxOpen(true)}
                        onOpen={() => setLightBoxOpen(true)}
                        willClose={() => setLightBoxOpen(false)}
                        swipeToDismiss={true}
                        renderHeader={() => {

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
                        <ImageBackground
                            source={typeof item.newImage !== "undefined" ? { uri: item.newImage.uri } : { uri: "data:image/" + item.image.substr(item.image.lastIndexOf('.') + 1) + `;base64,${item.imageBase64}` }}
                            style={{
                                width: 60,
                                height: 60,
                                marginRight: 10,
                                alignSelf: "flex-end",
                                marginTop: 10
                            }}
                            imageStyle={{
                                borderRadius: 5
                            }}
                        >
                            {
                                lightBoxOpen === false && disabled === true ? <TouchableOpacity
                                    onPress={() => handleRemoveItem(index)}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        top: -6,
                                        left: 6,
                                        alignSelf: "flex-end",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <View style={{
                                        backgroundColor: "#192430",
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                        alignSelf: "flex-end",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Icon
                                            name={"times"}
                                            size={14}
                                            color={"red"}
                                            style={{
                                                zIndex: 2,
                                            }}
                                        >

                                        </Icon>
                                    </View>
                                </TouchableOpacity> : null
                            }
                        </ImageBackground>
                    </Lightbox>
                }
            </View>
        })
    }
    return <View style={{ width: "100%", flexDirection: "column" }}>
        <Modal
            modalVisible={descriptionModalVisible}
            setModelVisible={(val) => setDescriptionModalVisible(val)}
            modelText={"Yeni demirbaş fotoğrafı ekleme sınırına ulaştınız."}
        >
        </Modal>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", }}>
            {
                disabled === true ? <TouchableHighlight
                    text={"Yeni Fotoğraf"}
                    textStyle={{
                        fontSize: 12
                    }}
                    style={{
                        padding: 6,
                        paddingHorizontal: 12
                    }}
                    onPress={() => {
                        if (existImages.length < 5) {
                            ImageCropPicker.openPicker({
                                multiple: true,
                                maxFiles: (5 - existImages.length) > 0
                            }).then((response) => {
                                if (response.didCancel === true) {
                                }
                                else {
                                    let _existImages = JSON.parse(JSON.stringify(existImages));
                                    response.forEach(m => {
                                        if(5 - _existImages.length > 0) {
                                            const pathArray = m.path.toString().split("/");
                                            const name = pathArray[pathArray.length-1];
                                            const file = new ReactNativeFile({
                                                uri: m.path,
                                                name: name,
                                                type: m.mime
                                            });
                                            _existImages.push({
                                                newImage: file
                                            });
                                        }
                                    });
                                    setExistImages(_existImages);
                                    console.warn(response);
                                }
                            });
                        }
                        else {
                            setDescriptionModalVisible(true)
                        }
                    }}
                /> : null
            }
        </View>
        {
            existImages.length !== 0 ? <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{
                    marginTop: 10
                }}
            >
                {
                    renderer()
                }
            </ScrollView> : null
        }
    </View>
}

export default ImageModule;