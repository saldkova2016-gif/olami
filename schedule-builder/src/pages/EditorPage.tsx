import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Schedule, Day } from '../types';
import { DayEditor } from '../components/DayEditor';

// Mock initial data
const initialSchedule: Schedule = {
  id: '1',
  title: 'РАСПИСАНИЕ С 25 ПО 30 ЯНВАРЯ',
  dateRange: '25.01 - 30.01',
  theme: 'classic',
  days: [
    {
      id: 'd1',
      date: '25.01',
      title: 'Воскресенье 25.01',
      layoutMode: 'list',
      lessons: [
        {
          id: 'l1',
          time: '12:00',
          title: '10 способов приблизиться к Творцу',
          lecturers: [{ id: 'lec1', name: 'Сара Кац', photoUrl: 'https://ui-avatars.com/api/?name=Sarah+Katz&background=random', role: 'Speaker' }],
          tags: [],
          column: null
        }
      ]
    },
    {
        id: 'd2',
        date: '27.01',
        title: 'ВТОРНИК 27.01',
        layoutMode: 'columns',
        lessons: [
            {
                id: 'l2',
                time: '19:00',
                title: 'Кафе мидраш',
                lecturers: [{ id: 'lec2', name: 'Speaker 1', photoUrl: 'https://ui-avatars.com/api/?name=S+1&background=random', role: 'Speaker' }],
                tags: [],
                column: 'left'
            },
            {
                id: 'l3',
                time: '19:00',
                title: 'Бейт Мидраш',
                lecturers: [
                    { id: 'lec3', name: 'Speaker 2', photoUrl: 'https://ui-avatars.com/api/?name=S+2&background=random', role: 'Speaker' },
                    { id: 'lec4', name: 'Speaker 3', photoUrl: 'https://ui-avatars.com/api/?name=S+3&background=random', role: 'Speaker' }
                ],
                tags: [],
                column: 'right'
            }
        ]
      }
  ]
};

export const EditorPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState<Schedule>(() => {
      const saved = localStorage.getItem(`schedule-${id || 'new'}`);
      return saved ? JSON.parse(saved) : initialSchedule;
  });

  useEffect(() => {
      localStorage.setItem(`schedule-${id || 'new'}`, JSON.stringify(schedule));
  }, [schedule, id]);

  const handleDayUpdate = (updatedDay: Day) => {
    setSchedule(prev => ({
      ...prev,
      days: prev.days.map(d => d.id === updatedDay.id ? updatedDay : d)
    }));
  };

  const handleAddDay = () => {
      const newDay: Day = {
          id: Date.now().toString(),
          date: '',
          title: 'НОВЫЙ ДЕНЬ',
          layoutMode: 'list',
          lessons: []
      };
      setSchedule(prev => ({ ...prev, days: [...prev.days, newDay] }));
  };

  return (
    <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Sidebar Steps */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
                 <nav aria-label="Progress">
                    <ol className="overflow-hidden">
                        <li className="relative pb-10">
                            <div className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-primary"></div>
                            <a href="#" className="relative flex items-start group">
                                <span className="h-9 flex items-center">
                                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-primary rounded-full">
                                        <span className="material-icons-outlined text-white text-sm">check</span>
                                    </span>
                                </span>
                                <span className="ml-4 min-w-0 flex flex-col">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-primary">Шаг 1</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Основная информация</span>
                                </span>
                            </a>
                        </li>
                         <li className="relative pb-10">
                            <div className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                            <a href="#" className="relative flex items-start group" aria-current="step">
                                <span className="h-9 flex items-center">
                                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-surface-light dark:bg-surface-dark border-2 border-primary rounded-full">
                                        <span className="h-2.5 w-2.5 bg-primary rounded-full"></span>
                                    </span>
                                </span>
                                <span className="ml-4 min-w-0 flex flex-col">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-primary">Шаг 2</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Ввод событий</span>
                                </span>
                            </a>
                        </li>
                        <li className="relative">
                            <a href="#" className="relative flex items-start group">
                                <span className="h-9 flex items-center">
                                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-surface-light dark:bg-surface-dark border-2 border-gray-300 dark:border-gray-600 rounded-full">
                                        <span className="h-2.5 w-2.5 bg-transparent rounded-full"></span>
                                    </span>
                                </span>
                                <span className="ml-4 min-w-0 flex flex-col">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">Шаг 3</span>
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Предпросмотр</span>
                                </span>
                            </a>
                        </li>
                    </ol>
                 </nav>
            </div>
        </aside>

        <main className="flex-1">
            <div className="bg-surface-light dark:bg-surface-dark shadow-lg rounded-xl overflow-hidden border border-border-light dark:border-border-dark">
                <div className="px-6 py-5 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <div>
                        <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Детали расписания</h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Вводите события день за днем.</p>
                    </div>
                     <div className="flex gap-2">
                        <button className="inline-flex items-center px-3 py-2 border border-border-light dark:border-border-dark shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" type="button">
                            Сохранить черновик
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-8">
                    {/* Header Inputs */}
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 pb-6 border-b border-border-light dark:border-border-dark">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Заголовок</label>
                            <input
                                type="text"
                                value={schedule.title}
                                onChange={(e) => setSchedule({...schedule, title: e.target.value})}
                                className="mt-1 flex-1 focus:ring-primary focus:border-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white p-2 border"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Диапазон дат</label>
                            <input
                                type="text"
                                value={schedule.dateRange}
                                onChange={(e) => setSchedule({...schedule, dateRange: e.target.value})}
                                className="mt-1 flex-1 focus:ring-primary focus:border-primary block w-full min-w-0 rounded-md sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white p-2 border"
                            />
                        </div>
                    </div>

                    {/* Days List */}
                    {schedule.days.map(day => (
                        <DayEditor key={day.id} day={day} onUpdate={handleDayUpdate} />
                    ))}

                    <div className="flex justify-center pt-4">
                        <button onClick={handleAddDay} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors" type="button">
                            <span className="material-icons-outlined mr-2">add</span> Добавить новый день
                        </button>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-border-light dark:border-border-dark flex justify-between items-center">
                    <button onClick={() => navigate('/')} className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none" type="button">
                        Назад
                    </button>
                    <button onClick={() => navigate(`/preview/${id || 'new'}`)} className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors" type="button">
                        Далее: Предпросмотр
                        <span className="material-icons-outlined ml-2 text-sm">arrow_forward</span>
                    </button>
                </div>
            </div>
        </main>
    </div>
  );
};
