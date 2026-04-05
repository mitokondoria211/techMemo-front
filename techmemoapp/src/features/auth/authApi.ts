import { publicApi } from "@/services/axios";
import type { LoginType, RegisterType } from "../../types/auth";

export const loginApi = async (data: LoginType) => {
  const res = await publicApi.post("/auth/authenticate", data, {
    withCredentials: true,
  });
  return res.data;
};

export const registerApi = async (data: RegisterType) => {
  const res = await publicApi.post("/auth/register", data);
  return res.data;
};

export const refreshTokenApi = async () => {};
