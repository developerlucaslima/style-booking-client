import { eachHourOfInterval, endOfDay, format, startOfDay } from 'date-fns'

import { cn } from '@/lib/utils'

type DayViewProps = {
  selectedDate: Date
}

export const DayView = ({ selectedDate }: DayViewProps) => {
  const currentDay = format(selectedDate, 'EEE')

  const hours = eachHourOfInterval({
    start: startOfDay(selectedDate),
    end: endOfDay(selectedDate),
  })

  return (
    <div className="my-2 h-full flex-1 rounded border border-gray-300 bg-white">
      <div className="flex h-24 items-center border-b border-gray-300">
        <div className="flex h-full w-32 items-center justify-center border-r border-gray-300">
          {format(new Date(), 'z')}
        </div>
        <div className={cn('flex h-full flex-1 flex-col px-6 py-3')}>
          <p>{currentDay}</p>
        </div>
      </div>
      <div className="flex h-10 items-center border-b border-gray-300">
        <div
          className={cn(
            'flex h-full w-32 items-center justify-center border-r border-gray-300 text-gray-600',
          )}
        >
          All Day
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="max-h-full flex-1 overflow-y-scroll pb-56">
        <div>
          {hours.map((time, idx) => (
            <div className="flex h-12" key={idx}>
              <div className="flex h-full w-32 items-start justify-center border-r border-gray-300 text-gray-600">
                <time
                  dateTime={format(time, 'yyyy-MM-dd')}
                  className="-mt-3 select-none"
                >
                  {idx === 0 ? '' : format(time, 'h:mm a')}
                </time>
              </div>
              <div
                className={cn(
                  'relative flex-1 border-gray-300',
                  idx !== 0 && 'border-t',
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
