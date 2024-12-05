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
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Use custom axios instance
          const axiosInstance = createAxiosInstance();

          // Disable SSL verification for this specific request
          const agent = new https.Agent({
            rejectUnauthorized: false,
          });

          // Perform login
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

          // Check login response
          if (loginResponse.status !== 200) {
            throw new Error("Login failed: Invalid credentials");
          }

          // Ensure access token is present
          if (!loginResponse.data?.access_token) {
            throw new Error("No access token received");
          }

          // Fetch user details
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

          // Validate user response
          if (userResponse.status !== 200) {
            throw new Error("Failed to fetch user details");
          }

          // Return user object
          return {
            id: String(userResponse.data.id),
            email: userResponse.data.email,
            name: userResponse.data.name,
            access_token: loginResponse.data.access_token,
          };
        } catch (error: any) {
          // More detailed error logging
          console.error("Authentication Error:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });

          // Throw a specific error that can be caught and displayed
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
    signIn: "/login", // Custom login page
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user: any; trigger?: string }) {
      if (user) {
        token.accessToken = user?.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          accessToken: token.accessToken,
          id: token.id,
        });
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow redirects to the dashboard only after successful authentication
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  // Enhanced error handling
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
