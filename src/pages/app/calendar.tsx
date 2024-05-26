import { add, format, parse, startOfToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useReducer } from 'react'
import { Helmet } from 'react-helmet-async'

import { DayView } from '@/components/calendar/day-view'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const MonthView = () => <div>MonthView</div>
const YearView = () => <div>YearView</div>

type CalendarViewType = 'Day' | 'Week' | 'Month' | 'Year'

type EventsStateType = {
  selectedDate: Date
  interval: CalendarViewType
}

type EventsActionType =
  | {
      type: 'SET_DATE'
      payload: Date
    }
  | {
      type: 'SET_INTERVAL'
      payload: CalendarViewType
    }
const reducer = (
  state: EventsStateType,
  { type, payload }: EventsActionType,
) => {
  switch (type) {
    case 'SET_DATE': {
      return {
        ...state,
        selectedDate: payload,
      }
    }
    case 'SET_INTERVAL': {
      return {
        ...state,
        interval: payload,
      }
    }
    default: {
      return state
    }
  }
}

const today = startOfToday()

const initialValues: EventsStateType = {
  selectedDate: today,
  interval: 'Day',
}

const getFormattedDate = ({ selectedDate, interval }: EventsStateType) => {
  return (
    <span>
      {format(
        selectedDate,
        interval === 'Day'
          ? 'MMMM dd, yyyy'
          : interval === 'Year'
            ? 'yyyy'
            : 'MMMM yyyy',
        { locale: ptBR },
      )}
    </span>
  )
}

export function Calendar() {
  const [{ selectedDate, interval }, dispatch] = useReducer(
    reducer,
    initialValues,
  )

  const onSelectDate = (date: Date) =>
    dispatch({ type: 'SET_DATE', payload: date })
  const onSelectedInterval = (value: CalendarViewType) =>
    dispatch({ type: 'SET_INTERVAL', payload: value })

  const getCurrentMonth = () => format(selectedDate, 'MMM-yyyy')
  const getFirstDayOfMonth = () =>
    parse(getCurrentMonth(), 'MMM-yyyy', new Date())

  const onPrevDate = () => {
    if (interval === 'Day') onSelectDate(add(selectedDate, { days: -1 }))
    if (interval === 'Month')
      onSelectDate(add(getFirstDayOfMonth(), { months: -1 }))
    if (interval === 'Week') onSelectDate(add(selectedDate, { weeks: -1 }))
    if (interval === 'Year') onSelectDate(add(selectedDate, { years: -1 }))
  }
  const onNextDate = () => {
    if (interval === 'Day') onSelectDate(add(selectedDate, { days: 1 }))
    if (interval === 'Month')
      onSelectDate(add(getFirstDayOfMonth(), { months: 1 }))
    if (interval === 'Week') onSelectDate(add(selectedDate, { weeks: 1 }))
    if (interval === 'Year') onSelectDate(add(selectedDate, { years: 1 }))
  }

  return (
    <>
      <Helmet title="Calendar" />
      <div className="flex h-screen flex-col overflow-hidden px-4 pt-4">
        <div className="flex items-center justify-between rounded border border-input px-6 py-4">
          <div className="flex items-center gap-6">
            <Button variant="outline" onClick={() => onSelectDate(today)}>
              Hoje
            </Button>
            <div className="flex w-[180px] gap-2">
              <button onClick={onPrevDate}>
                <ChevronLeftIcon />
              </button>
              <button onClick={onNextDate}>
                <ChevronRightIcon />
              </button>
              {getFormattedDate({ selectedDate, interval })}
            </div>
          </div>
          <Select onValueChange={onSelectedInterval} value={interval}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Day">Day</SelectItem>
              <SelectItem value="Week">Week</SelectItem>
              <SelectItem value="Month">Month</SelectItem>
              <SelectItem value="Year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {interval === 'Day' ? (
          <DayView selectedDate={selectedDate} />
        ) : interval === 'Month' ? (
          <MonthView />
        ) : interval === 'Year' ? (
          <YearView />
        ) : null}
      </div>
    </>
  )
}
