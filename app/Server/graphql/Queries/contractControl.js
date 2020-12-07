import { gql } from "apollo-boost";

export const contractControl = gql`
        query(
            $tenantID : String,
            $realEstateID: String
        ){
            contractControl(tenantID: $tenantID, realEstateID:$realEstateID) {
                message,
                code
             }
        }  
`;


