// const excludeThis = [undefined, null]
// put a check for the above things later

export function checkDisplayType({
  msgToBeSent,
  usersWithMatchingRole,
}: {
  msgToBeSent?: string;
  usersWithMatchingRole: string[];
})