'use client';

import { useState } from 'react';

interface SearchTeacherFormProps {
  onError: (error: string | null) => void;
}

export function SearchTeacherForm({ onError }: SearchTeacherFormProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      onError('Пожалуйста, введите код');
      return;
    }
    // Здесь будет логика поиска преподавателя
    onError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Введите код преподавателя"
          className="flex-1 p-3 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Найти
        </button>
      </div>
    </form>
  );
} 