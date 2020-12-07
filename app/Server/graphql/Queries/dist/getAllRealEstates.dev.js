"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllRealEstates = void 0;

var _apolloBoost = require("apollo-boost");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        query {\n            getAllRealEstates {\n                data { \n                    id,\n                    title,\n                    type,\n                    rentalType {\n                        status\n                    },\n                    paymentPeriod {\n                        type,\n                        date\n                    },\n                    ownerManagerPhoneNumber,\n                    ownerNameSurname,\n                    activeTenant {\n                        fullName\n                    },\n                    detailRent\n                },\n                response {\n                    message,\n                    code\n                }\n             }\n        }  \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getAllRealEstates = (0, _apolloBoost.gql)(_templateObject());
exports.getAllRealEstates = getAllRealEstates;