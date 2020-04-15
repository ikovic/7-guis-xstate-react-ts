export interface User {
  id: number;
  name: string;
  surname: string;
}

export interface NewUser {
  name: string;
  surname: string;
}

const USERS_ENDPOINT_URL = "http://localhost:3001/users";

export function createUser(user: NewUser): Promise<User[]> {
  return fetch(USERS_ENDPOINT_URL, {
    method: "POST",
    body: JSON.stringify(user),
  }).then((response) => response.json());
}

export function updateUser(user: User): Promise<User> {
  return fetch(`${USERS_ENDPOINT_URL}/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  }).then((response) => response.json());
}

export function getUsers(): Promise<User[]> {
  return fetch(USERS_ENDPOINT_URL).then((response) => response.json());
}

export function deleteUser(user: User): Promise<User> {
  return fetch(`${USERS_ENDPOINT_URL}/${user.id}`, { method: "DELETE" }).then(
    () => user
  );
}
