import { gql } from "apollo-boost";

const realestateNotificationSettings = gql`
        query(
            $id: String!
        ){
            realestateNotificationSettings(
                id: $id
            ) {
                message,
                code,
                data {
                    id
                    openNotifications
                }
             }
        }  
`;

export default realestateNotificationSettings;