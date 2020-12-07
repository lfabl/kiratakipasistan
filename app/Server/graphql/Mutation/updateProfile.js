import { gql } from "apollo-boost";

export const updateProfile = gql`
    mutation (
        $oldPassword: String,
        $newPassword: String
    ){
        updateProfile(
            oldPassword: $oldPassword,
            newPassword:  $newPassword
        ) {
            message,
            code
        }
    }
`;


