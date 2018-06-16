const createToken = require('./create-token');
const getDb = require('./get-db');

module.exports = async ({
  ipAddress,
  name,
  roles,
  userAgent,
  userId
}) => {
  const {id, token, tokenHash, tokenHashAlgorithm} = await createToken();
  const db = await getDb();
  const [userToken] = await db('userTokens')
    .insert({
      id,
      name,
      tokenHash,
      tokenHashAlgorithm,
      roles: roles.reduce((roles, role) => roles | role, 0),
      userId,
      userAgent,
      ipAddress
    })
    .returning('*');
  return {...userToken, token};
};
