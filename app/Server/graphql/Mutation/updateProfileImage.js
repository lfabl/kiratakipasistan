import { gql } from "apollo-boost";

export const updateProfileImage = gql`
    mutation (
        $profileImage: Upload,
        $deleteProfileImage: Boolean
    ){
        updateProfileImage(
            profileImage: $profileImage,
            deleteProfileImage: $deleteProfileImage
        ) {
            message,
            code
        }
    }
`;


