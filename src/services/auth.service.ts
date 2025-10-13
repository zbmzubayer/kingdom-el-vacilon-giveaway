import { axiosInstance } from "@/lib/axios.config";
import type { LoginDto } from "@/validations/auth.dto";

export const login = async (data: LoginDto) => {
  return await axiosInstance.post<{ token: string }>("/auth/login", data);
};
