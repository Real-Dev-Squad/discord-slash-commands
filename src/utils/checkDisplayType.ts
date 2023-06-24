// const excludeThis = [undefined, null]
// put a check for the above things later

export function checkDisplayType({
  msgToBeSent,
  usersWithMatchingRole,
}: {
  msgToBeSent?: string;
  usersWithMatchingRole: string[];
}) {
  if (usersWithMatchingRole.length > 0) {
    const returnString = msgToBeSent ? msgToBeSent : "";

    return `${returnString} ${usersWithMatchingRole} \n \`Disclaimer: Very soon all the users will be tagged individually in a separate(new) message!\``;
  } else {
    return `Sorry no user found under this role.`;
  }
}
