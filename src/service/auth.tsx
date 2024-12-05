import { fetchWrapper } from "@/helpers/fetch-wrapper";
import {
  LoginEntity,
  LoginResponse,
  RegisterEntity,
  RegisterResponse,
  User,
} from "../entity/auth-entity";

const login = async (payload: LoginEntity) =>
  (await fetchWrapper.auth("/auth/login", payload)) as LoginResponse;

const getProfile = async () => (await fetchWrapper.get("/auth/me")) as User;

const register = async (payload: RegisterEntity) =>
  (await fetchWrapper.post("/auth/register", payload)) as RegisterResponse;

export const authService = {
  login,
  getProfile,
  register,
};
