import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Alert,
    ScrollView,
    LayoutAnimation,
    UIManager,
    Dimensions,
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
import ImageCropPicker from 'react-native-image-crop-picker';

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
import ImagePicker from "../../../NCore/Components/ImagePicker";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileEditMode: false,
            saveStatus: false,
            userName: "",
            fullName: "",
            mail: "",
            registerDate: "",
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: "",
            profileImageName: "",
            profileImage: null,
            deleteProfileImage: false,
            preview: false,
            modalVisible: false,
            tempDatas: {
                oldPassword: "",
                newPassword: "",
                newPasswordAgain: "",
                profileImageName: "",
                profileImage: null,
                deleteProfileImage: false,
            }
        };
        this.changeEditMode = this.changeEditMode.bind(this);
    }
    componentDidMount() {
        this.props.navigation.setParams({
            pageName: "Profil"
        })
    }

    changeEditMode(revertTempStatus) {
        const { profileEditMode } = this.state;
        UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

        /* Edit Mode Control */
        if (profileEditMode === true) {
            /* Datas */
            const newData = Object.assign({}, this.state);
            const tempData = Object.assign({}, this.state.tempDatas);
            /* Delete Another Key in new Data */
            ["profileEditMode", "saveStatus", "userName", "fullName", "mail", "registerDate", "tempDatas", "modalVisible", "preview"].forEach((val) => delete newData[val])

            if (JSON.stringify(newData) !== JSON.stringify(tempData) && revertTempStatus !== false) {
                Alert.alert(
                    'Düzenlemeden Çık',
                    'Düzenleme modundan çıkarsanız yaptığınız değişiklikler kayıt altına alınmayacaktır eminmisiniz?',
                    [
                        {
                            text: 'İptal Et',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'Tamam',
                            onPress: () => this.revertTempData()
                        }
                    ],
                    {
                        cancelable: true
                    }
                );
            }
            else {
                this.setState({
                    profileEditMode: !profileEditMode
                });
                this.props.navigation.setParams(profileEditMode ? { pageName: "Profil", } : { pageName: "Profil Düzenle" })

            }
        }
        else {
            this.setState({
                profileEditMode: !profileEditMode
            });
            this.props.navigation.setParams(profileEditMode ? { pageName: "Profil", } : { pageName: "Profil Düzenle" })

        }

    }
    revertTempData = () => {
        const { tempDatas, profileEditMode } = this.state;
        this.props.navigation.setParams(profileEditMode ? { pageName: "Profil", } : { pageName: "Profil Düzenle" })

        this.setState({
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: "",
            profileImageName: tempDatas.profileImageName,
            profileImage: tempDatas.profileImage,
            deleteProfileImage: false,
            profileEditMode: false
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
                                    this.setState({
                                        oldPassword: "",
                                        newPassword: "",
                                        newPasswordAgain: "",
                                    })
                                    this.changeEditMode(false)
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
                                    console.log("girdi")
                                    const getUserData = data.getProfile.data
                                    const registerDate = await isoStringToDate(getUserData.registerDate, "date")
                                    this.setState({
                                        fullName: getUserData.fullName,
                                        userName: getUserData.userName,
                                        mail: getUserData.mail,
                                        registerDate: registerDate,
                                        profileImageName: profileEditMode === false ? getUserData.profileImageName : this.state.profileImageName,
                                        profileImage: profileEditMode === false ? null : this.state.profileImage,
                                        deleteProfileImage: profileEditMode === false ? false: this.state.deleteProfileImage,
                                       
                                        tempDatas: {
                                            oldPassword: "",
                                            newPassword: "",
                                            newPasswordAgain: "",
                                            profileImageName: getUserData.profileImageName,
                                            profileImage: null,
                                            deleteProfileImage: false,
                                        }
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
                                                <ImagePicker
                                                    visible={this.state.modalVisible}
                                                    setVisible={(val) => {
                                                        this.setState({
                                                            modalVisible: val
                                                        })
                                                    }}
                                                    onPressPhoneCamera={() => {
                                                        this.setState({
                                                            modalVisible: false
                                                        })
                                                        ImageCropPicker.openCamera({}).then((response) => {
                                                            if (response.didCancel === true) {
                                                            }
                                                            else {
                                                                this.setState({
                                                                    deleteProfileImage: false,
                                                                    profileImageName: response.path,
                                                                    profileImage: response
                                                                });
                                                            }
                                                        });
                                                    }}
                                                    onPressGalery={() => {
                                                        this.setState({
                                                            modalVisible: false
                                                        })
                                                        ImageCropPicker.openPicker({
                                                            multiple: false,
                                                            maxFiles: 1
                                                        }).then((response) => {
                                                            if (response.didCancel === true) {
                                                            }
                                                            else {

                                                                this.setState({
                                                                    deleteProfileImage: false,
                                                                    profileImageName: response.path,
                                                                    profileImage: response
                                                                });
                                                            }
                                                        });

                                                    }}
                                                    onPressDelete={() => {
                                                        this.setState({
                                                            modalVisible: false
                                                        })
                                                        Alert.alert(
                                                            'Profil Resmini Sil',
                                                            'Profil resmini silmek istediğinize eminmisiniz?',
                                                            [
                                                                {
                                                                    text: 'İptal Et',
                                                                    onPress: () => console.log('Cancel Pressed'),
                                                                    style: 'cancel'
                                                                },
                                                                {
                                                                    text: 'Tamam',
                                                                    onPress: () => {
                                                                        this.setState({
                                                                            deleteProfileImage: true,
                                                                            profileImageName: "",
                                                                            profileImage: null
                                                                        })
                                                                    }
                                                                }
                                                            ],
                                                            {
                                                                cancelable: true
                                                            }
                                                        );

                                                    }}
                                                >

                                                </ImagePicker>

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
                                                                profileEditMode={this.state.profileEditMode}
                                                                onEditLongPress={() => {
                                                                }}
                                                                editOnPress={async () => {
                                                                    this.setState({
                                                                        modalVisible: true
                                                                    })
                                                                }}
                                                            />

                                                            <View
                                                                style={[
                                                                    styles.headerControler,
                                                                    {
                                                                        position: "absolute",
                                                                        top: ProfileImageSize / 2,
                                                                        paddingHorizontal: 10,
                                                                        paddingTop: 5
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
                                                                            paddingLeft: 30
                                                                        }}
                                                                    >
                                                                    </Icon>
                                                                </TouchableOpacity>
                                                                {
                                                                    !profileEditMode ? null : <TouchableOpacity
                                                                        onPress={async () => {
                                                                            const { oldPassword, newPassword, newPasswordAgain } = this.state;
                                                                            const variables = {};
                                                                            if (this.state.deleteProfileImage !== false) {
                                                                                variables.deleteProfileImage = true;
                                                                            }

                                                                            else if (this.state.profileImage !== null) {
                                                                                const pathArray = this.state.profileImage.path.toString().split("/");
                                                                                const name = pathArray[pathArray.length - 1];
                                                                                const file = new ReactNativeFile({
                                                                                    uri: this.state.profileImage.path,
                                                                                    name: name,
                                                                                    type: this.state.profileImage.mime,
                                                                                });
                                                                                variables.profileImage = file
                                                                            }

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
                                                                            else {
                                                                                await updateProfileData({
                                                                                    variables: variables,
                                                                                })
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
        width: Dimensions.get("window").width - 50,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "baseline",
        position: "relative",
        paddingLeft: 5,

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