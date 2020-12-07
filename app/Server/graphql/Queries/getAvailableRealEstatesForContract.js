import { gql } from "apollo-boost";

export const getAvailableRealEstatesForContract = gql`
        query {
            getAvailableRealEstatesForContract {
                data { 
                     id,
                     title
                },
                response {
                    message,
                    code
                }
             }
        }  
`;


