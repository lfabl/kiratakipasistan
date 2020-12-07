import { gql } from "apollo-boost";

export const updateRealEstate = gql`
    mutation (
        $realEstateID: String!,
        $type: String!
        $usageType: String,
        $title: String!,
        $adress: String!,
        $fixtureDatas: [fixtureDatasInput],
        $rentalType: String!,
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
        updateRealEstate(
            realEstateID: $realEstateID,
            type: $type,
            usageType: $usageType,
            title: $title,
            adress: $adress,
            fixtureDatas: $fixtureDatas,
            rentalType: $rentalType,
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


