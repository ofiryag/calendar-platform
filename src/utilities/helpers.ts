import { EventDto } from "../types/events";

export const filterEventsByMonth = (events:EventDto[], month:number)=>{
    return events.filter(e=>e.startTime.getMonth()=== month || e.endTime.getMonth() === month)
}

export const addHours=(date: Date,hours:number): Date=> {
    const newDate = new Date(date); // Create a copy of the date to avoid mutating the original
    newDate.setHours(newDate.getHours() + hours); // Add hours
    return newDate;
  }