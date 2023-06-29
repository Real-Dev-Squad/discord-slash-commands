export type GuildRole = {
  id: string;
  name: string;
};

export type GuildDetails = {
  // This type defines the partial guild details response that we get from discord
  id: string;
  name: string;
  roles: Array<{
    id: string;
    name: string;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
  }>;
};
