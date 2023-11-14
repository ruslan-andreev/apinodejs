const userHandlers = require('../database/handlersDB/userHandlersDB');
const jwtUtils = require('../utils/jwtUtils')

async function getAllUsersHandler(req, res) {
  
  try {
    const users = await userHandlers.getAllUsers();

    if (users && users.length) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: "No users found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserByIdHandler(req, res) {
  
  try {
    const user = await userHandlers.getUserById(req.params.userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function signUpHandler(req, res) {

  let { email, userName, password, isAdmin } = req.body;
  
  if(!email || !userName || !password || typeof isAdmin == 'undefined') {
    res.status(422).json({ message: "Wrong data information" });
    return;
  } else if (email.trim() === "" || userName.trim() === "" || password.trim() === "" || typeof isAdmin !== 'boolean') {
    res.status(422).json({ message: "Wrong data information" });
    return;
  }

  try {
    const user =  await userHandlers.getUserByName(userName);
  
    if (user) {
      res.status(401).json({ error: 'User already exists' });
    }

    if (!user) {
  
      const response = await userHandlers.addUser([email, userName, password, isAdmin]);
    
      if (response) {
        const payload = { userName: userName, adminPermission: isAdmin };
        const jwtToken = jwtUtils.createJWTToken(payload);

        res.status(201).json({ jwtToken, message: 'User successfully created.' });
      }
    } 
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  } 
}

async function signInHandler(req, res) {
  let { userName, password } = req.body;

  try {

    const user = await userHandlers.getUserByName(userName);
    
    if (!user) {
      res.status(404).json({ error: "Wrong user name" });
    }

    if (user.password !== password) {
      
      res.status(404).json({ error: "Invalid password" });
    }

    const payload = { userName: userName, adminPermission: user.isAdmin };
    const jwtToken = jwtUtils.createJWTToken(payload);
  
    res.status(201).json({ jwtToken, message: 'User signed in successfully.' });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }  

}

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  signUpHandler,
  signInHandler
}