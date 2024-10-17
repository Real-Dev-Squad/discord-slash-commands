// const excludeThis = [undefined, null]
// put a check for the above things later

export function checkDisplayType({
  usersWithMatchingRole,
  msgToBeSent,
  roleId,
}: {
  msgToBeSent?: string;
  usersWithMatchingRole: string[];
  roleId?: string;
}) {
  if (usersWithMatchingRole.length > 0) {
    const returnString = msgToBeSent ? msgToBeSent : "";
    return `${returnString} ${usersWithMatchingRole}`;
  } else {
    return `Sorry no user found with <@&${roleId ?? "undefined"}> role.`;
  }
}
