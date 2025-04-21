'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Создание страницы',
    description: 'Преподаватель создаёт страницу и размещает материалы',
    icon: '📝',
  },
  {
    title: 'Получение кода',
    description: 'Преподаватель получает персональный код',
    icon: '🔑',
  },
  {
    title: 'Передача кода',
    description: 'Преподаватель передаёт код ученику или родителю',
    icon: '📤',
  },
  {
    title: 'Доступ к материалам',
    description: 'Ученик вводит код и получает доступ к материалам',
    icon: '📚',
  },
];

export function HowItWorks() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8">Как это работает</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">1. Регистрация</h3>
          <p>Преподаватель создает свой профиль на платформе</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">2. Создание материалов</h3>
          <p>Загружайте учебные материалы и создавайте задания</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">3. Обучение</h3>
          <p>Ученики получают доступ по коду от преподавателя</p>
        </div>
      </div>
    </div>
  );
} 