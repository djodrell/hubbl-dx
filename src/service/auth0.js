import jwt from 'jsonwebtoken';
import jwks from 'jwks-rsa';
import { Config } from 'sst/node/config';

const TOKEN_RESOURCE = 'https://' + Config.AUTH0_DOMAIN + '/oauth/token';
const AUTH_SYSTEM_USERNAME = 'system';
/**
 * validate that the Bearer token is from an authenticated Hubbl Experience user.
 */
export async function getAuthorizedUser(authorization) {
  try {
    const accessToken = authorization?.match(/Bearer (.+)/)?.[1];

    // verify that the access token is legit.
    const decodedToken = await getDecodedToken(accessToken);

    // is this the system management token?
    if (decodedToken?.payload?.permissions?.includes('system')) {
      return AUTH_SYSTEM_USERNAME;
    }
    // test for valid auth0 user with active token
    const subjectFromToken = decodedToken?.payload?.sub;
    const userinfo = await fetchUserFromAuth0(accessToken);
    const subjectFromAuth0 = userinfo?.sub;
    if (!subjectFromAuth0) {
      throw new Error('Access token is expired');
    }
    // these should always be the same at this point.
    if (subjectFromToken !== subjectFromAuth0) {
      throw new Error('Username mismatch');
    }
    return userinfo;
  } catch (error) {
    console.error('getAuthorizedUser: ' + error.message);
    return '';
  }
}

async function getDecodedToken(accessToken) {
  const decoded = jwt.decode(accessToken, { complete: true });
  const kid = decoded?.header?.kid;
  if (!kid) {
    throw 'Invalid access token, unable to retrieve Key ID from header';
  }
  const jwksClient = jwks({
    cache: true,
    jwksUri: `https://${Config.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });
  const key = await jwksClient.getSigningKey(kid);
  const signingKey = key.getPublicKey();
  return jwt.verify(accessToken, signingKey, {
    audience: Config.AUTH0_AUDIENCE,
    algorithms: ['RS256'],
    complete: true,
  });
}

export async function fetchUserFromAuth0(accessToken) {
  try {
    const userinfo = await fetch(`https://${Config.AUTH0_DOMAIN}/userinfo`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return userinfo.json();
  } catch (error) {
    console.error('fetchUserFromAuth0: ', error.message);
    return null;
  }
}

export async function getManagementTokenForHubbl() {
  let token = '';
  const opts = { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } };
  const body = JSON.stringify({
    client_id: Config.AUTH0_CLIENT_ID,
    client_secret: Config.AUTH0_CLIENT_SECRET,
    audience: Config.AUTH0_AUDIENCE,
    grant_type: 'client_credentials',
  });
  try {
    // const res = await axios.post(TOKEN_RESOURCE, body, opts);
    const res = await fetch(TOKEN_RESOURCE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
    });
    token = res?.data?.access_token || '';
  } catch (error) {
    console.error('getManagementTokenForHubbl: ', error.message);
  }
  return token;
}
