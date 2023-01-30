import JSONResponse from "../utils/JsonResponse";

export const UNKNOWN_INTERACTION = {
  error: "Unknown Interaction",
};

export const NOT_FOUND = {
  error: "🥹 oops! No fish 🐟 caught 🎣",
};

export const BAD_SIGNATURE = {
  error: "🚫 Bad Request Signature",
};

export const STATUS_CHECK = {
  message: "Welcome to our discord Bot Server 👋",
};

export const DISCORD_RESPONSE = (reply: string) => {
  return new JSONResponse({
    type: 4,
    data: {
      content: reply,
    },
  });
};
