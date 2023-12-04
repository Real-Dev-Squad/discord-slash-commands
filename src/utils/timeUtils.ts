export const addDelay = async (millisecond: number): Promise<void> => {
  await new Promise<void>((resolve) => setTimeout(resolve, millisecond));
};

export const convertSecondsToMillis = (seconds: number): number => {
  return Math.ceil(seconds * 1000);
};
