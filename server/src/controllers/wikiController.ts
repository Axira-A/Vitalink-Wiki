import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: { 
        author: { select: { name: true } },
        category: true,
        tags: true
      }
    });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article' });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  const { title, content, slug, categoryId, tags } = req.body;
  // @ts-ignore
  const userId = req.user.id;

  try {
    // Handle tags creation/connection
    const tagConnect = tags ? tags.map((name: string) => ({
      where: { name },
      create: { name }
    })) : [];

    const article = await prisma.article.create({
      data: {
        title,
        content,
        slug,
        authorId: userId,
        categoryId: categoryId ? parseInt(categoryId) : null,
        tags: {
          connectOrCreate: tagConnect
        }
      }
    });
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating article' });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { content, title, categoryId, tags } = req.body;
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

    const tagConnect = tags ? tags.map((name: string) => ({
      where: { name },
      create: { name }
    })) : [];

    const updatedArticle = await prisma.article.update({
      where: { slug },
      data: { 
        content,
        title: title || article.title,
        categoryId: categoryId ? parseInt(categoryId) : article.categoryId,
        tags: {
          connectOrCreate: tagConnect
        },
        draftContent: null // Clear draft on publish
      }
    });

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article' });
  }
};

export const saveDraft = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { content } = req.body;
  
  try {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (article) {
       await prisma.article.update({
        where: { slug },
        data: { draftContent: content }
      });
      return res.json({ message: 'Draft saved' });
    }
    // If article doesn't exist, we might want to store it elsewhere or require creation first.
    // For now, assume draft only for existing articles or create a temp one.
    // Simplified: Draft saving only works if article stub exists.
    res.status(404).json({ message: 'Article must be created to save draft' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving draft' });
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

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};
