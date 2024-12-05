import axios from "axios";
import { signOut } from "next-auth/react";

export const handleErrorPost = async (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      await signOut({ redirect: true, callbackUrl: "/login" });
    }
    if (
      error.response?.status === 500 &&
      error.response?.data?.message.includes("Duplicate entry")
    ) {
      alert(
        "Duplikat data ditemukan, silahkan cek kembali data yang diinputkan"
      );
    }
    if (error?.code == "ERR_NETWORK") {
      return error;
    }
  }
  console.error(error);
  return null;
};
