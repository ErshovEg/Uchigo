'use client';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О платформе</h3>
            <p className="text-gray-300">
              UchiGO - платформа для преподавателей и учеников
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <p className="text-gray-300">Email: support@uchigo.ru</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Правовая информация</h3>
            <p className="text-gray-300">© 2024 UchiGO. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 