import { gql } from "apollo-boost";

export const getTenant = gql`
        query(
            $tenantID : String!
        ){
            getTenant(tenantID: $tenantID) {
                data { 
                    id,
                    fullName,
                    tcIdentity,
                    phoneNumber1,
                    phoneNumber2
                    tenantAdress,
                    activeApartment {
                        title,
                        id
                    },
                    suretyFullName,
                    suretyTcIdentity,
                    suretyPhoneNumber,
                    suretyAdress,
                    profileImageName,
                    registerDate
                },
                response {
                    message,
                    code
                }
             }
        }  
`;


