"use strict";

import jest from 'jest';

const jwt = Object.create({});

jwt.sign = jest.fn().mockImplementation(() => {
  return "asdasd";
});

export default jwt