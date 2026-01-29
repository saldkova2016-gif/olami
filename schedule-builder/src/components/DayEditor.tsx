import React from 'react';
import type { Day, Lesson } from '../types';
import { LessonCard } from './LessonCard';

interface DayEditorProps {
    day: Day;
    onUpdate: (day: Day) => void;
}

export const DayEditor: React.FC<DayEditorProps> = ({ day, onUpdate }) => {

    const addLesson = (column: 'left' | 'right' | null) => {
        const newLesson: Lesson = {
            id: Date.now().toString() + Math.random().toString(),
            time: '19:00',
            title: 'Новый урок',
            lecturers: [],
            tags: [],
            column: column
        };
        onUpdate({ ...day, lessons: [...day.lessons, newLesson] });
    };

    const updateLesson = (updatedLesson: Lesson) => {
        onUpdate({
            ...day,
            lessons: day.lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l)
        });
    };

    const deleteLesson = (id: string) => {
         onUpdate({ ...day, lessons: day.lessons.filter(l => l.id !== id) });
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-4 border border-border-light dark:border-border-dark relative group transition hover:shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-md">
                        <span className="material-icons-outlined text-primary">calendar_today</span>
                    </div>
                    <input
                        value={day.title}
                        onChange={(e) => onUpdate({...day, title: e.target.value})}
                        className="text-lg font-bold text-primary uppercase bg-transparent border-b border-transparent hover:border-primary/30 focus:border-primary focus:ring-0 p-0 w-full sm:w-auto transition-colors"
                        placeholder="ЗАГОЛОВОК ДНЯ"
                    />
                </div>
                <div className="flex items-center justify-end w-full sm:w-auto">
                    <span className="mr-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden sm:inline">Режим:</span>
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-1 flex border border-gray-200 dark:border-gray-600">
                        <button
                            onClick={() => onUpdate({ ...day, layoutMode: 'list' })}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${day.layoutMode === 'list' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                        >
                            Списком
                        </button>
                        <button
                             onClick={() => onUpdate({ ...day, layoutMode: 'columns' })}
                             className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${day.layoutMode === 'columns' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                        >
                            В 2 колонки
                        </button>
                    </div>
                </div>
            </div>

            {day.layoutMode === 'list' ? (
                <div className="space-y-4">
                    {day.lessons.map(lesson => (
                        <LessonCard key={lesson.id} lesson={lesson} onUpdate={updateLesson} onDelete={() => deleteLesson(lesson.id)} />
                    ))}
                    <button onClick={() => addLesson(null)} className="relative block w-full border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg p-4 text-center hover:border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition group" type="button">
                        <span className="material-icons-outlined mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 group-hover:text-primary">add_circle_outline</span>
                        <span className="mt-1 block text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary">Добавить событие</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div className="space-y-4 border-r-0 lg:border-r border-dashed border-gray-300 dark:border-gray-600 pr-0 lg:pr-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 text-center">Левая колонка</h4>
                        {day.lessons.filter(l => l.column === 'left').map(lesson => (
                            <LessonCard key={lesson.id} lesson={lesson} onUpdate={updateLesson} onDelete={() => deleteLesson(lesson.id)} compact />
                        ))}
                         <button onClick={() => addLesson('left')} className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-500 rounded text-xs text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">+ Добавить в левую</button>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-4 pl-0 lg:pl-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 text-center">Правая колонка</h4>
                        {day.lessons.filter(l => l.column === 'right').map(lesson => (
                             <LessonCard key={lesson.id} lesson={lesson} onUpdate={updateLesson} onDelete={() => deleteLesson(lesson.id)} compact />
                        ))}
                        <button onClick={() => addLesson('right')} className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-500 rounded text-xs text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">+ Добавить в правую</button>
                    </div>
                </div>
            )}
        </div>
    );
};
