import { useSession } from "next-auth/react";

export const useSessionUpdate = () => {
  const { update } = useSession();

  const updateSession = async (data: {
    activeRoleId?: number;
    permissions?: string[];
  }) => {
    try {
      await update(data);
    } catch (error) {
      console.error("Session update failed", error);
    }
  };

  return { updateSession };
};
