export function checkDisplayType({
  displayType,
  msgToBeSent,
  usersWithMatchingRole,
}: {
  displayType: string;
  msgToBeSent: string;
  usersWithMatchingRole: string[];
}) {
  if (displayType === "list") {
    return `Coming soon. We are working on this feature. We feel sorry for not serving you what you expect this command to do for now.(T_T)`;
  } else {
    if (usersWithMatchingRole.length > 0) {
      return `${displayType && msgToBeSent} ${usersWithMatchingRole}`;
    } else {
      return `Sorry no user found under this role.`;
    }
  }
}
