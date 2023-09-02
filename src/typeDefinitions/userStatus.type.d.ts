export interface UserStatus {
  id: string;
  userId: string;
  currentStatus: {
    state: OOO | IDLE | ACTIVE;
    updatedAt: TimeStamp;
    from: TimeStamp;
    until: TimeStamp;
    message: string;
  };
  futureStatus: {
    state: OOO | IDLE | ACTIVE;
    updatedAt: TimeStamp;
    from: TimeStamp;
    until: TimeStamp;
    message: string;
  };
  monthlyHours: {
    committed: number;
    updatedAt: TimeStamp;
  };
}
