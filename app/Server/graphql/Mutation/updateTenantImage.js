import { gql } from "apollo-boost";

export const updateTenantImage = gql`
    mutation (
        $tenantID: String!,
        $profileImage: Upload,
        $deleteProfileImage: Boolean
    ){
        updateTenantImage(
            tenantID: $tenantID,
            profileImage: $profileImage,
            deleteProfileImage: $deleteProfileImage
        ) {
            message,
            code
        }
    }
`;


