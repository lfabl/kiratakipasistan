import { gql } from "apollo-boost";

export const newTenant = gql`
    mutation (
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
    ){
        newTenant(
            fullName: $fullName,
            tcIdentity:  $tcIdentity,
            phoneNumber1: $phoneNumber1,
            phoneNumber2: $phoneNumber2,
            tenantAdress:  $tenantAdress,
            profileImageName: $profileImageName,
            suretyFullName: $suretyFullName,
            suretyTcIdentity: $suretyTcIdentity,
            suretyPhoneNumber:  $suretyPhoneNumber,
            suretyAdress: $suretyAdress
        ) {
            message,
            code
        }
}
`;


