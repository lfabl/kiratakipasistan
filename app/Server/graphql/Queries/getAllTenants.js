import { gql } from "apollo-boost";

export const getAllTenants = gql`
        query {
            getAllTenants {
                data { 
                     id,
                     fullName,
                     activeApartment {
                        title,
                        id
                     },
                     phoneNumber1,
                     suretyFullName,
                     suretyPhoneNumber,
                     profileImageName
                },
                response {
                    message,
                    code
                }
             }
        }  
`;


