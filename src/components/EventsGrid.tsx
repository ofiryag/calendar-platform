import { randomId } from '@mantine/hooks';
import { EventDto } from '../types/events'
import EmptyEventRow from './EmptyEventRow';
import EventRow from './EventRow'

function formatHour(hour: number): string {
    // Ensure the hour is always 2 digits (e.g., 01 for 1, 10 for 10)
    return hour.toString().padStart(2, '0') + ":00";
  }

// Function to get events by hour for a specific day (from 00:00 to 23:59)
function getEventsByHour(date: Date, events: EventDto[]): (EventDto | null)[] {
    const eventArray: (EventDto | null)[] = [];
  
    // Normalize the given date to start at 00:00 and end at 23:59
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Normalize to 00:00 of the day
    
    // Loop over all 24 hours (0 to 23)
    for (let hour = 0; hour < 24; hour++) {
      const startOfHour = new Date(targetDate);
      startOfHour.setHours(hour, 0, 0, 0); // Start of the current hour
      
      const endOfHour = new Date(targetDate);
      endOfHour.setHours(hour, 59, 59, 999); // End of the current hour
  
      // Find the event(s) that occur in this hour
      const event = events.find(event => {
        const eventStart = new Date(event.startTime);
        const eventEnd = new Date(event.endTime);
        
        // Check if event occurs within the current hour
        return eventStart <= endOfHour && eventEnd >= startOfHour;
      });
  
      // If there's an event, add it to the array; otherwise, add null
      eventArray.push(event || null);
    }
  
    return eventArray;
  }

type EventsGridProps = {
    selectedDay?:Date;
    events:EventDto[]
    onRowClick:(hour:number)=>void;
}

function EventsGrid({events, selectedDay,onRowClick}:EventsGridProps) {
    let eventsByHour:(EventDto|null)[] = [];
    if(selectedDay)
        eventsByHour = getEventsByHour(selectedDay, events);
    
  return (
    <div className="flex flex-col">
        {!selectedDay ? <div><h1 className="justify-center items-center underline font-bold">Coming Soon...</h1> {events.slice(0,5).map((e,index)=>
            <div className="flex flex-row items-center gap-4">            
                <EventRow key={randomId()} event={e} />
            </div>
            
        )}</div> : eventsByHour.map((e,index)=>
            <div className="flex flex-row items-center gap-4 maxh-full h-full overflow-auto">
                <label className="flex">{formatHour(index)}</label>
                {!e ? <EmptyEventRow key={randomId()} onRowClick={()=>onRowClick(index)}/>:
                <EventRow key={randomId()} event={e} />}
            </div>
            )}
    </div>
  )
}

export default EventsGrid