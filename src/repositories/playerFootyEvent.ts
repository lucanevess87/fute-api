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
        const playerFootyEvent = await prisma.playerFootyEvent.update({
            where: { footy_event_id_player_id: { footy_event_id, player_id } },
            data: { victories: { increment: 1 } }, // Incrementa o número de vitórias
        });
        return playerFootyEvent;
    }
}


export default new PlayerFootyEventRepository();
