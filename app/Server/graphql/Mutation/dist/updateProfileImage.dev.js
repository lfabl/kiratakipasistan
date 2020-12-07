"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfileImage = void 0;

var _apolloBoost = require("apollo-boost");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    mutation (\n        $profileImage: Upload,\n        $deleteProfileImage: Boolean\n    ){\n        updateProfileImage(\n            profileImage: $profileImage,\n            deleteProfileImage: $deleteProfileImage\n        ) {\n            message,\n            code\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var updateProfileImage = (0, _apolloBoost.gql)(_templateObject());
exports.updateProfileImage = updateProfileImage;