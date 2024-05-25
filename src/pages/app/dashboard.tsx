'use client'

import { add, format, parse, startOfToday } from 'date-fns'
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
import { events } from '@/utils/events'

const MonthView = () => <div>MonthView</div>
const YearView = () => <div>YearView</div>

// reducer

type CalandarView = 'Day' | 'Week' | 'Month' | 'Year'

type EventsState = {
  selectedDate: Date
  interval: CalandarView
}

type EventsAction =
  | {
      type: 'SET_DATE'
      payload: Date
    }
  | {
      type: 'SET_INTERVAL'
      payload: CalandarView
    }

const reducer = (state: EventsState, { type, payload }: EventsAction) => {
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

const initialValues: EventsState = {
  selectedDate: today,
  interval: 'Day',
}

export function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { selectedDate, interval } = state

  const currentMonth = format(selectedDate, 'MMM-yyyy')

  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const selecteDate = (date: Date) => {
    dispatch({
      type: 'SET_DATE',
      payload: date,
    })
  }

  const prev = () => {
    if (interval === 'Day') {
      selecteDate(add(selectedDate, { days: -1 }))
    } else if (interval === 'Month') {
      selecteDate(add(firstDayCurrentMonth, { months: -1 }))
    } else if (interval === 'Week') {
      selecteDate(add(selectedDate, { weeks: -1 }))
    } else if (interval === 'Year') {
      selecteDate(add(selectedDate, { years: -1 }))
    }
  }
  const next = () => {
    if (interval === 'Day') {
      selecteDate(add(selectedDate, { days: 1 }))
    } else if (interval === 'Month') {
      selecteDate(add(firstDayCurrentMonth, { months: 1 }))
    } else if (interval === 'Week') {
      selecteDate(add(selectedDate, { weeks: 1 }))
    } else if (interval === 'Year') {
      selecteDate(add(selectedDate, { years: 1 }))
    }
  }

  return (
    <>
      <Helmet title="Calendar" />
      <div className="flex h-screen flex-col overflow-hidden bg-gray-200 px-4 pt-4">
        <div className="flex items-center justify-between rounded border border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center gap-6">
            <Button variant={'outline'} onClick={() => selecteDate(today)}>
              Today
            </Button>
            <div className="flex gap-2">
              <button onClick={prev}>
                <ChevronLeftIcon className="text-gray-400" />
              </button>
              <button onClick={next}>
                <ChevronRightIcon className="text-gray-400" />
              </button>
              <span>
                {format(
                  selectedDate,
                  interval === 'Day'
                    ? 'MMMM dd, yyyy'
                    : interval === 'Year'
                      ? 'yyyy'
                      : 'MMMM yyyy',
                )}
              </span>
            </div>
          </div>
          <div>
            <input
              type="text"
              className="min-w-[520px] rounded border border-gray-200 px-3 py-2 "
              placeholder="Search"
            />
          </div>
          <div>
            <Select
              onValueChange={(value: CalandarView) => {
                dispatch({ type: 'SET_INTERVAL', payload: value })
              }}
              value={interval}
            >
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
        </div>
        {interval === 'Day' ? (
          <DayView selectedDate={selectedDate} events={events} />
        ) : interval === 'Month' ? (
          <MonthView />
        ) : interval === 'Year' ? (
          <YearView />
        ) : null}
      </div>
    </>
  )
}
