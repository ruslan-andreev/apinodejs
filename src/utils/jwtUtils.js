function createJWTToken(payload) {
  
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const expiresIn = process.env.EXPIRES_IN;
  const secret = process.env.SECRET_KEY;

  const expirationTime = Math.floor((Date.now() / 1000) + expiresIn * 60);

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify({...payload, expirationTime}));
  
  const signature = encodedHeader + '.' + encodedPayload;

  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(signature);
  const encodedSignature = base64urlEncode(hmac.digest('base64'));

  const jwtToken = encodedHeader + '.' + encodedPayload + '.' + encodedSignature;
  
  return jwtToken;
}

function base64urlEncode(str) {
  let base64 = Buffer.from(str).toString('base64');
  base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return base64;
}

function verifyJWTToken(token) {

  const secret = process.env.SECRET_KEY;
  const parts = token.split('.');
  
  if (parts.length !== 3) {
    return false;
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;

  const signature = encodedHeader + '.' + encodedPayload;

  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(signature);

  const calculatedSignature = base64urlEncode(hmac.digest('base64'));

  if(calculatedSignature !== encodedSignature) {
    return false;
  }
  
  return { "valid": true, encodedPayload } 
}

module.exports = {
  createJWTToken,
  verifyJWTToken
}