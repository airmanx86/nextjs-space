import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { logger } from '@/logger';
import { initializeDatabase } from '@/lib/database';
import { Category } from '@/entities/Category';

interface CategoryRequestPayload {
    id: number;
    name: string;
}

export async function GET() {
    const dataSource = await initializeDatabase();
    const categoryRepository = dataSource.getRepository(Category);
    const categories = await categoryRepository.find();
    return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
    const body: CategoryRequestPayload = await req.json(); // TODO add validation
    const { name } = body;

    if (!name) {
        return NextResponse.json({ message: 'Missing required name field' }, { status: 400 });
    }

    try {
        const dataSource = await initializeDatabase();
        const categoryRepository = dataSource.getRepository(Category);

        const existingCategory = await categoryRepository.findOne({
            where: [
                { name },
            ]
        });

        if (existingCategory) {
            return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
        }

        const category = categoryRepository.create({
            name
        });

        await categoryRepository.save(category);
        return NextResponse.json(category, { status: 201 });
    } catch (err: unknown) {
        const error = err as Error;
        logger.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}