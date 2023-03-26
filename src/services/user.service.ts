import { api } from "./http.service";
import { ICreateUserData } from "../interfaces/ICreateUserData";
import { IGetUserData } from "../interfaces/IGetUserData";

export async function createUser(payload: ICreateUserData): Promise<string> {
  const { data } = await api.post("/users", payload);
  return data;
}

export async function getUserDataFromQRCode(uuid: string): Promise<IGetUserData> {
  const { data } = await api.get(`/users/${uuid}`);
  return data;
}
