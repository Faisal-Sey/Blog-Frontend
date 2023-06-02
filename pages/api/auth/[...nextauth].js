import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { BACKEND_DOMAIN } from '../../../utils/systemSettings'
import axios from 'axios'

const settings = {
    providers: [
        TwitterProvider({ clientId: process.env.TWITTER_API_KEY, clientSecret: process.env.TWITTER_API_KEY_SECRET }),
        LinkedInProvider({ clientId: process.env.LINKEDIN_API_KEY, clientSecret: process.env.LINKEDIN_API_KEY_SECRET })
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            if (account.provider === "twitter") {
                try {
                    const { oauth_token, oauth_token_secret } = account
                    await axios.post(`${BACKEND_DOMAIN}/auth/twitter/connect/`, { access_token: oauth_token, token_secret:oauth_token_secret }).then(res => {})
                    return Promise.resolve(true)
                } catch (error) {
                    return Promise.resolve(false)
                }
            }
            if(account.provider ==="linkedin"){
                try {
                    const { access_token, oauth_token_secret } = account
                    await axios.post(`${BACKEND_DOMAIN}/auth/linkedin/connect/`, { access_token: access_token, token_secret:oauth_token_secret }).then(res => {})
                    return Promise.resolve(true)
                } catch (error) {
                    return Promise.resolve(false)
                }
            }
        },

        async session({ session, token, user }) {
            session.access_token = token.sub
            return session
        },

        redirect({url,baseUrl}){
            return baseUrl;
        }
        

    },
    debug: true
}
export default (req, res) => NextAuth(req, res, settings)