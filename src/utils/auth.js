const { verifyJWTToken } = require('./jwtUtils');

function auth(req, res, next) {

  const authorizationToken = req.headers.authorization;
  
  if(!authorizationToken) {
    res.status(401).json({massage: "No authorization"})
  }

  const verifyed = verifyJWTToken(authorizationToken);
  
  if(!verifyed) {
    res.status(401).json({massage: "Wrong token"})
  }

  const {valid, encodedPayload} = verifyed;
  const payload = JSON.parse(base64urldecode(encodedPayload))
  let expirationTime = null;
  
  if(!payload.expirationTime) {
    res.status(401).json({massage: "Wrong exp time, please SignIn"})
  }

  expirationTime = payload.expirationTime;

  if(expirationTime < Math.floor(Date.now() / 1000)) {
    res.status(401).json({massage: "Wrong exp time, please SignIn"})
  }
  
  req.adminPermission = payload.adminPermission;
  next()
}

function adminPermission(req, res, next) {
  const admin = req.adminPermission;
  
  if(admin == 0) {
    res.status(401).json({ message: "No permission" });
  }

  if(admin == 1) {
    next();
  }
  
}

function base64urldecode(encodedPayload) {
  let base64 = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString();
}

module.exports = {
  auth,
  adminPermission
}