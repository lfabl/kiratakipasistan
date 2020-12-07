import { gql } from "apollo-boost";

export const getRealEstate = gql`
        query(
            $realEstateID : String!
        ){
            getRealEstate(realEstateID: $realEstateID) {
                data { 
                    type,
                    usageType,
                    title,
                    adress,
                    fixtureDatas {
                        name,
                        images {
                            image,
                            imageBase64
                        }
                    },
                    rentalType {
                        status
                    },
                    electricity,
                    water,
                    naturalGas,
                    TCIPNo,
                    ownerNameSurname,
                    ownerManagerPhoneNumber,
                    ownerTcIdentity,
                    ownerIban,
                    detailDues,
                    detailManagerPhoneNumber,
                    detailAdditionalInformation,
                    numberOfRoom,
                    purposeOfUsage,
                    detailRent,
                    paymentPeriod {
                        type,
                        date
                    },
                    deposit
                },
                response {
                    message,
                    code
                }
             }
        }  
`;


