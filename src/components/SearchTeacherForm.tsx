'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchTeacherFormProps {
  onError: (error: string | null) => void;
}

export function SearchTeacherForm({ onError }: SearchTeacherFormProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      onError('Пожалуйста, введите код');
      return;
    }

    setIsLoading(true);
    onError(null);

    try {
      const response = await fetch(`/api/teacher/by-code?code=${code}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Произошла ошибка');
      }

      // Перенаправление на страницу преподавателя
      window.location.href = `/teacher/${data.id}`;
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Введите код преподавателя"
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Поиск...' : 'Найти'}
        </motion.button>
      </div>
    </form>
  );
} 