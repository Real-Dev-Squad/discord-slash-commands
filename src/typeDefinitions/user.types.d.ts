export interface User {
  avatar: null | string;
  communication_disabled_until: null | string;
  flags: 0;
  is_pending: boolean;
  joined_at: string; //ISO8601 timestamp
  nick: null | string;
  pending: boolean;
  premium_since: null | string;
  roles: string[];
  user: {
    id: string;
    username: string;
    global_name: string;
    display_name: string;
    avatar: string; // avatar hash
    discriminator: string; //4-digit discord-tag
    public_flags: integer;
    avatar_decoration: null;
  };
  mute: boolean;
  deaf: boolean;
}
