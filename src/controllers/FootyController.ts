import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { FootyRepository } from '../repositories';
import { UpdateUser } from '../DTOs';

class FootyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;

      const existsUserWithEmail = await FootyRepository.findByEmail(
        userData.email,
      );

      if (existsUserWithEmail) {
        return next({
          status: 400,
          message: 'This email is already registred',
        });
      }

      const userDataWithHashedPassword = {
        ...userData,
        password: await hash(userData.password, 6),
      };

      const user = await FootyRepository.create(userDataWithHashedPassword);

      res.locals = {
        status: 201,
        message: 'User created',
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const footies = await FootyRepository.findAll();

      res.locals = {
        status: 200,
        data: footies,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await FootyRepository.findById(userId);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userData = UpdateUser.parse(req.body);

      const user = await FootyRepository.update(userId, userData);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        data: user,
        message: 'User updated',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await FootyRepository.delete(userId);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        message: 'User deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new FootyController();
