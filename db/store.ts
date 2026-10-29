// A tiny in-memory data store. It stands in for a real database so the
// project stays easy to run. Data is not persisted — it resets every time
// the server restarts.

export interface User {
  id: number;
  name: string;
  email: string;
}

export type NewUser = Omit<User, "id">;

const users: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com" },
  { id: 2, name: "Alan Turing", email: "alan@example.com" },
  { id: 3, name: "Grace Hopper", email: "grace@example.com" },
];

let nextId = 4;

export function getAllUsers(): User[] {
  return users;
}

export function getUserById(id: number): User | undefined {
  return users.find((user) => user.id === id);
}

export function createUser({ name, email }: NewUser): User {
  const user: User = { id: nextId, name, email };
  nextId += 1;
  users.push(user);
  return user;
}
