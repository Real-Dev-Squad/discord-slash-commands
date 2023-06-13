import { UserArray } from "../typeDefinitions/filterUsersByRole";

export function filterUserByRoles(userArray: UserArray[], roleId: string) {
  let filteredUser: string[] | [] = [];

  if (userArray?.length > 0 && Array.isArray(userArray)) {
    filteredUser = userArray?.reduce((acc: string[], current: UserArray) => {
      if (current.roles.includes(roleId)) {
        const modedTag = `<@${current.user.id}>`;

        acc.push(modedTag);
      }

      return acc;
    }, []);
  }

  return filteredUser;
}
