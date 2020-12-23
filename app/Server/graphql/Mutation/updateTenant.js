import { gql } from "apollo-boost";

export const updateTenant = gql`
    mutation (
        $tenantID: String!
        $fullName: String!,
        $tcIdentity: String!
        $phoneNumber1: String!,
        $phoneNumber2: String,
        $tenantAdress: String,
        $profileImageName: String,
        $suretyFullName: String,
        $suretyTcIdentity: String,
        $suretyPhoneNumber: String,
        $suretyAdress: String,
        $profileImage: Upload,
        $deleteProfileImage: Boolean,
    ){
        updateTenant(
            tenantID:  $tenantID
            fullName: $fullName,
            tcIdentity:  $tcIdentity,
            phoneNumber1: $phoneNumber1,
            phoneNumber2: $phoneNumber2,
            tenantAdress:  $tenantAdress,
            profileImageName: $profileImageName,
            suretyFullName: $suretyFullName,
            suretyTcIdentity: $suretyTcIdentity,
            suretyPhoneNumber:  $suretyPhoneNumber,
            suretyAdress: $suretyAdress,
            profileImage: $profileImage,
            deleteProfileImage: $deleteProfileImage,
        ) {
            message,
            code
        }
}
`;


