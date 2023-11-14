const userHandlers = require('../src/database/handlersDB/userHandlersDB');
const userControllers = require('../src/controllers/userControllers');

describe('users', () => {

  it('should return all users if they exist', async () => {
    
    userHandlers.getAllUsers = jest.fn().mockResolvedValue([{ id: 1, name: 'Alex' }, { id: 2, name: 'Bob' }]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userControllers.getAllUsersHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Alex' }, { id: 2, name: 'Bob' }]);
  });

  it('should return an error if no users are found', async () => {

    userHandlers.getAllUsers = jest.fn().mockResolvedValue([]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userControllers.getAllUsersHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No users found' });
  });

  it('should return an error if an internal server error occurs', async () => {
    userHandlers.getAllUsers = jest.fn().mockRejectedValue(new Error('Internal server error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userControllers.getAllUsersHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return a user by id if it exists', async () => {
    
    userHandlers.getUserById = jest.fn().mockResolvedValue({ id: 1, name: 'Alex' });

    const req = {
      params: {
        userId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userControllers.getUserByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Alex' });
  });

  it('should return an error if the user id does not exist', async () => {
    
    userHandlers.getUserById = jest.fn().mockResolvedValue(false);

    const req = {
      params: {
        userId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userControllers.getUserByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should return an error if an internal server error', async () => {
    
    userHandlers.getUserById = jest.fn().mockRejectedValue(new Error('Internal server error'));

    const req = {
      params: {
        userId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userControllers.getUserByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});