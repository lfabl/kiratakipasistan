import { gql } from "apollo-boost";

export const getAllRealEstates = gql`
        query {
            getAllRealEstates {
                data { 
                    id,
                    title,
                    type,
                    rentalType {
                        status
                    },
                    paymentPeriod {
                        type,
                        date
                    },
                    ownerManagerPhoneNumber,
                    ownerNameSurname,
                    activeTenant {
                        fullName
                    },
                    detailRent
                },
                response {
                    message,
                    code
                }
             }
        }  
`;