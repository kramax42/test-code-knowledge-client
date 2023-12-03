import ThirdPartyEmailPasswordNode from 'supertokens-node/recipe/thirdpartyemailpassword'
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
  console.log('clients', [{
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
}])


  return {
    framework: "express",
    supertokens: {
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: "https://try.supertokens.com",
      // apiKey: <API_KEY(if configured)>,
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        // We have provided you with development keys which you can use for testing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        providers: [{
            config: {
                thirdPartyId: "google",
                clients: [{
                    clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                    clientSecret: "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"
                }]
            }
        }, {
            config: {
                thirdPartyId: "github",
                clients: [{
                    clientId: process.env.GITHUB_CLIENT_ID as string,
                    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
                }]
            }
        }, {
            config: {
                thirdPartyId: "apple",
                clients: [{
                    clientId: "4398792-io.supertokens.example.service",
                    additionalConfig: {
                        keyId: "7M48Y4RYDL",
                        privateKey:
                            "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                        teamId: "YWQCXGJRJL",
                    }
                }]
            }
        }],
      }),
      SessionNode.init({
        getTokenTransferMethod: () => "header",
      }),
    ],
    isInServerlessEnv: true,
  }
}