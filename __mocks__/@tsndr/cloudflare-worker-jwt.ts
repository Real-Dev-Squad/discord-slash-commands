"use strict";
import jsonwebtoken from "jsonwebtoken";

const cloudflareWorkerJwt = jest.createMockFromModule("jsonwebtoken");

function sign() {
  console.log("ASD");
  return "asd";
}

// @ts-ignore
cloudflareWorkerJwt.sign = sign;

module.exports = cloudflareWorkerJwt;
