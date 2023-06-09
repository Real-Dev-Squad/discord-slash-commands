import { UserArray } from "../typeDefinitions/filterUsersByRole.types";

export function filterUserByRoles(userArray: UserArray[], roleId:string){
const filteredUser = userArray.reduce(
        (acc: string[], current: UserArray) => {
          // role present in user ?
          if (current.roles.includes(roleId)) {
            // if yes ? then mod the user id & push in array
            const modedTag = `<@${current.user.id}>`;
            acc.push(modedTag);
          }
          return acc;
        },
        []
      );

      return filteredUser;
}

