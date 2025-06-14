"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addMonths } from "date-fns";
import { CalendarDays } from "lucide-react";
import React, { useState } from "react";

const MonthSelection = ({ selectedMonth }) => {
  const today = new Date();
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);

  return (
    <div suppressHydrationWarning>
      <Popover>
        <PopoverTrigger>
          <Button
            asChild
            variant="outline"
            className="flex gap-2 items-center text-stone-500"
          >
            <div>
              <CalendarDays className="w-5 h-5" />
              {month.toLocaleString("default", {
                month: "short",
                year: "numeric",
              })}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(val) => {
              setMonth(val);
              selectedMonth(val);
            }}
            className="flex flex-1 justify-center"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;
