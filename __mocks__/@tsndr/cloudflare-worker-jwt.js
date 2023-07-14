"use strict";

const jwt = Object.create({});

jwt.sign = jest.fn().mockImplementation(() => {
  console.log("MOCKED PACKAGED");
  return "asdasd";
});

module.exports = jwt;
