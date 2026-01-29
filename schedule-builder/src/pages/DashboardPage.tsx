import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-bold leading-7 text-gray-900 dark:text-white sm:text-4xl sm:truncate font-display uppercase tracking-wide">
                    Последние расписания
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Управляйте календарями еженедельных мероприятий и экспортируйте изображения в высоком разрешении.
                </p>
            </div>
            {/* Search */}
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <div className="relative rounded-md shadow-sm w-full max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-icons-outlined text-gray-400">search</span>
                    </div>
                    <input className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-surface-dark text-gray-900 dark:text-white py-2" id="search" name="search" placeholder="Поиск расписаний..." type="text"/>
                </div>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="group relative bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-lg border border-border-light dark:border-border-dark transition-all duration-300 overflow-hidden flex flex-col">
                 <div className="aspect-w-16 aspect-h-9 w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden h-48">
                    {/* Visual Mock of Schedule */}
                    <div className="absolute inset-0 p-4 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-500 bg-white dark:bg-[#1a1a20]">
                        <div className="w-full h-full border border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-2 opacity-80">
                            <div className="text-center">
                                <div className="text-primary font-display font-bold text-lg uppercase leading-none">Расписание</div>
                                <div className="text-primary font-display font-bold text-xl uppercase leading-none">25 - 30 Янв</div>
                            </div>
                            <div className="w-full h-px bg-primary opacity-30 my-1"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900"></div>
                                <div className="flex-1 space-y-1">
                                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-1/4"></div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Link to="/editor/1" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                            <span className="material-icons-outlined">edit</span>
                        </Link>
                    </div>
                 </div>
                 <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-display">Еженедельные события</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">25 янв — 30 янв 2024</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Черновик
                        </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-border-dark flex justify-between items-center">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Портрет и квадрат</div>
                        <Link to="/editor/1" className="text-primary hover:text-secondary text-sm font-medium transition-colors">Редактировать →</Link>
                    </div>
                 </div>
            </div>

            {/* Create New Card */}
            <Link to="/editor/new" className="group relative rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary bg-transparent flex flex-col items-center justify-center p-12 text-center transition-all cursor-pointer h-full min-h-[300px]">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-primary group-hover:text-white transition-colors text-gray-400 dark:text-gray-500">
                    <span className="material-icons-outlined text-2xl">add</span>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Создать новое расписание</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Начать с нуля или использовать шаблон.</p>
            </Link>
        </div>

        {/* Speakers Section (simplified) */}
         <div className="mt-12">
            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-6 uppercase tracking-wide border-l-4 border-primary pl-3">
                Частые спикеры
            </h3>
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <div className="flex flex-col items-center text-center space-y-2 group cursor-pointer">
                        <div className="relative">
                            <img alt="Speaker" className="w-16 h-16 rounded-full object-cover border-2 border-transparent group-hover:border-primary transition-all" src="https://ui-avatars.com/api/?name=Sarah+Katz&background=random"/>
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-surface-dark rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">Sarah Katz</span>
                         <span className="text-xs text-gray-500 dark:text-gray-400">Психология</span>
                    </div>
                     <div className="flex flex-col items-center text-center space-y-2 group cursor-pointer">
                        <div className="relative">
                            <img alt="Speaker" className="w-16 h-16 rounded-full object-cover border-2 border-transparent group-hover:border-primary transition-all" src="https://ui-avatars.com/api/?name=Rav+Levi&background=random"/>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">Rav Levi</span>
                         <span className="text-xs text-gray-500 dark:text-gray-400">Изучение Торы</span>
                    </div>
                     <div className="flex flex-col items-center text-center space-y-2 group cursor-pointer">
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary transition-all bg-gray-50 dark:bg-gray-800">
                        <span className="material-icons-outlined">add</span>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">Добавить</span>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
};
