// import { Client } from 'pg';
import { getAuthorizedUser } from '@/service/auth0';
import { ApiHandler } from 'sst/node/api';
import { Config } from 'sst/node/config';
/*
async function getPGClient() {
  const client = new Client({
    host: Config.PG_HOST,
    user: Config.PG_USER,
    password: Config.PG_PASS,
    database: Config.PG_DB,
    port: Config.PG_PORT,
  });
  await client.connect();
  return client;
}
 */
export const handler = ApiHandler(async evt => {
  const { headers } = evt;

  // TODO : figure out the best place to handle this authorization, such as the API config.
  // const user = await getAuthorizedUser(headers?.authorization);
  // console.log('authorized user: ', user);
  /*
  const ownerId = 45; // user?.sub;
  const nofMonths = 12;
  const client = await getPGClient();
  const result = await client.query(`
    SELECT
      m."connectionId" "orgId",
      s.id "scanId",
      s."endDate" "scanDate",
      d."healthScore" "healthScore",
      d."complexityScore" "complexityScore",
      d."recommendationCount" "totalRecommendations",
      d."highSeverityRecommendationCount" "highSeverityRecommendations"
    FROM scans s
    JOIN metadata m ON m.id = s."metadataId"
    JOIN "scanDigests" d ON d."scanId" = s.id
    WHERE s."endDate" >= CURRENT_DATE - INTERVAL '${nofMonths} months'
    AND m."ownerId" = ${ownerId}
    ORDER BY m."connectionId" DESC, s."endDate" ASC
  `);
  const data = JSON.stringify(result.rows); */
  const data = { fake: 'data' };

  return { statusCode: 200, body: data };
});
