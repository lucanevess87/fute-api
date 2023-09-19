import prisma from '@database/client';
import { Prisma, Player, Team, TeamPlayer } from '@prisma/client';

class TeamPlayerRepository {
  async create(data: Prisma.TeamPlayerCreateInput): Promise<TeamPlayer> {
    const teamPlayer = await prisma.teamPlayer.create({ data });

    return teamPlayer;
  }

  async findById(id: string): Promise<TeamPlayer | null> {
    const teamPlayer = await prisma.teamPlayer.findUnique({ where: { id } });

    return teamPlayer;
  }

  async update(
    id: string,
    data: Prisma.TeamPlayerUpdateInput,
  ): Promise<TeamPlayer> {
    const teamPlayer = await prisma.teamPlayer.update({ where: { id }, data });

    return teamPlayer;
  }

  async delete(id: string): Promise<TeamPlayer> {
    const teamPlayer = await prisma.teamPlayer.delete({ where: { id } });

    return teamPlayer;
  }

  async findAllByFooty(footyId: string) {
    const teamPlayers = await prisma.player.findMany({
      where: { footy_id: footyId },
    });

    return teamPlayers;
  }

  async findByFootyId(
    footyId: string,
  ): Promise<(TeamPlayer & { player: Player })[]> {
    const teamPlayers = await prisma.teamPlayer.findMany({
      where: {
        team: {
          footyEvent: {
            footy_id: footyId,
          },
        },
      },
      include: {
        player: true,
      },
    });

    return teamPlayers;
  }

  async findByFootyEventId(
    footyEventId: string,
  ): Promise<(TeamPlayer & { player: Player; team: Team })[]> {
    const teamPlayers = await prisma.teamPlayer.findMany({
      where: {
        team: {
          footyEventId,
        },
      },
      include: {
        player: true,
        team: true,
      },
    });

    return teamPlayers;
  }
}

export default new TeamPlayerRepository();
