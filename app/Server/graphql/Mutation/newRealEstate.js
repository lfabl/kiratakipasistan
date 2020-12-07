import { gql } from "apollo-boost";

export const newRealEstate = gql`
    mutation (
        $type: String!
        $usageType: String,
        $title: String!,
        $adress: String!,
        $fixtureDatas: [fixtureDatasInput],
        $electricity: String,
        $water: String,
        $naturalGas: String,
        $TCIPNo: String,
        $ownerNameSurname: String,
        $ownerManagerPhoneNumber: String,
        $ownerTcIdentity: String,
        $ownerIban: String,
        $detailDues: String,
        $detailManagerPhoneNumber: String,
        $detailAdditionalInformation: String,
        $numberOfRoom: String,
        $purposeOfUsage: String,
        $detailRent: String,
        $paymentPeriod: PaymentPeriod,
        $deposit: String
    ){
        newRealEstate(
            type: $type
            usageType: $usageType,
            title: $title,
            adress: $adress,
            fixtureDatas: $fixtureDatas,
            electricity: $electricity,
            water: $water,
            naturalGas: $naturalGas,
            TCIPNo: $TCIPNo,
            ownerNameSurname: $ownerNameSurname,
            ownerManagerPhoneNumber: $ownerManagerPhoneNumber,
            ownerTcIdentity: $ownerTcIdentity,
            ownerIban: $ownerIban,
            detailDues: $detailDues,
            detailManagerPhoneNumber: $detailManagerPhoneNumber,
            detailAdditionalInformation: $detailAdditionalInformation,
            numberOfRoom: $numberOfRoom,
            purposeOfUsage: $purposeOfUsage,
            detailRent: $detailRent,
            paymentPeriod: $paymentPeriod,
            deposit: $deposit
        ) {
            message,
            code
        }
    }
    
`;


