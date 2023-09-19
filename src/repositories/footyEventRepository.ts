import prisma from '@database/client';
import { Prisma, FootyEvent } from '@prisma/client';

class FootyEventRepository {
  async create(data: Prisma.FootyEventCreateInput): Promise<FootyEvent> {
    const event = await prisma.footyEvent.create({ data });
    return event;
  }

  async findById(id: string): Promise<any> {
    const event = await prisma.footyEvent.findUnique({
      where: { id },
      include: {
        footy: true,
        teams: {
          include: {
            teamPlayer: {
              include: {
                player: true,
                team: true,
              },
            },
          },
        },
      },
    });

    return event;
  }

  async update(id: string, data: Prisma.FootyEventUpdateInput): Promise<any> {
    const event = await prisma.footyEvent.update({ where: { id }, data });
    return event;
  }

  async delete(id: string): Promise<FootyEvent> {
    const event = await prisma.footyEvent.delete({ where: { id } });
    return event;
  }

  async findAll(footyId: string): Promise<any> {
    const footyEvents = await prisma.footyEvent.findMany({
      where: { footy_id: footyId },
      include: {
        footy: true,
        teams: {
          include: {
            footyEvent: true,
            teamPlayer: {
              include: {
                player: true,
                team: true,
              },
            },
          },
        },
      },
    });

    return footyEvents;
  }
}

export default new FootyEventRepository();
