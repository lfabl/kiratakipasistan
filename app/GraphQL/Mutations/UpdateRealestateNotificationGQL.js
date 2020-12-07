import { gql } from "apollo-boost";

const updateRealestateNotificationGQL = gql`
    mutation (
        $id: String!,
        $openNotifications: Boolean!
    ){
        updateRealestateNotificationGQL(
            id: $id,
            openNotifications: $openNotifications
        ) {
            message,
            code,
            data {
                id,
                openNotifications
            }
        }
    }
`;

export default updateRealestateNotificationGQL;