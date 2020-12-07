"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRealEstate = void 0;

var _apolloBoost = require("apollo-boost");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    mutation (\n        $realEstateID: String!,\n        $type: String!\n        $usageType: String,\n        $title: String!,\n        $adress: String!,\n        $fixtureDatas: [fixtureDatasInput],\n        $rentalType: String!,\n        $electricity: String,\n        $water: String,\n        $naturalGas: String,\n        $TCIPNo: String,\n        $ownerNameSurname: String,\n        $ownerManagerPhoneNumber: String,\n        $ownerTcIdentity: String,\n        $ownerIban: String,\n        $detailDues: String,\n        $detailManagerPhoneNumber: String,\n        $detailAdditionalInformation: String,\n        $numberOfRoom: String,\n        $purposeOfUsage: String,\n        $detailRent: String,\n        $paymentPeriod: PaymentPeriod,\n        $deposit: String\n    ){\n        updateRealEstate(\n            realEstateID: $realEstateID,\n            type: $type,\n            usageType: $usageType,\n            title: $title,\n            adress: $adress,\n            fixtureDatas: $fixtureDatas,\n            rentalType: $rentalType,\n            electricity: $electricity,\n            water: $water,\n            naturalGas: $naturalGas,\n            TCIPNo: $TCIPNo,\n            ownerNameSurname: $ownerNameSurname,\n            ownerManagerPhoneNumber: $ownerManagerPhoneNumber,\n            ownerTcIdentity: $ownerTcIdentity,\n            ownerIban: $ownerIban,\n            detailDues: $detailDues,\n            detailManagerPhoneNumber: $detailManagerPhoneNumber,\n            detailAdditionalInformation: $detailAdditionalInformation,\n            numberOfRoom: $numberOfRoom,\n            purposeOfUsage: $purposeOfUsage,\n            detailRent: $detailRent,\n            paymentPeriod: $paymentPeriod,\n            deposit: $deposit\n        ) {\n            message,\n            code\n        }\n    }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var updateRealEstate = (0, _apolloBoost.gql)(_templateObject());
exports.updateRealEstate = updateRealEstate;