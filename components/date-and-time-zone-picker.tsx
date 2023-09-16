'use client'

import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Label } from './ui/label'
import DatePickerWithRange from './date-picker-with-range'
import TimezoneSelect, { ITimezone } from 'react-timezone-select'
import { DateRange } from 'react-day-picker'

type DateAndTimeZonePickerProps = {
  timeZone: ITimezone
  setTimeZone: React.Dispatch<React.SetStateAction<ITimezone>>
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export default function DateAndTimeZonePicker({
  timeZone,
  setTimeZone,
  date,
  setDate,
}: DateAndTimeZonePickerProps) {
  return (
    <>
      <Card className="w-fit">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="date" className="shrink-0">
                  Pick start and end dates
                </Label>
                <DatePickerWithRange className="[&>button]:w-[260px]" date={date} setDate={setDate}/>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="date" className="shrink-0">
                  Pick a time zone
                </Label>
                <TimezoneSelect value={timeZone} onChange={setTimeZone} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
