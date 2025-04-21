import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password, subjects, experience, education } = body;

    // Проверка существующего пользователя
    const existingUser = await prisma.teacher.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const teacher = await prisma.teacher.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        subjects,
        experience,
        education,
        // Генерация уникального кода
        code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      },
    });

    // Удаляем пароль из ответа
    const { password: _, ...teacherWithoutPassword } = teacher;

    return NextResponse.json(teacherWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при регистрации' },
      { status: 500 }
    );
  }
} 