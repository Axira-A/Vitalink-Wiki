import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } }
    });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article' });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  const { title, content, slug } = req.body;
  // @ts-ignore
  const userId = req.user.id;

  try {
    const article = await prisma.article.create({
      data: {
        title,
        content,
        slug,
        authorId: userId
      }
    });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article' });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { content } = req.body;
  // @ts-ignore
  const userId = req.user.id;

  try {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (!article) return res.status(404).json({ message: 'Article not found' });

    // Create history entry
    await prisma.history.create({
      data: {
        content: article.content,
        articleId: article.id,
        editorId: userId
      }
    });

    const updatedArticle = await prisma.article.update({
      where: { slug },
      data: { content }
    });

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article' });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        history: {
          include: { editor: { select: { name: true } } },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article.history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history' });
  }
};
