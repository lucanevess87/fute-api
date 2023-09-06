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
}

export default new PlayerFootyEventRepository();
