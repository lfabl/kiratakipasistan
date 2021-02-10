import React from "react";
import {
    createMaterialTopTabNavigator,
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from "react-navigation";

//Loading 
import Loading from "../Pages/Loading";

//Loading 
import ManualRefetch from "../Pages/ManualRefecth";

// Auth Pages
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Signin from "../Pages/Auth/Signin";
import Signup from "../Pages/Auth/Signup";

//Main Pages
import RealEstatePortfolio from "../Pages/Main/RealEstatePortfolio";
import TenantPortfolio from "../Pages/Main/TenantPortfolio";
import PastEstatesScreen from '../Pages/Main/PastEstates';
import ApproachsScreen from '../Pages/Main/Approachs';
import Profile from "../Pages/Main/Profile";
import HomeScreen from "../Pages/Main/Home";

//Other 
import RealEstateInformation from "../Pages/MainDetails/RealEstateInformation";
import TentantInformation from "../Pages/MainDetails/TentantInformation";

//Create
import CreateNewRealEstate from "../Pages/MainCreatePages/CreateNewRealEstate";
import CreateNewTenant from "../Pages/MainCreatePages/CreateNewTenant";

//Header Types 
import RealestateNotificationSettingsScreen from '../Pages/Main/RealestateNotificationSettings';
import SwipeableTopTabBar from "./Components/SwipeableTopTabBar";
import AuthStackTopBar from "./Components/AuthStackNavigator";
import StackTopBar from "./Components/StackTopBar";

const MainStackTopTabNavigator = createMaterialTopTabNavigator(
    {
        Profile: Profile,
        TenantPortfolio: TenantPortfolio,
        RealEstatePortfolio: RealEstatePortfolio,
        Home: HomeScreen
    },
    {
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: "white",
            inactiveTintColor: "red",
            style: {
                zIndex: 99999
            }
        },
        tabBarPosition: "top",
        initialRouteName: "Home",
        tabBarComponent: props => <SwipeableTopTabBar
            {...props}
        />
    }
);

const TenantStack = createStackNavigator(
    {
        TentantInformation: {
            screen: TentantInformation
        }
    },
    {
        initialRouteName: "TentantInformation",
        defaultNavigationOptions: props => {
            return {
                header: <StackTopBar
                    {...props}
                />
            }
        }
    }
);

const NewTenantStack = createStackNavigator(
    {
        CreateNewTenant: {
            screen: CreateNewTenant
        }
    },
    {
        initialRouteName: "CreateNewTenant",
        defaultNavigationOptions: props => {
            return {
                header: <StackTopBar
                    {...props}
                />
            }
        }
    }
);

const RealEstateStack = createStackNavigator(
    {

        RealEstateInformation: {
            screen: RealEstateInformation,
        },
        RealestateNotificationSettings: RealestateNotificationSettingsScreen
    },
    {
        initialRouteName: "RealEstateInformation",
        defaultNavigationOptions: props => {
            return {
                header: <StackTopBar
                    {...props}
                />
            }
        }
    }
);

const NewRealEstateStack = createStackNavigator(
    {

        CreateNewRealEstate: {
            screen: CreateNewRealEstate,
        }
    },
    {
        initialRouteName: "CreateNewRealEstate",
        defaultNavigationOptions: props => {
            return {
                header: <StackTopBar
                    {...props}
                />
            }
        }
    }
);

const AuthStackNavigatior = createStackNavigator(
    {
        Signin: {
            screen: Signin,
        },
        Signup: {
            screen: Signup
        },
        ForgetPassword: {
            screen: ForgetPassword
        }
    },
    {
        initialRouteName: "Signin",
        defaultNavigationOptions: props => {
            return {
                header: <AuthStackTopBar
                    {...props}
                />
            }
        }
    }
);

const ApproachsStack = createStackNavigator(
    {
        Approachs: ApproachsScreen
    },
    {
        initialRouteName: "Approachs"
    }
);

const PastEstatesStack = createStackNavigator(
    {
        PastEstates: PastEstatesScreen
    },
    {
        initialRouteName: "PastEstates"
    }
);

const AppSwitchNavigator = createSwitchNavigator(
    {
        Loading: { screen: Loading },
        ManualRefetch: { screen: ManualRefetch },
        Auth: { screen: AuthStackNavigatior },
        Main: { screen: MainStackTopTabNavigator },
        RealEstateStack: { screen: RealEstateStack },
        TenantStack: { screen: TenantStack },
        NewTenantStack: { screen: NewTenantStack },
        NewRealEstateStack: { screen: NewRealEstateStack },
        Approachs: ApproachsStack,
        PastEstates: PastEstatesStack
    },
    {
        initialRouteName: "Loading",
        resetOnBlur: false
    }
);

export const AppContainer = createAppContainer(AppSwitchNavigator);