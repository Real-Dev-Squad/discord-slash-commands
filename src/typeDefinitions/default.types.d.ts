export interface env {
  [key: string]: string;
}

export interface environment {
  [key: string]: variables;
}

export interface variables {
  RDS_BASE_API_URL: string;
}

export interface discordCommand {
  name: string;
  description: string;
}

export interface responseJson {
  type: number;
  data: {
    content: string;
  };
}
