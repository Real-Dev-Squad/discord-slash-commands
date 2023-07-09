export type GuildRole = {
  id: string;
  name: string;
  color: string;
  hoist: boolean;
  icon?: string;
  position?: integer;
  managed?: boolean;
  mentionable?: boolean;
};

export type Role = Pick<GuildRole, "id" | "name">;
