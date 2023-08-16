const mockJwt = {
  sign: jest.fn().mockImplementation(() => {
    return "SIGNED_JWT";
  }),
};

export default mockJwt;
