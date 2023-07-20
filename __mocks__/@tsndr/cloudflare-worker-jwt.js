"use strict";

// import jest from 'jest';
const jest = require('jest')

const jwt = Object.create({});

jwt.sign = jest.fn().mockImplementation(() => {
  return "asdasd";
});

module.exports = jwt