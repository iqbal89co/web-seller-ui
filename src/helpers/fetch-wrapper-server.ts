import { authOptions } from "@/lib/authOptions";
import axios, { AxiosInstance } from "axios";
import https from "https";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const xios: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  headers: {
    Accept: "application/json",
  },
});

xios.interceptors.request.use(
  async (config) => {
    const session: any = await getServerSession(authOptions);
    if (session && session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = async (url: string) => {
  try {
    const res = await xios.get(url);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        redirect("/login");
      }
    }
    console.error(error);
    return null;
  }
};

export const fetchWrapperServer = {
  get,
};
