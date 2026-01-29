import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { Schedule } from '../types';
import { ScheduleRenderer } from '../components/ScheduleRenderer';

export const PreviewPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [format, setFormat] = useState<'square' | 'stories' | 'landscape'>('stories');
    const rendererRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(`schedule-${id || 'new'}`);
        if (saved) {
            setSchedule(JSON.parse(saved));
        }
    }, [id]);

    const handleDownloadPNG = async () => {
        if (!rendererRef.current) return;
        setIsGenerating(true);
        try {
            // Wait for images to load if needed, or use html2canvas logic
            const canvas = await html2canvas(rendererRef.current, {
                scale: 1,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });
            const link = document.createElement('a');
            link.download = `schedule-${format}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (e) {
            console.error(e);
            alert('Error generating image');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!rendererRef.current) return;
        setIsGenerating(true);
        try {
             const canvas = await html2canvas(rendererRef.current, {
                scale: 1,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: format === 'landscape' ? 'l' : 'p',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`schedule-${format}.pdf`);
        } catch (e) {
             console.error(e);
             alert('Error generating PDF');
        } finally {
            setIsGenerating(false);
        }
    };

    if (!schedule) return <div>Loading...</div>;

    const previewWidth = 500;
    const originalWidth = format === 'landscape' ? 1920 : 1080;
    const originalHeight = format === 'landscape' ? 1080 : (format === 'stories' ? 1920 : 1080);
    const scale = previewWidth / originalWidth;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate font-display uppercase tracking-wide">
                        Экспорт расписания
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Проверьте созданное расписание и скачайте его в удобном формате.
                    </p>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4 gap-3">
                    <button onClick={() => navigate(`/editor/${id || 'new'}`)} className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-card-dark hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Назад к правкам
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                {/* Preview Column */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                     <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col min-h-[600px] items-center justify-center p-8 bg-gray-100 dark:bg-gray-900 relative overflow-auto">
                        {/* Renderer Container */}
                        <div style={{ width: previewWidth, height: previewWidth * (originalHeight / originalWidth) }} className="relative shadow-2xl bg-white flex-shrink-0">
                             <div className="absolute top-0 left-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
                                <ScheduleRenderer ref={rendererRef} schedule={schedule} format={format} />
                             </div>
                        </div>
                     </div>
                </div>

                {/* Sidebar Controls */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-icons text-primary">aspect_ratio</span>
                            Выбор формата
                        </h3>
                        <div className="space-y-4">
                            <FormatOption
                                label="Формат сторис (9:16)"
                                desc="Для Instagram и Telegram"
                                active={format === 'stories'}
                                onClick={() => setFormat('stories')}
                                icon="crop_portrait"
                            />
                            <FormatOption
                                label="Квадратный формат (1:1)"
                                desc="Для ленты и сайта"
                                active={format === 'square'}
                                onClick={() => setFormat('square')}
                                icon="crop_square"
                            />
                            <FormatOption
                                label="Горизонтальный (16:9)"
                                desc="Экран презентации"
                                active={format === 'landscape'}
                                onClick={() => setFormat('landscape')}
                                icon="crop_landscape"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                         <button
                            onClick={handleDownloadPDF}
                            disabled={isGenerating}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50"
                        >
                            <span className="material-icons">picture_as_pdf</span>
                            {isGenerating ? 'Создание...' : 'Скачать PDF'}
                        </button>
                        <button
                            onClick={handleDownloadPNG}
                            disabled={isGenerating}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50"
                        >
                            <span className="material-icons">image</span>
                            {isGenerating ? 'Создание...' : 'Скачать PNG'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormatOption = ({ label, desc, active, onClick, icon }: any) => (
    <div
        onClick={onClick}
        className={`relative rounded-lg border p-4 cursor-pointer transition-all ${active ? 'border-2 border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-card-dark hover:shadow-md'}`}
    >
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                <span className="material-icons text-gray-500">{icon}</span>
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
            </div>
            {active && <span className="material-icons text-primary">check_circle</span>}
        </div>
    </div>
);
