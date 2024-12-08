import { EventDto } from "../types/events";

export const filterEventsByMonth = (events:EventDto[], month:number)=>{
    return events.filter(e=>e.startTime.getMonth()=== month || e.endTime.getMonth() === month)
}