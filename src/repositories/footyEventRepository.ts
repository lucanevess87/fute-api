import prisma from '@database/client';
import { Prisma, FootyEvent } from '@prisma/client';

class FootyEventRepository {
    async create(data: Prisma.FootyEventCreateInput): Promise<FootyEvent> {
        const event = await prisma.footyEvent.create({ data });
        return event;
    }

    async findById(id: string): Promise<FootyEvent | null> {
        const event = await prisma.footyEvent.findUnique({ where: { id } });
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

    async findAll(): Promise<FootyEvent[]> {
        const events = await prisma.footyEvent.findMany();
        return events;
    }
}

export default new FootyEventRepository();

