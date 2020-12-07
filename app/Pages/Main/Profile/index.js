import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Alert,
    ScrollView,
    LayoutAnimation,
    UIManager,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import Toast from "react-native-simple-toast";
import md5 from "md5";

//Server Graphql
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import { getProfile } from "../../../Server/graphql/Queries/getProfile";
import { updateProfile } from "../../../Server/graphql/Mutation/updateProfile";
import { updateProfileImage } from "../../../Server/graphql/Mutation/updateProfileImage";
import { ReactNativeFile } from 'apollo-upload-client';
import { serverAdres } from "../../../Server/config";
import {
    ImageCropPicker
} from 'react-native-image-crop-picker'

//Font Awsome Icon
import Icon from 'react-native-vector-icons/FontAwesome5';

//NCore Theme
import {
    Shadow,
    GeneralPadding,
    BetweenObjectsMargin,
} from "../../../NCore";

//NCore Components
import DescriptionCard from "../../../NCore/Components/DescriptionCard";
import Text from "../../../NCore/Components/Text";
import Normalize from "../../../NCore/Components/Normalize";
import ProfileImage from "../../../NCore/Components/ProfileImage";
import TextInput from "../../../NCore/Components/TextInput";

//NCore Tools
import { typeValidMessageConverter } from "../../../NCore/Tools/typeValidMessageConverter";
import { isoStringToDate } from "../../../NCore/Tools/isoStringToDate"
import AsyncStorage from "@react-native-community/async-storage";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileEditMode: false,
            saveStatus: false,
            userName: "",
            fullName: "",
            mail: "",
            profileImageName: "",
            registerDate: "",
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: "",
            profileImage: null,
            deleteProfileImage: false,
            preview: false
        };
        this.changeEditMode = this.changeEditMode.bind(this);
    }
    componentDidMount() {
        this.props.navigation.setParams({
            pageName: "Profil"
        })
    }
    changeEditMode() {
        const { profileEditMode } = this.state;
        UIManager.setLayoutAnimationEnabledExperimental(true)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.props.navigation.setParams(profileEditMode ? { pageName: "Profil", } : { pageName: "Profil Düzenle" })
        this.setState({
            profileEditMode: !profileEditMode,
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: ""
        })
    }
    async toastMessage({ data }) {
        const message = await data.updateProfile.message;
        const title = "Kiracı";
        const errorMessage = await typeValidMessageConverter({ message, title });
        return Toast.show(errorMessage, Toast.LONG, [
            'UIAlertController',
        ]);
    }

    render() {
        const ProfileImageSize = 100;
        const { profileEditMode } = this.state;
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        return <Mutation mutation={updateProfileImage}>
            {
                (updateProfileImageFunc, { loading, error, data }) => {
                    if (loading) {
                        return (
                            <ActivityIndicator size="large" style={{ flex: 1 }} color={"#1A2430"} />
                        )
                    }
                    else if (error) {
                        return (
                            <View>
                                {
                                    alert("Bir hata oluştu" + error)
                                }
                            </View>
                        )
                    }
                    else {
                        if (data) {
                            if (this.state.saveStatus === false) {
                                if (data.updateProfileImage.code === 200) {
                                    Toast.show(data.updateProfileImage.message, Toast.LONG, [
                                        'UIAlertController',
                                    ]);
                                }
                                else {
                                    if (data.updateProfileImage.code === 500) {
                                        Toast.show(data.updateProfileImage.message, Toast.LONG, [
                                            'UIAlertController',
                                        ]);
                                    }
                                    else {
                                        this.toastMessage({ data });
                                    }
                                }
                                this.setState({
                                    saveStatus: true
                                })
                            }
                        }
                        return <Mutation mutation={updateProfile}>
                            {
                                (updateProfileData, { loading, error, data }) => {
                                    if (loading) {
                                        return (
                                            <ActivityIndicator size="large" style={{ flex: 1 }} color={"#1A2430"} />
                                        )
                                    }
                                    else if (error) {
                                        return (
                                            <View>
                                                {
                                                    alert("Bir hata oluştu" + error)
                                                }
                                            </View>
                                        )
                                    }
                                    else {
                                        if (data) {
                                            if (this.state.saveStatus === false) {
                                                if (data.updateProfile.code === 200) {
                                                    Toast.show(data.updateProfile.message, Toast.LONG, [
                                                        'UIAlertController',
                                                    ]);
                                                    this.changeEditMode()
                                                }
                                                else {
                                                    if (data.updateProfile.code === 500) {
                                                        Toast.show(data.updateProfile.message, Toast.LONG, [
                                                            'UIAlertController',
                                                        ]);
                                                    }
                                                    else {
                                                        this.toastMessage({ data });
                                                    }
                                                }
                                                this.setState({
                                                    saveStatus: true
                                                })
                                            }
                                        }
                                        return <Query
                                            query={getProfile}
                                            fetchPolicy="cache-and-network"
                                            onCompleted={async (data) => {
                                                if (data.getProfile.response.code === 200) {
                                                    const getUserData = data.getProfile.data
                                                    const registerDate = await isoStringToDate(getUserData.registerDate, "date")
                                                    this.setState({
                                                        fullName: getUserData.fullName,
                                                        userName: getUserData.userName,
                                                        mail: getUserData.mail,
                                                        registerDate: registerDate,
                                                        profileImageName: getUserData.profileImageName,
                                                        profileImage: null
                                                    })
                                                }
                                            }}
                                        >
                                            {
                                                ({ loading, error, data }) => {
                                                    if (loading) {
                                                        return (
                                                            <ActivityIndicator size="large" style={{ flex: 1 }} color={"#1A2430"} />
                                                        )
                                                    }
                                                    else if (error) {
                                                        return (
                                                            <View>
                                                                {
                                                                    alert("Bir hata oluştu" + error)
                                                                }
                                                            </View>
                                                        )
                                                    }
                                                    else {
                                                        if (data.getProfile.response.code === 200) {
                                                            return <View style={{ flex: 1, marginTop: GeneralPadding }}>

                                                                <ScrollView
                                                                    style={styles.container}
                                                                    showsVerticalScrollIndicator={false}
                                                                >
                                                                    <View style={[Shadow, styles.profileContainer]}>
                                                                        <View style={[styles.headerContainer, Shadow]}>

                                                                            <ProfileImage
                                                                                src={
                                                                                    this.state.profileImage !== null ? this.state.profileImageName :
                                                                                        this.state.profileImageName !== "" ? serverAdres + "/profileImages/" + this.state.profileImageName : this.state.profileImageName
                                                                                }
                                                                                style={Shadow, { flex: 1, }}
                                                                                size={ProfileImageSize}
                                                                                editMode={this.state.profileEditMode}

                                                                                editOnPress={async () => {
                                                                                    ImageCropPicker.openPicker({
                                                                                        noData: true,
                                                                                        mediaType: "photo",
                                                                                        title: "Fotoğraf Seçin",
                                                                                        cancelButtonTitle: "İptal",
                                                                                        takePhotoButtonTitle: "Telefon kamerası",
                                                                                        chooseFromLibraryButtonTitle: "Kütüphaneden seçin",
                                                                                        customButtons: [{ name: 'fb', title: 'Profil resmini kaldırın' }],
                                                                                        quality: 0.5
                                                                                    }, async (response) => {
                                                                                        if (response.didCancel === true) {
                                                                                        }
                                                                                        else {
                                                                                            this.setState({
                                                                                                saveStatus: false
                                                                                            })
                                                                                            if (response.customButton) {
                                                                                                this.setState({
                                                                                                    deleteProfileImage: true,
                                                                                                    profileImageName: "",
                                                                                                    profileImage: null
                                                                                                }, async () => {
                                                                                                    await updateProfileImageFunc({
                                                                                                        variables: {
                                                                                                            deleteProfileImage: true,
                                                                                                            profileImageName: "",
                                                                                                        }
                                                                                                    })
                                                                                                })
                                                                                            } else {
                                                                                                let variables = {}
                                                                                                this.setState({
                                                                                                    deleteProfileImage: false,
                                                                                                    profileImageName: response.uri,
                                                                                                    profileImage: response
                                                                                                }, async () => {
                                                                                                    const file = await new ReactNativeFile({
                                                                                                        uri: this.state.profileImage.uri,
                                                                                                        name: this.state.profileImage.fileName,
                                                                                                        type: this.state.profileImage.type,
                                                                                                    });
                                                                                                    variables.profileImage = await file
                                                                                                    await updateProfileImageFunc({
                                                                                                        variables: variables
                                                                                                    })

                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    });

                                                                                }}
                                                                            />

                                                                            <View
                                                                                style={[
                                                                                    styles.headerControler,
                                                                                    {
                                                                                        position: "absolute",
                                                                                        top: ProfileImageSize / 2
                                                                                    }
                                                                                ]}
                                                                            >
                                                                                <TouchableOpacity
                                                                                    onPress={() => this.changeEditMode()}
                                                                                >
                                                                                    <Icon
                                                                                        name={
                                                                                            profileEditMode ? "times" : "edit"
                                                                                        }
                                                                                        color={"#272727"}
                                                                                        size={Normalize(20)}
                                                                                        style={{
                                                                                            alignSelf: "flex-start",
                                                                                            padding: Normalize(10),
                                                                                            paddingBottom: 20,
                                                                                            paddingLeft: 20
                                                                                        }}
                                                                                    >
                                                                                    </Icon>
                                                                                </TouchableOpacity>
                                                                                {
                                                                                    !profileEditMode ? null : <TouchableOpacity
                                                                                        onPress={async () => {
                                                                                            const { oldPassword, newPassword, newPasswordAgain } = this.state;

                                                                                            if (newPassword !== "" || newPasswordAgain !== "") {
                                                                                                if (oldPassword !== "") {
                                                                                                    variables.oldPassword = md5(oldPassword);
                                                                                                    if (newPassword !== "") {
                                                                                                        if (newPassword !== newPasswordAgain) {
                                                                                                            Toast.show("Yeni Şifreler Uyuşmuyor", Toast.LONG, [
                                                                                                                'UIAlertController',
                                                                                                            ]);
                                                                                                        }
                                                                                                        else {
                                                                                                            variables.newPassword = md5(newPassword)
                                                                                                            this.setState({
                                                                                                                saveStatus: false
                                                                                                            })
                                                                                                            await updateProfileData({
                                                                                                                variables: variables,
                                                                                                            })
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    Toast.show("Lütfen Şifrenizi giriniz.", Toast.LONG, [
                                                                                                        'UIAlertController',
                                                                                                    ]);
                                                                                                }

                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <Icon
                                                                                            name={"save"}
                                                                                            color={"#272727"}
                                                                                            size={Normalize(20)}
                                                                                            style={{
                                                                                                alignSelf: "flex-start",
                                                                                                padding: Normalize(10),
                                                                                                paddingBottom: 20,
                                                                                                paddingRight: 20
                                                                                            }}

                                                                                        />
                                                                                    </TouchableOpacity>
                                                                                }
                                                                            </View>
                                                                        </View>

                                                                        <DescriptionCard style={[Shadow, { marginTop: ProfileImageSize / 2, zIndex: -1 }]}>

                                                                            <View style={[styles.profileContentDescriptionCard, {
                                                                                marginTop: (BetweenObjectsMargin * ((ProfileImageSize / 2) / BetweenObjectsMargin)) * 1.5
                                                                            }]}>
                                                                                <Text style={[styles.profileConentTextDescriptionCard, {
                                                                                    borderBottomColor: profileEditMode ? "#F1F1F1" : "#DEDEDE",

                                                                                }]}>
                                                                                    {this.state.fullName}
                                                                                </Text>
                                                                                <Text style={[styles.profileConentTextDescriptionCard, {
                                                                                    fontSize: Normalize(16),
                                                                                    borderBottomColor: profileEditMode ? "#F1F1F1" : "#DEDEDE",
                                                                                }]}>
                                                                                    {"@" + this.state.userName}
                                                                                </Text>
                                                                            </View>
                                                                            {
                                                                                profileEditMode ? <View style={styles.editContainer}>
                                                                                    <TextInput
                                                                                        placeholder={this.state.mail}
                                                                                        style={{ flex: 1 }}
                                                                                        editable={false}
                                                                                        editableEffect={true}
                                                                                    ></TextInput>
                                                                                    <TextInput
                                                                                        placeholder={"Eski Şifre"}
                                                                                        value={this.state.oldPassword}
                                                                                        isPassword={true}
                                                                                        onChangeText={(val) => this.setState({ oldPassword: val })}
                                                                                        style={{ flex: 1 }}
                                                                                        validationTypes={[
                                                                                            {
                                                                                                isEmptyString: true
                                                                                            }
                                                                                        ]}
                                                                                    ></TextInput>
                                                                                    <TextInput
                                                                                        placeholder={"Yeni Şifre"}
                                                                                        isPassword={true}
                                                                                        value={this.state.newPassword}
                                                                                        onChangeText={(val) => this.setState({ newPassword: val })}
                                                                                        style={{ flex: 1 }}
                                                                                        validationTypes={[
                                                                                            {
                                                                                                isEmptyString: true
                                                                                            }
                                                                                        ]}
                                                                                    ></TextInput>
                                                                                    <TextInput
                                                                                        placeholder={"Yeni Şifre Tekrar"}
                                                                                        value={this.state.newPasswordAgain}
                                                                                        isPassword={true}
                                                                                        onChangeText={(val) => this.setState({ newPasswordAgain: val })}
                                                                                        style={{ flex: 1 }}
                                                                                        validationTypes={[
                                                                                            {
                                                                                                isEmptyString: true
                                                                                            }
                                                                                        ]}
                                                                                    ></TextInput>
                                                                                </View> : null
                                                                            }
                                                                        </DescriptionCard>

                                                                        <DescriptionCard style={[Shadow, styles.dateDescriptionCard, {
                                                                            marginTop: 20
                                                                        }]}>
                                                                            <Text style={styles.dateTitleDescriptionCard}>
                                                                                Kayıt Tarihi :
                                                            </Text>
                                                                            <Text style={styles.dateContentDescriptionCard}>
                                                                                {this.state.registerDate}
                                                                            </Text>
                                                                        </DescriptionCard>
                                                                    </View>
                                                                </ScrollView>
                                                            </View>
                                                        }
                                                    }
                                                }
                                            }
                                        </Query>
                                    }
                                }
                            }

                        </Mutation >
                    }
                }
            }
        </Mutation >
    }
}



const styles = StyleSheet.create({
    container: {
        paddingTop: GeneralPadding,
        paddingHorizontal: GeneralPadding,
        flex: 1,
        flexDirection: "column"
    },
    profileContainer: {
        flex: 1,
        flexDirection: "column",
        marginBottom: BetweenObjectsMargin,
        paddingHorizontal: 1
    },
    headerContainer: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        zIndex: 2,
    },
    headerControler: {
        width: "100%",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "baseline",
        position: "relative",
        padding: 2,

    },
    profileContentDescriptionCard: {
        marginBottom: BetweenObjectsMargin
    },
    profileConentTextDescriptionCard: {
        fontFamily: "Exo2.0-Medium",
        color: "#272727",
        fontSize: Normalize(22),
        textAlign: "center",
        borderBottomWidth: 1,
        marginBottom: 2,
    },
    dateDescriptionCard: {
        padding: GeneralPadding / 2,
        flexDirection: "row",
        marginBottom: BetweenObjectsMargin,

    },
    dateTitleDescriptionCard: {
        color: "#272727",
        fontFamily: "Exo2.0-Bold"
    },
    dateContentDescriptionCard: {
        color: "#272727",
        fontFamily: "Exo2.0-Medium"
    },
    editContainer: {
        marginBottom: BetweenObjectsMargin,
        padding: GeneralPadding / 2
    }
});
export default Profile;