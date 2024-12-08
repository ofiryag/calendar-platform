import { Indicator } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useState } from "react";
import { EVENTS_DATA } from "./utilities/consts";
import { dateHasEvent } from "./utilities/eventUtils";
import EventsGrid from "./components/EventsGrid";

const onRowClick=(hour:number)=>{
  alert(hour);
  console.log(hour)
}

export default function App() {
  const [value, setValue] = useState<Date>();
  const [events, setEvents] = useState(EVENTS_DATA);
  return <div className="flex flex-col">
    <h1 className="flex  text-3xl font-bold underline ml-5">Calendar</h1>
    <div className="flex flex-row items-start justify-start">
      <Calendar
       className="flex flex-col"
      getDayProps={(date) => ({
        selected: date.toDateString() === value?.toDateString(),
        onClick: () => {
          if(date.toString() === value?.toString())
            setValue(undefined);
          else setValue(date)},
      })}
      renderDay={(date) => {
        const day = date.getDate();
        return (
          <div>
            <div>{day}</div>
            <div style={{visibility:dateHasEvent(date,EVENTS_DATA)?"visible":"hidden"}} className="h-[2px] w-full bg-blue-500"></div>
          </div>
        );
      }}
   />
   <EventsGrid onRowClick={onRowClick} selectedDay={value} events={value ? events.filter(x=>x.startTime.getDate() === value?.getDate()):events}/>
  </div>
  </div>
}
