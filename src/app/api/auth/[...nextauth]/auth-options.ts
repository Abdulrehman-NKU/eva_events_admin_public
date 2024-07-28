import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';
import axios from 'axios';
import { CommonEnums } from '@/enums/common.enums';

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    ...pagesOptions,
  },

  // session: {
  //   strategy: 'jwt',
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },

  callbacks: {
    // async session({ session, token }) {
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: token.idToken as string,
    //     },
    //   };
    // },
    // async jwt({ token, user }) {
    //   if (user) {
    //     // return user as JWT
    //     token.user = user;
    //   }
    //   return token;
    // },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      // if (parsedUrl.searchParams.has('callbackUrl')) {
      //   return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      // }
      // if (parsedUrl.origin === baseUrl) {
      //   return url;
      // }

      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid

        const res = await axios({
          url: `${CommonEnums.url.apiBasePath}/admins/auth/login`,
          // url: 'http://localhost:5000/api/admins/auth/login',
          method: 'POST',
          // withCredentials: true,
          data: {
            email: credentials?.email, // required
            password: credentials?.password, // required
            remember: credentials?.rememberMe, // true/false, not required, if true then expiry for access token is 4 weeks and for refresh tokens expiry is 5 weeks
          },
        });

        console.log('res >>>', res);
        if (res?.data?.success) {
          let authUser = {
            ...res.data?.data?.user,
            access_token: res.data?.data.access_token,
            refresh_token: res.data?.data.refresh_token,
          };

          return authUser;
        }

        return null;
      },
    }),
    // GoogleProvider({
    //   clientId: env.GOOGLE_CLIENT_ID || '',
    //   clientSecret: env.GOOGLE_CLIENT_SECRET || '',
    //   allowDangerousEmailAccountLinking: true,
    // }),
  ],
};
