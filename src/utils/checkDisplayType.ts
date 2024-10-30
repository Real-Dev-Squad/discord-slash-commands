// const excludeThis = [undefined, null]
// put a check for the above things later

export function checkDisplayType({
  usersWithMatchingRole,
  msgToBeSent,
}: {
  msgToBeSent?: string;
  usersWithMatchingRole: string[];
}) {
  if (usersWithMatchingRole.length > 0) {
    const returnString = msgToBeSent ? msgToBeSent : "";
    return `${returnString} ${usersWithMatchingRole}`;
  } else {
    return `Sorry no user found under this role.`;
  }
}
