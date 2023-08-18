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
  options: Array<messageRequestDataOptions>;
}

export interface messageRequestMember {
  user: messageMember;
  nick?: string;
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

export interface discordMemberDetails {
  avatar: string;
  communication_disabled_until: string;
  flags: number;
  joined_at: string;
  nick: string;
  pending: boolean;
  premium_since: string;
  roles: Array<string>;
  user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string;
    accent_color: string;
    global_name: string;
    avatar_decoration: string;
    display_name: string;
    banner_color: string;
  };
  mute: boolean;
  deaf: boolean;
}
