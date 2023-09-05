import prisma from '@database/client';
import { Prisma, Footy } from '@prisma/client';

class FootyRepository {
  async create(data: Prisma.FootyCreateInput): Promise<Footy> {
    const footy = await prisma.footy.create({ data });
    return footy;
  }

  async findByUsername(id: string): Promise<Footy | null> {
    const footy = await prisma.footy.findUnique({ where: { id } });
    return footy;
  }

  async findById(id: string): Promise<Footy | null> {
    const footy = await prisma.footy.findUnique({ where: { id } });
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

  async findAll(): Promise<Footy[]> {
    const footys = await prisma.footy.findMany();
    return footys;
  }

}

export default new FootyRepository();
