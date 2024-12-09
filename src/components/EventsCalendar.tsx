import { useContext } from 'react'
import { EventsContext, EventsContextType } from '../contexts/EventsContext'
import { Calendar } from '@mantine/dates';
import { dateHasEvent } from '../utilities/eventUtils';

function EventsCalendar() {
    const { activeEvents,selectedDate,setSelectedDate } = useContext(EventsContext) as EventsContextType;
    return (
        <Calendar
        className="flex flex-col"
       getDayProps={(date) => ({
         selected: date.toDateString() === selectedDate?.toDateString(),
         onClick: () => {
           if(date.toString() === selectedDate?.toString())
            setSelectedDate(null);
           else setSelectedDate(date)},
       })}
       renderDay={(date) => {
         const day = date.getDate();
         return (
           <div>
             <div>{day}</div>
             <div style={{visibility:dateHasEvent(date,activeEvents)?"visible":"hidden"}} className="h-[2px] w-full bg-blue-500"></div>
           </div>
         );
       }}
    />
  )
}

export default EventsCalendar