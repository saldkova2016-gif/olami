import React from 'react';
import type { Lesson, Lecturer } from '../types';

interface LessonCardProps {
    lesson: Lesson;
    onUpdate: (lesson: Lesson) => void;
    onDelete: () => void;
    compact?: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onUpdate, onDelete }) => {

    const handleAddLecturer = () => {
        const name = window.prompt("Введите имя лектора:");
        if (!name) return;

        const newLec: Lecturer = {
            id: Date.now().toString(),
            name: name,
            photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
            role: 'Speaker'
        };
        onUpdate({ ...lesson, lecturers: [...lesson.lecturers, newLec] });
    };

    const removeLecturer = (id: string) => {
        onUpdate({ ...lesson, lecturers: lesson.lecturers.filter(l => l.id !== id) });
    };

    return (
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-sm flex flex-col gap-2">
             <div className="flex justify-between items-start gap-2">
                 <div className="flex-1 grid grid-cols-1 gap-2">
                     <div className="flex gap-2">
                         <div className="w-16">
                             <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">Время</label>
                             <input
                                value={lesson.time}
                                onChange={(e) => onUpdate({...lesson, time: e.target.value})}
                                className="block w-full text-xs border-gray-300 dark:border-gray-600 rounded-md p-1 bg-transparent border dark:text-white"
                             />
                         </div>
                         <div className="flex-1">
                             <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">Название</label>
                             <input
                                value={lesson.title}
                                onChange={(e) => onUpdate({...lesson, title: e.target.value})}
                                className="block w-full text-xs font-bold border-gray-300 dark:border-gray-600 rounded-md p-1 bg-transparent border dark:text-white"
                             />
                         </div>
                     </div>

                     {/* Lecturers */}
                     <div>
                        <div className="flex flex-wrap gap-2 items-center">
                            {lesson.lecturers.map(lec => (
                                <div key={lec.id} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full pr-2 border border-gray-200 dark:border-gray-600">
                                    <img src={lec.photoUrl} className="w-5 h-5 rounded-full" alt={lec.name} />
                                    <span className="text-[10px] dark:text-gray-200">{lec.name}</span>
                                    <button onClick={() => removeLecturer(lec.id)} className="text-gray-400 hover:text-red-500 text-[10px] ml-1">✕</button>
                                </div>
                            ))}
                            {lesson.lecturers.length < 4 && (
                                <button onClick={handleAddLecturer} className="text-primary text-[10px] hover:underline flex items-center gap-1">
                                    <span className="material-icons-outlined text-[12px]">add</span> Лектор
                                </button>
                            )}
                        </div>
                     </div>
                 </div>
                 <button onClick={onDelete} className="text-gray-400 hover:text-red-500 p-1"><span className="material-icons-outlined text-sm">delete</span></button>
             </div>
        </div>
    );
};
