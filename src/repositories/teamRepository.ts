import prisma from '@database/client';
import { Prisma, Team } from '@prisma/client';

class TeamRepository {
  async create(data: Prisma.TeamCreateInput): Promise<Team> {
    const team = await prisma.team.create({ data });
    return team;
  }

  async findById(id: string): Promise<Team | null> {
    const team = await prisma.team.findUnique({ where: { id } });
    return team;
  }

  async update(id: string, data: Prisma.TeamUpdateInput): Promise<Team> {
    const team = await prisma.team.update({ where: { id }, data });
    return team;
  }

  async delete(id: string): Promise<Team> {
    const team = await prisma.team.delete({ where: { id } });
    return team;
  }

  async findAll(eventId: string): Promise<Team[]> {
    const teams = await prisma.team.findMany({where: { footy_event_id: eventId }});
    return teams;
  }

}

export default new TeamRepository();