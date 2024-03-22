import { personInfo as Person } from "./Person";

type userInfo = {
  id: number;
  personId: number;
  person?: Person;
  userName: string;
  password: string;
  isActive: boolean;
};
type user = {
  id: number;
  personId: number;
  userName: string;
  fullName: string;
  isActive: boolean;
};
type LoginInfo = {
  id: number | null;
  userName: string;
  password: string;
};
export type { userInfo, user, LoginInfo };
