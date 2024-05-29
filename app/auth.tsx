import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app"
import { adminAuth } from "../firebase-admin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "726678658112-o9pa2299vsi75vnpa2ga0dejgjj7govg.apps.googleusercontent.com",
      clientSecret: "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"
    }) 
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;

          const firebaseToken = await adminAuth.createCustomToken(token.sub);
          session.firebaseToken = firebaseToken;
        }
      }

      return session;
    },
    jwt: async ({user, token}) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt',
  },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: "orbital-59b97",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCNMuTolxw72KTK\n1AA2CT97k+YSI5KRtqGRjDVabhv34JJOBzHwSLwUrSpEk3Gqc0d1KFJHMHC8Sao/\nwfNjngBTV/2tonDltZKWNRN8b9c6qnGibPB8Y3GzWu1G3A32+tYWng5fjDhUhORi\naK8gW7OtCTjaMzQbCn7Mng5nz9y553wviLdGFGFsG+NQJU9hFRr5ZbmcsdOYqY+g\nhmXeeOvN8/YXoF54jZFO0gzL/1XUcvMNexsXOq3nDGYYipM5nZKZxLaWeiLwNI1L\nKLlg4cOwBg31U1QYkfRXoyPCXODKUiBFhrKUUkLZU0T8bn8NLQJgye5vgsgzrM1x\ndMESEJxHAgMBAAECggEACy39a+ETDjYADkMs5RpkWV+Dduo0H69rKYAFdWyEcGLq\nkp0FOjY4FhcD4rwd4tYP0Vno8dQHCRF4FmY/5CJNekvcPRRAhh+TRKtdKJweWXnH\nV4nynJavGPlZEiQ4QtbnfpDzKGOMzjxbbONHAnPgTRIO20/0jzOMiJz3HQcbPejV\nEH6exf3x2uh5Sy2zumqBBGMeJEU5h+jMuGptE0SpSujAEfunrGz6SbFdM+NKd5Ox\nNkemhCYESJAwL+WIW/HQg7Qdq1ItQHjrNk+ohkQtclScrb18Rn/CQvVyuI6rK1Ng\nFsVxCgMe4+ibsKdlTq01urJVSqEL0wPp2JP7XJl8kQKBgQDD4q7mu+RBM6c6v1/V\nJbP1Xm48k+qp70OXZia874Qj5MqKjHt0miXPb2QdCIB3qnvhtnvmCE+sY/bawlXd\nL3CUc0l0PvWue14u27DAWDtKIEDb6Ydkbt97SfFB3hDiASsdeYMmirK5RmnF1Gs/\nXqvSit6H/WShJao5V4zXD1GFHwKBgQC4h98H6bb3YNhOM2FU7cOMkrib/2LfzOc+\n9sb+JnigRDt6TtIlaYwuRz9rMA7Pa1OIPSbunhyQ/9RV5xFTP00WWSq5z1wrT0jw\nzSmWXgPIIJ2Hk2kqnn8T1OyoBXrtLGNHKw51nfdPNX8AgAW3qT/lfgBRoNJNVfQh\nUsw9dQOb2QKBgHLBBIdlQTW1Rd2TqVeb683t0RSp7so4wdca38zFYBsK+GCsJdLM\nTyQzdGnRxjjUZhh3qCO9cLdkJIRJXrXiCcjdtQVlsNXTrfwzdVtpFOq69GQgbdG3\nZjK6wZw9tJRB7Pkqa1uT21nQ1zwu0dlg47XG5tCx8Fa7UvqewIJolfAvAoGAeFJ4\nFiPJ3wHx6QPNqmAiiw28fFOJOB7WhhLJbDzPmMkE81pj4msxMZfZfV3nuk3kOMiP\nEzZbsBxwatbxUBPNgw3/MwtHsSHQkNtmC5sf4iWKMjXndBfHCrpi2ahBIFc6INSt\nZ/npoWdjeYMAt2IPvOds88zmc/Dg772aWVRsVvkCgYEAu+weP0ifZnMeVWSHuzsq\nndOK1lfRUl5bbrrP1mrSMTjMH/IQ9274dANDdnLodLMc5EJZwpGgceZ3Q47Wc19L\niO3dxT1mW/93arPmmIQzwcF6k5JxwXi8WSAr30PVgTkosZ0aC5ZeUHDM175C6IEh\nG6OqC3/DjwvTes8w190ASJg=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
      clientEmail: "firebase-adminsdk-d8fbw@orbital-59b97.iam.gserviceaccount.com",
    }),
  }),
}