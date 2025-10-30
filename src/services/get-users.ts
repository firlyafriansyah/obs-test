import type { UserDataType } from '../models/users';

export default async function GetUsersServices(): Promise<UserDataType[]> {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((res: UserDataType[]) => resolve(res))
      .catch((err) => reject(err.message));
  });
}
