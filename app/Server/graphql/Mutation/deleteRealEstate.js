import { gql } from "apollo-boost";

export const deleteRealEstate = gql`
    mutation (
        $realEstateID: String!,
    ){
        deleteRealEstate(
            realEstateID: $realEstateID
        ) {
            message,
            code
        }
    }
    
`;


