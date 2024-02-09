import { SSTConfig } from 'sst';
import { NextjsSite, Api, Config } from 'sst/constructs';

const environment = process.env.ENVIRONMENT || 'dev';
const appName = environment === 'prod' ? 'hubbl-dx' : `${environment}-hubbl-dx`;
const awsRegion = process.env.SST_AWS_REGION || 'us-east-1';

// TODO : break out stacks into separate files
export default {
  config(_input) {
    return {
      name: appName,
      region: awsRegion,
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Secrets
      // https://docs.sst.dev/config
      // https://docs.sst.dev/packages/sst#sst-secrets
      const AUTH0_DOMAIN = new Config.Secret(stack, 'AUTH0_DOMAIN');
      const AUTH0_CLIENT_ID = new Config.Secret(stack, 'AUTH0_CLIENT_ID');
      const AUTH0_CLIENT_SECRET = new Config.Secret(stack, 'AUTH0_CLIENT_SECRET');
      const AUTH0_AUDIENCE = new Config.Secret(stack, 'AUTH0_AUDIENCE');

      const PG_HOST = new Config.Secret(stack, 'PG_HOST');
      const PG_USER = new Config.Secret(stack, 'PG_USER');
      const PG_PASS = new Config.Secret(stack, 'PG_PASS');
      const PG_DB = new Config.Secret(stack, 'PG_DB');
      const PG_PORT = new Config.Secret(stack, 'PG_PORT'); // TODO change this to a parameter instead of a secret.

      // API handlers
      // https://docs.sst.dev/constructs/Api
      const api = new Api(stack, 'api', {
        routes: {
          'GET /orgs': {
            function: {
              handler: 'src/lambda/multiOrg.handler',
              bind: [
                AUTH0_DOMAIN,
                AUTH0_CLIENT_ID,
                AUTH0_CLIENT_SECRET,
                AUTH0_AUDIENCE,
                PG_HOST,
                PG_USER,
                PG_PASS,
                PG_DB,
                PG_PORT,
              ],
            },
          },
        },
      });

      // NextJS Site
      // https://docs.sst.dev/constructs/NextjsSite
      const site = new NextjsSite(stack, 'site', {
        bind: [api],
      });

      stack.addOutputs({
        SiteUrl: site.url,
        ApiEndpoint: api.url,
      });
    });
  },
} satisfies SSTConfig;
