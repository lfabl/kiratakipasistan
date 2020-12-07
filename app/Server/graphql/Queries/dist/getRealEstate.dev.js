"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRealEstate = void 0;

var _apolloBoost = require("apollo-boost");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        query(\n            $realEstateID : String!\n        ){\n            getRealEstate(realEstateID: $realEstateID) {\n                data { \n                    type,\n                    usageType,\n                    title,\n                    adress,\n                    fixtureDatas {\n                        name,\n                        images {\n                            image,\n                            imageBase64\n                        }\n                    },\n                    rentalType {\n                        status\n                    },\n                    electricity,\n                    water,\n                    naturalGas,\n                    TCIPNo,\n                    ownerNameSurname,\n                    ownerManagerPhoneNumber,\n                    ownerTcIdentity,\n                    ownerIban,\n                    detailDues,\n                    detailManagerPhoneNumber,\n                    detailAdditionalInformation,\n                    numberOfRoom,\n                    purposeOfUsage,\n                    detailRent,\n                    paymentPeriod {\n                        type,\n                        date\n                    },\n                    deposit\n                },\n                response {\n                    message,\n                    code\n                }\n             }\n        }  \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getRealEstate = (0, _apolloBoost.gql)(_templateObject());
exports.getRealEstate = getRealEstate;