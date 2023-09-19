import prisma from '@database/client';
import { Prisma, Footy } from '@prisma/client';

class FootyRepository {
  async create(data: Prisma.FootyCreateInput): Promise<Footy> {
    const footy = await prisma.footy.create({ data });
    return footy;
  }

  async findByUsername(username: string): Promise<Footy | null> {
    const footy = await prisma.footy.findUnique({
      where: { username },
      include: {
        footy_event: true,
        players: true,
      },
    });

    return footy;
  }

  async findByEmail(email: string): Promise<Footy | null> {
    const footy = await prisma.footy.findUnique({ where: { email } });
    return footy;
  }

  async findById(id: string): Promise<Footy | null> {
    const footy = await prisma.footy.findUnique({
      where: { id },
      include: {
        footy_event: true,
        players: true,
      },
    });

    return footy;
  }

  async update(id: string, data: Prisma.FootyUpdateInput): Promise<Footy> {
    const footy = await prisma.footy.update({ where: { id }, data });

    return footy;
  }

  async delete(id: string): Promise<Footy> {
    const footy = await prisma.footy.delete({ where: { id } });

    return footy;
  }

  async findAll({ name }: { name?: string }): Promise<Footy[]> {
    const query: Prisma.FootyFindManyArgs = {
      where: {},
      select: {
        id: true,
        created_at: true,
        updated_at: true,
        email: true,
        name: true,
        username: true,
        location: true,
      },
    };

    if (name !== undefined) {
      query.where = {
        username: {
          contains: name,
        },
      };
    }

    const footies = await prisma.footy.findMany(query);

    return footies;
  }
}

export default new FootyRepository();
