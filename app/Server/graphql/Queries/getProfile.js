import { gql } from "apollo-boost";

export const getProfile = gql`
        query {
            getProfile{
                data {
                    id,
                    fullName,
                    userName,
                    mail,
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


