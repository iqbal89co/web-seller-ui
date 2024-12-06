import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import https from "https";

const createAxiosInstance = () => {
  return axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV !== "production",
    }),
    validateStatus: function (status) {
      return status >= 200 && status < 500;
    },
  });
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const axiosInstance = createAxiosInstance();

          const agent = new https.Agent({
            rejectUnauthorized: false,
          });

          // login fetch
          const loginResponse = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              httpsAgent: agent,
              proxy: false,
            }
          );

          if (loginResponse.status !== 200) {
            throw new Error("Login failed: Invalid credentials");
          }
          if (!loginResponse.data?.access_token) {
            throw new Error("No access token received");
          }

          const userResponse = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
            {
              httpsAgent: agent,
              headers: {
                Authorization: `Bearer ${loginResponse.data.access_token}`,
              },
              proxy: false,
            }
          );

          if (userResponse.status !== 200) {
            throw new Error("Failed to fetch user details");
          }

          return {
            id: String(userResponse.data.id),
            email: userResponse.data.email,
            name: userResponse.data.name,
            access_token: loginResponse.data.access_token,
            active_role_id: userResponse.data.active_role_id,
            permissions: userResponse.data.active_role?.permissions?.map(
              (p: any) => p.name
            ),
          };
        } catch (error: any) {
          console.error("Authentication Error:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });

          throw new Error(
            error.response?.data?.message ||
              error.message ||
              "Authentication failed"
          );
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any;
      user: any;
      trigger?: string;
      session?: any;
    }) {
      if (user) {
        token.accessToken = user?.access_token;
        token.id = user.id;
        token.activeRoleId = user.active_role_id;
        token.permissions = user.permissions || [];
      }
      if (trigger === "update") {
        token.activeRoleId = session.activeRoleId;
        token.permissions = session.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          accessToken: token.accessToken,
          id: token.id,
          activeRoleId: token.activeRoleId,
          permissions: token.permissions,
        });
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  events: {
    async signIn(message) {
      console.log("Sign in event:", message);
    },
    async signOut(message) {
      console.log("Sign out event:", message);
    },
    async createUser(message) {
      console.log("User created:", message);
    },
  },
};

export default authOptions;
