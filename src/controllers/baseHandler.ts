import { commandNotFound } from "./commandNotFound";
import { helloCommand } from "./helloCommand";
import { verifyCommand } from "./verifyCommand";
import { mentionEachUser } from "./mentionEachUser";
import { taskCommand } from "./taskCommand";
import { notifyCommand } from "./notifyCommand";
import { oooCommand } from "./oooCommand";
import { userCommand } from "./userCommand";
import { muteUser, unmuteUser } from "../utils/userMuteUnmuteActions";
import { getCommandName } from "../utils/getCommandName";
import JSONResponse from "../utils/JsonResponse";
import { lowerCaseMessageCommands } from "../utils/lowerCaseMessageCommand";

import { env } from "../typeDefinitions/default.types";
import {
  discordMessageRequest,
  messageRequestDataOptions,
} from "../typeDefinitions/discordMessage.types";

import {
  HELLO,
  LISTENING,
  MENTION_EACH,
  VERIFY,
  TASK,
  NOTIFY_OVERDUE,
  NOTIFY_ONBOARDING,
  OOO,
  USER,
} from "../constants/commands";
import { updateNickName } from "../utils/updateNickname";
import { discordEphemeralResponse } from "../utils/discordEphemeralResponse";
import { removeListening } from "../utils/removeListening";
import { NICKNAME_SUFFIX, NICKNAME_PREFIX } from "../constants/nicknameAffixes";
import {
  ALREADY_LISTENING,
  LISTENING_SUCCESS_MESSAGE,
  NOTHING_CHANGED,
  REMOVED_LISTENING_MESSAGE,
  RETRY_COMMAND,
} from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";

// Import necessary functions from DiscordAPI.ts
import {
  createMutedRole,
  assignRoleToUser,
  removeRoleFromUser,
  getMutedRoleId,
} from "../utils/discordAPI";

export async function baseHandler(
  message: discordMessageRequest,
  env: env
): Promise<JSONResponse> {
  const command = lowerCaseMessageCommands(message);

  switch (command) {
    case getCommandName(HELLO): {
      return helloCommand(message.member.user.id);
    }
    case getCommandName(VERIFY): {
      return await verifyCommand(
        message.member.user.id,
        message.member.user.avatar,
        message.member.user.username,
        message.member.user.discriminator,
        env
      );
    }
    case getCommandName(MENTION_EACH): {
      const data = message.data?.options as Array<messageRequestDataOptions>;
      const transformedArgument = {
        roleToBeTaggedObj: data[0],
        displayMessageObj: data[1] ?? {},
      };

      return await mentionEachUser(transformedArgument, env);
    }

    case getCommandName(LISTENING): {
      const data = message.data?.options;
      const setter = data ? data[0].value : false;
      const memberId = message.member.user.id.toString();
      const nickname = removeListening(message.member.nick || "");
      let discordEphemeral;
      let updateNickNameData = "";
      try {
        if (setter) {
          if (!message.member.nick?.includes(NICKNAME_SUFFIX)) {
            updateNickNameData =
              NICKNAME_PREFIX + message.member.user.username + NICKNAME_SUFFIX;
            discordEphemeral = LISTENING_SUCCESS_MESSAGE;
            // Create the muted role if it doesn't exist
            const mutedRoleId = await createMutedRole(
              message.guild.id,
              env.DISCORD_TOKEN
            );
            if (mutedRoleId) {
              // Assign the muted role to the user
              await assignRoleToUser(
                message.guild.id,
                memberId,
                mutedRoleId,
                env.DISCORD_TOKEN
              );
              // Mute the user
              await muteUser(memberId, message.guild.id, env.DISCORD_TOKEN);
            } else {
              console.error("Failed to create muted role.");
              return commandNotFound(); // Return an error response
            }
          } else {
            updateNickNameData = message.member.nick;
            discordEphemeral = ALREADY_LISTENING;
          }
        } else {
          updateNickNameData = nickname;
          discordEphemeral = REMOVED_LISTENING_MESSAGE;
          // Remove the muted role from the user
          const mutedRoleId = await getMutedRoleId(
            message.guild.id,
            env.DISCORD_TOKEN
          );
          if (mutedRoleId) {
            await removeRoleFromUser(
              message.guild.id,
              memberId,
              mutedRoleId,
              env.DISCORD_TOKEN
            );
            // Unmute the user
            await unmuteUser(memberId, message.guild.id, env.DISCORD_TOKEN);
          } else {
            console.error("Muted role not found.");
            return commandNotFound(); // Return an error response
          }
        }
        await updateNickName(
          message.member.user.id.toString(),
          updateNickNameData,
          env
        );
        return discordEphemeralResponse(discordEphemeral);
      } catch (err) {
        console.error("Error:", err);
        return discordEphemeralResponse(RETRY_COMMAND);
      }
    }

    case getCommandName(TASK): {
      const data = message.data?.options as Array<messageRequestDataOptions>;
      return await taskCommand(data[0].value);
    }
    case getCommandName(NOTIFY_OVERDUE): {
      const data = message.data?.options as Array<messageRequestDataOptions>;
      return await notifyCommand(data, true, false);
    }
    case getCommandName(NOTIFY_ONBOARDING): {
      const data = message.data?.options as Array<messageRequestDataOptions>;
      return await notifyCommand(data, false, true);
    }
    case getCommandName(OOO): {
      const data = message.data?.options as Array<messageRequestDataOptions>;
      return await oooCommand(data[0].value);
    }
    case getCommandName(USER): {
      const data = message.data?.options as Array<messageRequestDataOptions>;
      return await userCommand(data[0].value, env);
    }
    default: {
      return commandNotFound();
    }
  }
}
