import { type } from "os";
import { User } from "./User";

export type State = {
  user: User,
  isLogged: boolean,
  expiresIn: number;
}