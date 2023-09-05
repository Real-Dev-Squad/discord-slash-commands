// export interface UserStatus {
//   id: string;
//   userId: string;
//   data: {
//     currentStatus: {
//       state: OOO | IDLE | ACTIVE;
//       updatedAt: TimeStamp;
//       from: TimeStamp;
//       until: TimeStamp;
//       message: string;
//     };
//     futureStatus: {
//       state: OOO | IDLE | ACTIVE;
//       updatedAt: TimeStamp;
//       from: TimeStamp;
//       until: TimeStamp;
//       message: string;
//     };
//     monthlyHours: {
//       committed: number;
//       updatedAt: TimeStamp;
//     };
//   };
//   message: string;
// }

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
