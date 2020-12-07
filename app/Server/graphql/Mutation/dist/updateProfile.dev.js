"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfile = void 0;

var _apolloBoost = require("apollo-boost");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    mutation (\n        $oldPassword: String,\n        $newPassword: String\n    ){\n        updateProfile(\n            oldPassword: $oldPassword,\n            newPassword:  $newPassword\n        ) {\n            message,\n            code\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var updateProfile = (0, _apolloBoost.gql)(_templateObject());
exports.updateProfile = updateProfile;