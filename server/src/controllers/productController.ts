import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.products.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        })
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao recuperar produtos'});
    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, rating, stockQuantity } = req.body;
        const product = await prisma.products.create({
            data: {
                productId: v4(),
                name,
                price,
                rating,
                stockQuantity
            },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto', error });
    }
}