"use strict";

type cloudflareWorkerJwtType = {
  sign: () => void;
};

const cloudflareWorkerJwt:cloudflareWorkerJwtType = jest.createMockFromModule("jsonwebtoken");

function sign() {
  return "asd";
}

cloudflareWorkerJwt.sign = sign;

export default cloudflareWorkerJwt;
