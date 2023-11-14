const { adminPermission } = require('../src/utils/auth');

describe('adminPermission', () => {
  let req, res, next;

  beforeEach(() => {
    req = { adminPermission: 0 };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return status 401 and error message if admin permission is 0', () => {
    adminPermission(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No permission' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next middleware if admin permission is 1', () => {
    req.adminPermission = 1;
    adminPermission(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});