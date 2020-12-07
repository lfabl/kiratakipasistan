import { gql } from "apollo-boost";

export const deleteTenant = gql`
    mutation (
        $tenantID: String!,
    ){
        deleteTenant(
            tenantID: $tenantID
        ) {
            message,
            code
        }
    }
    
`;


