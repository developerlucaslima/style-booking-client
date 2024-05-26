import { eachHourOfInterval, endOfDay, format, startOfDay } from 'date-fns'

type DayViewType = {
  selectedDate: Date
}

type dateTimeFormatType = {
  time: Date
  index: number
}

export const DayView = ({ selectedDate }: DayViewType) => {
  const localTimeZoneAbbr = format(new Date(), 'z')
  const currentDay = format(selectedDate, 'EEE')

  const formatDateTime = ({ time, index }: dateTimeFormatType) => (
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
    <div className="my-2 h-full flex-1 rounded border border-input ">
      <div className="flex h-12 items-center border-b border-input">
        <div className="flex h-full w-32 items-center justify-center border-r border-input">
          {localTimeZoneAbbr}
        </div>
        <div className="flex h-full flex-1 flex-col px-6 py-3">
          <p>{currentDay}</p>
        </div>
      </div>
      <div className="max-h-full flex-1 overflow-y-scroll pb-32">
        {hours.map((time, index) => (
          <div className="flex h-12" key={index}>
            <div className="flex h-full w-32 items-start justify-center border-r border-input">
              {formatDateTime({ time, index })}
            </div>
            <div className="bg-red-600"> teste teste teste teste</div>
          </div>
        ))}
      </div>
    </div>
  )
}
