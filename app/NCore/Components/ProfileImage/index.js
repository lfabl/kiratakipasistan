import React, { useState } from "react";
import {
    ImageBackground,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions
} from "react-native";

import Text from "../Text";

import Normalize from "../Normalize"
import {
    Shadow
} from "../../index"
//Font Awsome Icon
import Icon from 'react-native-vector-icons/FontAwesome5';
import Lightbox from 'react-native-lightbox';


const ProfileImage = ({ src, style, size, editMode, editOnPress }) => {
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;

    const [lightBoxOpen, setLightBoxOpen] = useState(false)
    return (

        <Lightbox
            didOpen={() => setLightBoxOpen(true)}
            onOpen={() => src && src !== "" ? setLightBoxOpen(true) : false}
            willClose={() => setLightBoxOpen(false)}
            swipeToDismiss={true}
            renderHeader={() => {

            }}
            underlayColor={"rgba(0,0,0,0)"}
            springConfig={{tension: 900000, friction: 900000}}

            activeProps={
                {
                    style: {
                        width: lightBoxOpen === false ? Normalize(size) : width,
                        height: lightBoxOpen === false ? Normalize(size) : height,
                        backgroundColor: lightBoxOpen === false ? "rgba(0,0,0,0 ) " : "white",
                        alignItems: "center",
                        justifyContent: "center"
                    },
                    resizeMode: lightBoxOpen === true ? 'contain' : "cover",
                }
            }
        >
            <ImageBackground
                source={src && src !== "" ? { uri: src } : null}
                style={[
                    Shadow,
                    {
                        width: lightBoxOpen === false ? Normalize(size) : width,
                        height: lightBoxOpen === false ? Normalize(size) : 200,
                        backgroundColor: "white",
                        borderRadius: lightBoxOpen === false ? Normalize(size / 1.95) : 0,
                        alignItems: "center",
                        justifyContent: "center"
                    },
                    style
                ]}
                imageStyle={{
                    borderRadius: lightBoxOpen === false ? Normalize(size / 2) : 0,
                    borderWidth: lightBoxOpen === false ? Normalize(5.5) : 0,
                    borderColor: lightBoxOpen === false ? "white" : "rgba(0,0,0,0)"
                }}
            >
                {
                    editMode ?
                        <TouchableOpacity
                            style={{
                                width: Normalize(size),
                                height: Normalize(size),
                                borderRadius: Normalize(size / 2),
                                borderWidth: Normalize(5.5),
                                borderColor: "white",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                zIndex: 3
                            }}
                            onPress={() => editOnPress()}
                        >
                            <Icon
                                name={"edit"}
                                color={"white"}
                                size={Normalize(20)}
                                style={{
                                    marginBottom: 4,
                                    position: "relative",
                                    zIndex: 3
                                }}
                            >
                            </Icon>
                            <Text style={{
                                color: "white",
                                fontSize: Normalize(12)
                            }}>
                                Değiştir
                        </Text>
                        </TouchableOpacity> : null

                }
                {
                    src && src !== "" ? null :
                        <View style={{
                            position: "absolute",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: Normalize(size),
                            height: Normalize(size),
                            zIndex: 1
                        }}>
                            <Icon
                                name={"user-circle"}
                                size={Normalize(size / 2)}
                                style={
                                    {
                                        color: "#192430",
                                        zIndex: 4
                                    }
                                }
                            />
                        </View>
                }

            </ImageBackground>
        </Lightbox>

    )
};

export default ProfileImage;