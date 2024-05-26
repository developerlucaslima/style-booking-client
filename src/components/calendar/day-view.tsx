import { eachHourOfInterval, endOfDay, format, startOfDay } from 'date-fns'

type DayViewProps = {
  selectedDate: Date
}

type dateTimeFormatProps = {
  time: Date
  index: number
}

export const DayView = ({ selectedDate }: DayViewProps) => {
  const localTimeZoneAbbr = format(new Date(), 'z')
  const currentDay = format(selectedDate, 'EEE')

  const formatDateTime = ({ time, index }: dateTimeFormatProps) => (
    <time dateTime={format(time, 'yyyy-MM-dd')} className="-mt-3 select-none">
      {index !== 0 ? format(time, 'h:mm') : null}
    </time>
  )

  // TODO: Add functionality to handle with the correct establishment schedule
  const hours = eachHourOfInterval({
    start: startOfDay(selectedDate),
    end: endOfDay(selectedDate),
  })

  return (
    <div className="my-2 h-full flex-1 rounded border border-foreground/20 bg-muted">
      <div className="flex h-12 items-center border-b border-foreground/20">
        <div className="flex h-full w-32 items-center justify-center border-r border-foreground/20">
          {localTimeZoneAbbr}
        </div>
        <div className="flex h-full flex-1 flex-col px-6 py-3">
          <p>{currentDay}</p>
        </div>
      </div>
      <div className="max-h-full flex-1 overflow-y-scroll pb-32">
        {hours.map((time, index) => (
          <div className="flex h-12" key={index}>
            <div className="flex h-full w-32 items-start justify-center border-r border-foreground/20">
              {formatDateTime({ time, index })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
