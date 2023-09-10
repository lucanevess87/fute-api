import prisma from '@database/client';
import { Prisma, FootyEvent } from '@prisma/client';
import { FootyEventResponse } from 'src/types';

class FootyEventRepository {
    async create(data: Prisma.FootyEventCreateInput): Promise<FootyEvent> {
        const event = await prisma.footyEvent.create({ data });
        return event;
    }

    async findById(id: string): Promise<FootyEventResponse | null> {
        const event = await prisma.footyEvent.findUnique({ where: { id }, include: {
            playerFootyEvent: {
            select: {
                    team: true,
                    player: true,
                    assists: true,
                    goals: true,
                    
                }
            }
        }
        });

        if (!event) {
            return null; 
        }

        return event;
    }

    async update(id: string, data: Prisma.FootyEventUpdateInput): Promise<FootyEvent> {
        const event = await prisma.footyEvent.update({ where: { id }, data });
        return event;
    }

    async delete(id: string): Promise<FootyEvent> {
        const event = await prisma.footyEvent.delete({ where: { id } });
        return event;
    }

    async findAll(footyId: string): Promise<FootyEvent[]> {
        const events = await prisma.footyEvent.findMany({where: {footy_id: footyId}});
        return events;
    }
}

export default new FootyEventRepository();
