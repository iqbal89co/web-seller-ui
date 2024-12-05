import { fetchWrapper } from "../helpers/fetch-wrapper";
import { User } from "@/entity/auth-entity";

const getProfile = async () => {
  const res = await fetchWrapper.get("/profile");
  return res?.data as User;
};

const switchRole = async (role_id: number) => {
  const res = await fetchWrapper.post("/profile/switch-role", { role_id });
  return res?.data as User;
};

export const profileService = {
  getProfile,
  switchRole,
};
