import React from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";

//Icon component
import Icon from 'react-native-vector-icons/FontAwesome5';

//NCore Components
import Text from "../../Components/Text";

//NCore Theme
import {
    GeneralPadding,
    SuccessfulColor,
    UnsuccessfulColor
} from "../../index";
import Normalize from "../Normalize";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import { serverAdres } from "../../../Server/config";

const TenantCard = ({ profileImageUrl, name, phoneNumber, activeApartment, surety, suretyPhoneNumber, style, onPress, onLongPress, onContractPress }) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={() => onPress()}
            onLongPress={() => onLongPress()}
            activeOpacity={0.6}
        >
            {
                profileImageUrl && profileImageUrl !== "" ?
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: serverAdres + "/profileImages/" + profileImageUrl }}
                            style={styles.profileImage}
                        ></Image>
                    </View> :
                    <View style={styles.profileImageContainer}>
                        <Icon
                            name={"user-circle"}
                            size={Normalize(60)}
                            style={
                                {
                                    padding: GeneralPadding / 4,
                                    color: "#272727"
                                }
                            }
                        />
                    </View>
            }
            <View style={styles.descriptionContainer}>
                {/* Name */}
                <View style={styles.descripitonSubContainer}>
                    {
                        name && name !== "" ? <Text style={styles.thereIsNameText}>{name}</Text> :
                            <Text style={styles.thereIsNoNameText}>Yok</Text>
                    }
                </View>

                {/* Phone Number */}
                <View style={styles.descripitonSubContainer}>
                    <Text style={styles.thereIsDefault}>
                        Telefon Numarası : {
                            phoneNumber && phoneNumber !== "" ?
                                <Text style={styles.phoneNumberDefault}>
                                    {phoneNumber}
                            </Text> :
                                <Text style={styles.thereIsNoDefault}>Yok</Text>
                        }
                    </Text>
                </View>

                {/* Active Real Estate */}
                <View style={styles.descripitonSubContainer}>
                    <Text style={styles.thereIsDefault}>
                        Aktif Daire : {
                            activeApartment && activeApartment !== "" ?
                                <Text style={[styles.contentDefault, { color: SuccessfulColor }]}>
                                    {activeApartment}
                                </Text> :
                                <Text style={[styles.thereIsNoDefault, { color: UnsuccessfulColor }]}>Yok</Text>
                        }
                    </Text>
                </View>

                {/* Surety */}
                <View style={styles.descripitonSubContainer}>
                    <Text style={styles.thereIsDefault}>
                        Kefil : {
                            surety && surety !== "" ?
                                <Text style={[styles.contentDefault, { color: SuccessfulColor }]}>
                                    {surety}
                                </Text> :
                                <Text style={[styles.thereIsNoDefault, { color: UnsuccessfulColor }]}>Yok</Text>
                        }
                    </Text>
                </View>

                {/* Surety  Phone Number*/}
                <View style={styles.descripitonSubContainer}>
                    <Text style={styles.thereIsDefault}>
                        Kefil Telefon : {
                            suretyPhoneNumber && suretyPhoneNumber !== "" ?
                                <Text style={styles.phoneNumberDefault}>
                                    {suretyPhoneNumber}
                                </Text> :
                                <Text style={styles.thereIsNoDefault}>Yok</Text>
                        }
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => onContractPress(
                    activeApartment !== "" ? true : false
                )}
                style={{
                    width: 30,
                    height: "100%",
                }}
            >
                <View style={{
                    width: 30,
                    height: 30,
                    backgroundColor: activeApartment !== "" ? "#192430" : "white",
                    borderBottomLeftRadius: 10,
                    alignItems: "center",
                    justifyContent: 'center',
                    borderTopRightRadius: 10
                }}>
                    <FontAwesomeIcon
                        name={activeApartment !== "" ? "chain-broken" : "chain"}
                        color={activeApartment !== "" ? "white" : "#192430"}
                        size={activeApartment !== "" ? 16 : 18}
                    />
                </View>
            </TouchableOpacity>
        </TouchableOpacity >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: "#F4F4F4",
        marginVertical: 4,
        marginHorizontal: 4,
        marginBottom: 10
    },
    //Image Container
    profileImageContainer: {
        padding: GeneralPadding / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    profileImage: {
        borderRadius: 10,
        width: 75,
        height: 75,
        resizeMode: "stretch"
    },
    //Description Container
    descriptionContainer: {
        flex: 1,
        padding: GeneralPadding / 2,
        flexDirection: "column",
        flexWrap: "wrap",
    },
    descripitonSubContainer: {
        width: "100%",
    },
    //Name
    thereIsNameText: {
        fontFamily: "Exo2.0-ExtraBold",
        color: "#272727",

    },
    thereIsNoNameText: {
        fontFamily: "Exo2.0-ExtraBold",
        color: "orange",

    },
    //Phone Number
    thereIsDefault: {
        fontSize: 11,
        fontFamily: "Exo2.0-Bold",
        color: "#272727",

    },
    thereIsNoDefault: {
        fontFamily: "Exo2.0-Regular",
        color: UnsuccessfulColor,
        fontWeight: "900"

    },
    //Phone Number Default
    phoneNumberDefault: {
        fontFamily: "Exo2.0-Regular",
        color: "blue",
        textDecorationLine: "underline",

    },
    // Content Default
    contentDefault: {
        fontFamily: "Exo2.0-Regular",
        color: "#272727",
        fontWeight: "900"
    },

});
export default TenantCard;