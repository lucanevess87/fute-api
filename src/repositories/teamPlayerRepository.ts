import prisma from '@database/client';
import { Player, Team, TeamPlayer } from '@prisma/client';

class TeamPlayerRepository {
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
