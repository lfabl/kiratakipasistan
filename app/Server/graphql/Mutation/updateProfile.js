import { gql } from "apollo-boost";

export const updateProfile = gql`
    mutation (
        $oldPassword: String,
        $newPassword: String,
        $profileImage: Upload,
        $deleteProfileImage: Boolean
    ){
        updateProfile(
            oldPassword: $oldPassword,
            newPassword:  $newPassword,
            profileImage: $profileImage,
            deleteProfileImage: $deleteProfileImage
        ) {
            message,
            code
        }
    }
`;


