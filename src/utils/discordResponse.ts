import JSONResponse from "./JsonResponse";

export const DISCORD_RESPONSE = (reply: string) => {
  return new JSONResponse({
    type: 4,
    data: {
      content: reply,
    },
  });
};
