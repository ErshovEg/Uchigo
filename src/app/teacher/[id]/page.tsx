'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
}

export default function TeacherPage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(`/api/teacher/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Произошла ошибка');
        }

        setTeacher(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Произошла ошибка');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Преподаватель не найден</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{teacher.name}</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Информация</h2>
          <p className="mb-2"><span className="font-medium">Email:</span> {teacher.email}</p>
          <div className="mb-2">
            <span className="font-medium">Предметы:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {teacher.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 