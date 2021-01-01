import React, {
    useEffect
} from 'react';

import {
  SafeAreaView
} from 'react-native';

import AsyncStorage from "@react-native-community/async-storage";
//Navigation
import { AppContainer } from "./Navigation/index";

//Apollo İtems
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache, } from "apollo-boost";


import { serverAdres } from "./Server/config";
import { createUploadLink } from "apollo-upload-client/lib/index";
import { setContext } from "apollo-link-context";

const App = () => {
  const fetchAdress = serverAdres + "/app";
  const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem("userToken");
    return {
      headers: {
        ...headers,
        "x-access-token": token
      }
    }
  });
  const client = new ApolloClient({
    link: authLink.concat(createUploadLink({
      uri: fetchAdress,
      credentials: 'same-origin',
      mode: 'same-origin',
    })),
    cache: new InMemoryCache({
      addTypename: false
    })
  });
  return <ApolloProvider client={client}>
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <AppContainer/>
    </SafeAreaView>
  </ApolloProvider>
};
export default App;