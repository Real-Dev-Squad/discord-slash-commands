import * as response from "../constants/responses";
import { env } from "../typeDefinitions/default.types";
import config from "../../config/config";
import jwt from "@tsndr/cloudflare-worker-jwt";
const OOO_STATUS = "OOO";

export const getUserOOODetails = async (id: number, env: env) => {
  const base_url = config(env).RDS_BASE_API_URL;
  try {
    const authToken = await jwt.sign(
      { name: "Cloudflare Worker", exp: Math.floor(Date.now() / 1000) + 2 },
      env.BOT_PRIVATE_KEY,
      { algorithm: "RS256" }
    );
    const response = await fetch(`${base_url}/users/discordId/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const responseData = await response.json();

    const userStatus = await fetch(
      `${base_url}/users/status/${responseData.user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const userStatusData = await userStatus.json();
    const data = userStatusData.data;
    return formatDataForDiscordMessage(data);
  } catch (err) {
    return response.BAD_SIGNATURE;
  }
};

function formatDataForDiscordMessage(data: object) {
  let msg = "";
  const { currentStatus, futureStatus } = data;
  if (currentStatus.state === OOO_STATUS) {
    msg = msg.concat(`Currently)
    ${new Date(currentStatus.from).toDateString()} - ${new Date(
      currentStatus.until
    ).toDateString()}
    ${currentStatus.message}
    `);
  }
  if (futureStatus.state === OOO_STATUS) {
    msg = msg.concat(`\n (Upcoming)
    ${new Date(futureStatus.from).toDateString()} - ${new Date(
      futureStatus.until
    ).toDateString()}
    ${futureStatus.message}
    `);
  }
  return msg ? msg : "No data found!";
}
