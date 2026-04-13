import { useEffect, useState, type ReactNode } from "react";
import { loginApi, registerApi } from "./authApi";
import { AuthContext } from "../../app/authContext";
import type { LoginType, RegisterType, User } from "../../types/auth";

import { api, privateApi } from "../../services/axios";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem("accessToken"), // 遅延初期化
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post(
          "auth/refresh-token",
          {},
          { withCredentials: true },
        );

        localStorage.setItem("accessToken", res.data.accessToken);

        const userRes = await privateApi.get("/auth/me");
        setUser(userRes.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (data: LoginType) => {
    const res = await loginApi(data);
    setUser(res.user);
    setAccessToken(res.accessToken);

    localStorage.setItem("accessToken", res.accessToken);
  };

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  const signUp = async (data: RegisterType) => {
    const res = await registerApi(data);
    setUser(res.user);
    setAccessToken(res.accessToken);

    localStorage.setItem("accessToken", res.accessToken);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: loading ? null : !!accessToken,
        login,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
