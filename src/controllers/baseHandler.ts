import { commandNotFound } from "./commandNotFound";
import { helloCommand } from "./helloCommand";
import { verifyCommand } from "./verifyCommand";
import { mentionEachUser } from "./mentionEachUser";
import { taskCommand } from "./taskCommand";
import { notifyCommand } from "./notifyCommand";
import { oooCommand } from "./oooCommand";
import { userCommand } from "./userCommand";

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
  REMOVE,
  GROUP_INVITE,
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
import { DevFlag } from "../typeDefinitions/filterUsersByRole";
import { kickEachUser } from "./kickEachUser";
import { groupInvite } from "./groupInvite";

export async function baseHandler(
  message: discordMessageRequest,
  env: env,
  ctx: ExecutionContext
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
        message.member.joined_at,
        env
      );
    }
    case getCommandName(MENTION_EACH): {
      const data = message.data?.options as Array<messageRequestDataOptions>;
      // data[0] is role obj
      // data[1] is message obj
      const transformedArgument = {
        roleToBeTaggedObj: data[0],
        displayMessageObj: data.find((item) => item.name === "message"),
        channelId: message.channel_id,
        dev: data.find((item) => item.name === "dev") as unknown as DevFlag,
        devtitle: data.find(
          (item) => item.name === "devtitle"
        ) as unknown as DevFlag,
      };
      return await mentionEachUser(transformedArgument, env, ctx);
    }

    case getCommandName(REMOVE): {
      const data = message.data?.options as Array<messageRequestDataOptions>;
      const transformedArgument = {
        member: message.member,
        roleToBeRemovedObj: data[0],
        channelId: message.channel_id,
      };

      return await kickEachUser(transformedArgument, env, ctx);
    }

    case getCommandName(LISTENING): {
      const data = message.data?.options;
      const setter = data ? data[0].value : false;
      const nickname = removeListening(message.member.nick || "");
      let discordEphemeral;
      let updateNickNameData = "";
      try {
        if (setter) {
          if (
            message.member.nick &&
            !message.member.nick.includes(NICKNAME_SUFFIX)
          ) {
            updateNickNameData =
              NICKNAME_PREFIX + message.member.nick + NICKNAME_SUFFIX;
            discordEphemeral = LISTENING_SUCCESS_MESSAGE;
          } else if (!message.member.nick) {
            (updateNickNameData = NICKNAME_PREFIX + "" + NICKNAME_SUFFIX),
              (discordEphemeral = LISTENING_SUCCESS_MESSAGE);
          } else {
            updateNickNameData = message.member.nick;
            discordEphemeral = ALREADY_LISTENING;
          }
        } else if (
          !setter &&
          !message.member.nick &&
          message.member.user.username.includes(NICKNAME_SUFFIX)
        ) {
          updateNickNameData = message.member.user.username + NICKNAME_SUFFIX;

          discordEphemeral = REMOVED_LISTENING_MESSAGE;
        } else {
          if (message.member.nick?.includes(NICKNAME_SUFFIX)) {
            updateNickNameData = nickname;
            discordEphemeral = REMOVED_LISTENING_MESSAGE;
          } else {
            updateNickNameData = nickname;
            discordEphemeral = NOTHING_CHANGED;
          }
        }
        await updateNickName(
          message.member.user.id.toString(),
          updateNickNameData,
          env
        );
        return discordEphemeralResponse(discordEphemeral);
      } catch (err) {
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
      const dev = data.find(
        (item) => item.name === "dev"
      ) as unknown as DevFlag;
      return await userCommand(data[0].value, env, dev);
    }

    case getCommandName(GROUP_INVITE): {
      const data = message.data?.options as Array<messageRequestDataOptions>;

      return await groupInvite(data[0].value, data[1].value, env);
    }
    default: {
      return commandNotFound();
    }
  }
}
