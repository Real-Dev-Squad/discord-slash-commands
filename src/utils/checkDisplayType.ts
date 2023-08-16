// const excludeThis = [undefined, null]
// put a check for the above things later

export function checkDisplayType({
  usersWithMatchingRole,
}: {
  msgToBeSent?: string;
  usersWithMatchingRole: string[];
}) {
  if (usersWithMatchingRole.length > 0) {
    return `${usersWithMatchingRole}`;
  } else {
    return `Sorry no user found under this role.`;
  }
}
