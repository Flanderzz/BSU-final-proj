"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
}

export function TimePickerInput({ value, onChange }: TimePickerProps) {
  return (
    <div className="flex items-center space-x-2">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <Input type="time" value={value} onChange={(e) => onChange(e.target.value)} className="w-full" />
    </div>
  )
}

export function TimePickerDemo() {
  const [time, setTime] = React.useState("")

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="time">Time</Label>
      <TimePickerInput value={time} onChange={setTime} />
    </div>
  )
}
