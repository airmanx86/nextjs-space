import { NextAuthConfig } from 'next-auth';
import Keycloak from "next-auth/providers/keycloak"

const authOptions: NextAuthConfig = {
    providers: [Keycloak],
    pages: {
        signIn: '/signin',
        signOut: '/signout',
    },
};

export default authOptions;
