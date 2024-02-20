import { env } from "../typeDefinitions/default.types";
import { sendProfileServiceBlockedMessage } from "../utils/sendProfileServiceBlockedMessage";
import JSONResponse from "../utils/JsonResponse";
import * as response from "../constants/responses";
import { verifyIdentityServiceAuthToken } from "../utils/verifyAuthToken";

export const sendProfileBlockedMessage = async (request: any, env: env) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
  try {
    await verifyIdentityServiceAuthToken(authHeader, env);
    const messageRequest: { userId: string; reason: string } =
      await request.json();
    const { userId, reason } = messageRequest;
    await sendProfileServiceBlockedMessage(userId, reason, env);
    return new JSONResponse("Message sent in tracking channel on discord");
  } catch (e) {
    return new JSONResponse(response.BAD_SIGNATURE);
  }
};
