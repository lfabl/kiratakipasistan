import { gql } from "apollo-boost";

export const deleteContract = gql`
    mutation (
        $tenantID: String,
        $realEstateID: String,
    ){
        deleteContract(
            tenantID: $tenantID,
            realEstateID: $realEstateID
        ) {
            message,
            code
        }
    }
    
`;


