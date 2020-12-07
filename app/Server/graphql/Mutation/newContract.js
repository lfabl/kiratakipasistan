import { gql } from "apollo-boost";

export const newContract = gql`
    mutation (
        $tenantID: String!,
        $realEstateID: String!,
        $rentalDate: String!,
        $contractPeriod: String!,
        $rentalPrice: String!,
        $paymentType: String!,
        $paymentPeriod: PaymentPeriod!
    ){
        newContract(
            tenantID: $tenantID
            realEstateID: $realEstateID,
            rentalDate: $rentalDate,
            contractPeriod: $contractPeriod,
            rentalPrice: $rentalPrice,
            paymentType: $paymentType,
            paymentPeriod: $paymentPeriod,
        ) {
            message,
            code
        }
    }
    
`;


