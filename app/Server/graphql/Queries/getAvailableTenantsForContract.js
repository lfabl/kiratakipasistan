import { gql } from "apollo-boost";

export const getAvailableTenantsForContract = gql`
        query {
            getAvailableTenantsForContract {
                data { 
                     id,
                     fullName
                },
                response {
                    message,
                    code
                }
             }
        }  
`;


