import prisma from '@database/client';
import { Prisma, PlayerFootyEvent } from '@prisma/client';

class PlayerFootyEventRepository {
    async create(data: Prisma.PlayerFootyEventCreateInput): Promise<PlayerFootyEvent> {
        const playerFootyEvent = await prisma.playerFootyEvent.create({ data });
        return playerFootyEvent;
    }

    async findById(footy_event_id: string, player_id: string): Promise<PlayerFootyEvent | null> {
        const playerFootyEvent = await prisma.playerFootyEvent.findUnique({ where: { footy_event_id_player_id: { footy_event_id, player_id } } });
        return playerFootyEvent;
    }

    async update(footy_event_id: string, player_id: string, data: Prisma.PlayerFootyEventUpdateInput): Promise<PlayerFootyEvent> {
        const playerFootyEvent = await prisma.playerFootyEvent.update({
            where: { footy_event_id_player_id: { footy_event_id, player_id } },
            data
        });
        return playerFootyEvent;
    }

    async delete(footy_event_id: string, player_id: string): Promise<PlayerFootyEvent> {
        const playerFootyEvent = await prisma.playerFootyEvent.delete({
            where: { footy_event_id_player_id: { footy_event_id, player_id } }
        });
        return playerFootyEvent;
    }

    async findAll(): Promise<PlayerFootyEvent[]> {
        const playerFootyEvents = await prisma.playerFootyEvent.findMany();
        return playerFootyEvents;
    }

    async addGoals(footy_event_id: string, player_id: string, goals: number): Promise<PlayerFootyEvent> {
        const playerFootyEvent = await prisma.playerFootyEvent.update({
            where: { footy_event_id_player_id: { footy_event_id, player_id } },
            data: { goals: { increment: goals } }, // Incrementa o número de gols
        });
        return playerFootyEvent;
    }

    async addAssists(footy_event_id: string, player_id: string, assists: number): Promise<PlayerFootyEvent> {
        const playerFootyEvent = await prisma.playerFootyEvent.update({
            where: { footy_event_id_player_id: { footy_event_id, player_id } },
            data: { assists: { increment: assists } }, // Incrementa o número de assistências
        });
        return playerFootyEvent;
    }

    async addVictory(footy_event_id: string, player_id: string, team_id: string): Promise<PlayerFootyEvent> {
        // Encontre o jogador correspondente pelo player_id e o evento de pelada pelo footy_event_id
        const playerFootyEvent = await prisma.playerFootyEvent.findUnique({
            where: { footy_event_id_player_id: { footy_event_id, player_id } },
            include: {
                player: true,
                footyEvent: true,
            },
        });

        if (!playerFootyEvent) {
            throw new Error('PlayerFootyEvent não encontrado');
        }

        // Determine a qual time o jogador pertence com base no team_id
        const playerTeam = await prisma.team.findUnique({
            where: { id: team_id },
        });

        if (!playerTeam) {
            throw new Error('Time não encontrado');
        }

        // Incrementar as vitórias do jogador e do time
        const updatedPlayerFootyEvent = await prisma.playerFootyEvent.update({
            where: { footy_event_id_player_id: { footy_event_id, player_id } },
            data: {
                victories: (playerFootyEvent.victories || 0) + 1, // Incrementar as vitórias do jogador
                team: {
                    update: {
                        victories: (playerTeam.victories || 0) + 1, // Incrementar as vitórias do time
                    },
                },
            },
        });

        return updatedPlayerFootyEvent;
    }
}

export default new PlayerFootyEventRepository();
