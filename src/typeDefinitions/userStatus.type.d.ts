export interface UserStatus {
  id: string;
  userId: string;
  data: {
    userId: string;
    currentStatus: {
      from: TimeStamp;
      until: string;
      state: "IDLE" | "OOO" | "ACTIVE";
      updatedAt: TimeStamp;
      message: string;
    };
    futureStatus: {
      from: TimeStamp;
      until: string;
      state: "IDLE" | "OOO" | "ACTIVE";
      updatedAt: TimeStamp;
      message: string;
    };
    monthlyHours: {
      committed: number;
      updatedAt: TimeStamp;
    };
  };
  message: string;
}
