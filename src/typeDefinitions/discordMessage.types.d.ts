export interface discordMessageRequest {
  type: number;
  data: messageRequestData;
  member: messageRequestMember;
  guild_id: number;
}

export interface messageRequestData {
  name: string;
  options?: Array<messageRequestDataOptions>;
}

export interface messageRequestDataOptions {
  name: string;
  type: number;
  value: string;
}

export interface messageRequestMember {
  user: messageMember;
}

export interface messageMember {
  id: number;
  username: string;
  avatar: string;
  discriminator: string;
}

export interface createDmChannel {
  id: number;
}
export interface createNewRole {
  rolename: string;
  mentionable: boolean;
}
export interface memberGroupRole {
  userid: string;
  roleid: string;
}

export interface guildRoleResponse {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: object;
}
