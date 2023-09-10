import prisma from '@database/client';
import { Prisma, Player } from '@prisma/client';

class PlayerRepository {
  async create (data: Prisma.PlayerCreateInput): Promise<Player> {
    const player = await prisma.player.create({ data });
    return player;
  }

  async findById(id: string): Promise<Player | null> {
    const player = await prisma.player.findUnique({where: { id }});
    return player;
  }

  async update(id: string, data: Prisma.PlayerUpdateInput): Promise<Player> {
    const player = await prisma.player.update({ where: { id }, data });
    return player;
  }

  async delete(id: string): Promise<Player> {
    const player = await prisma.player.delete({ where: { id }});
    return player;
  }

  async findAllByFooty(): Promise<Player[]> {
    const players = await prisma.player.findMany();
    return players;
  }

  async findAllByEvent(eventId: string): Promise<Player[]> {
    const players = await prisma.player.findMany({where: {
      playerFootyEvent: {
        every: {
          footy_event_id: eventId,
        }
      }
    }})
    return players
  }

}

export default new PlayerRepository();