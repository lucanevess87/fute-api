import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { PlayerRepository } from '../repositories';
import { UpdateUser } from '../DTOs';

 class PlayerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body;

        const existsPlayer = await PlayerRepository.findById(
            userData.id,
        );

        if (existsPlayer) {
          retur next({
            status: 400,
            message: 'This player is already registred',
            });
        }
    }
  }
 }