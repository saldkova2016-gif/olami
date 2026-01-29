import { forwardRef } from 'react';
import type { Schedule, Lesson } from '../types';

interface ScheduleRendererProps {
  schedule: Schedule;
  format: 'square' | 'stories' | 'landscape';
}

export const ScheduleRenderer = forwardRef<HTMLDivElement, ScheduleRendererProps>(({ schedule, format }, ref) => {
  // Dimensions based on format (high resolution for export)
  const dimensions = {
    square: { w: 1080, h: 1080 },
    stories: { w: 1080, h: 1920 },
    landscape: { w: 1920, h: 1080 }
  };
  const { w, h } = dimensions[format];

  // Base font size scaling could be handled via CSS or inline styles,
  // but Tailwind classes are relative (rem). We need to set a root font size on this container or use px classes.
  // For simplicity, we assume standard tailwind scaling works if the container is viewed at scale,
  // but for export we render at 1080px.
  // We might need to adjust text sizes if they look too small on 1080px canvas relative to screen.
  // The design reference uses classes like 'text-5xl', 'text-2xl'.
  // text-5xl is 3rem = 48px. On 1080px width, 48px is reasonable for headings.

  return (
    <div
      ref={ref}
      className="bg-white text-black overflow-hidden relative flex flex-col font-body"
      style={{
        width: w,
        height: h,
        flexShrink: 0
      }}
    >
      {/* Header */}
      <div className="text-center pt-12 pb-6 px-10">
         <h1 className="text-primary font-display font-bold text-6xl uppercase tracking-tighter leading-none mb-2 break-words">
            {schedule.title}
         </h1>
      </div>

      {/* Content */}
      <div className="flex-grow px-10 pb-10 flex flex-col gap-8">
        {schedule.days.map(day => (
            <div key={day.id}>
                <div className="border-b-4 border-primary mb-6">
                    <h2 className="text-primary font-display font-bold text-4xl uppercase tracking-wide">{day.title}</h2>
                </div>

                {day.layoutMode === 'list' ? (
                    <div className="flex flex-col gap-8">
                        {day.lessons.map(lesson => <RenderLesson key={lesson.id} lesson={lesson} />)}
                    </div>
                ) : (
                    <div className="flex gap-8 relative">
                        <div className="w-1/2 flex flex-col gap-8 border-r-2 border-dotted border-gray-300 pr-4">
                            {day.lessons.filter(l => l.column === 'left').map(lesson => <RenderLesson key={lesson.id} lesson={lesson} />)}
                        </div>
                        <div className="w-1/2 flex flex-col gap-8 pl-4">
                             {day.lessons.filter(l => l.column === 'right').map(lesson => <RenderLesson key={lesson.id} lesson={lesson} />)}
                        </div>
                    </div>
                )}
            </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-black text-white p-8 mt-auto">
         <div className="flex items-center justify-center mb-4">
             <div className="bg-primary text-white rounded-full px-8 py-3 font-bold text-2xl uppercase">
                 Регистрация: olami.moscow/afisha
             </div>
         </div>
         <div className="flex items-center justify-center text-center gap-4 mb-6">
             <span className="material-icons text-primary transform rotate-45 text-3xl">flight</span>
             <p className="text-xl text-gray-300">Грант на поездку за границу при<br/>посещаемости не менее 90% занятий</p>
             <span className="material-icons text-primary transform -rotate-45 text-3xl">flight</span>
         </div>
         <div className="flex items-center justify-between border-t border-gray-700 pt-4">
             <div className="flex items-center gap-2">
                 <span className="font-display font-bold text-3xl">OLAMI MOSCOW</span>
             </div>
             <div className="text-sm text-gray-400 text-right leading-tight">
                 Доп. информация по WhatsApp +7(963) 613-3-613<br/>
                 МЕСТНАЯ РЕЛИГИОЗНАЯ ОРГАНИЗАЦИЯ
             </div>
         </div>
      </div>
    </div>
  );
});

const RenderLesson = ({ lesson }: { lesson: Lesson }) => {
    return (
        <div className="flex gap-4 items-start w-full">
            {/* Avatar(s) */}
            <div className="flex-shrink-0">
                {lesson.lecturers.length === 0 ? (
                     <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-lime-400 flex items-center justify-center">
                        <span className="material-icons text-gray-400 text-3xl">person</span>
                     </div>
                ) : lesson.lecturers.length === 1 ? (
                     <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-lime-400">
                        <img src={lesson.lecturers[0].photoUrl} className="w-full h-full object-cover" alt="" crossOrigin="anonymous"/>
                     </div>
                ) : (
                    <div className="grid grid-cols-2 gap-1 w-20">
                        {lesson.lecturers.slice(0, 4).map(lec => (
                            <img key={lec.id} src={lec.photoUrl} className="w-9 h-9 rounded-full border-2 border-lime-400 object-cover aspect-square" alt="" crossOrigin="anonymous" />
                        ))}
                    </div>
                )}
            </div>

            {/* Text Info */}
            <div className="flex-grow min-w-0">
                 <div className="flex justify-between items-start">
                    <span className="font-bold text-black text-3xl leading-none">{lesson.time}</span>
                    {/* Simplified Tags */}
                    {lesson.tags.length > 0 && (
                        <span className="bg-accent-pink text-white text-xs px-2 py-0.5 rounded-full uppercase font-bold tracking-wide">
                            {lesson.tags[0].text}
                        </span>
                    )}
                 </div>
                 <p className="font-bold text-black leading-tight text-2xl mb-1 mt-1 break-words">{lesson.title}</p>
                 <p className="text-gray-600 text-xl">{lesson.lecturers.map(l => l.name).join(', ')}</p>
            </div>
        </div>
    )
}
