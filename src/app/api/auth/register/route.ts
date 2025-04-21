import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, subjects, experience, education } = body;

    // Проверка обязательных полей
    if (!name || !email || !password || !subjects) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Проверка существования email
    const existingTeacher = await prisma.teacher.findUnique({
      where: { email },
    });

    if (existingTeacher) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Генерация уникального кода
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Создание преподавателя
    const teacher = await prisma.teacher.create({
      data: {
        name,
        email,
        password: hashedPassword,
        code,
        subjects,
        experience,
        education,
      },
    });

    return NextResponse.json(
      { 
        message: 'Регистрация успешна',
        teacher: {
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          code: teacher.code,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 