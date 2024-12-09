import { EventDto } from "../types/events";

// Function to check if a given date has an event
export const dateHasEvent = (date: Date, events: EventDto[]): boolean=> {
    // Normalize the date to remove time part (if you only care about the day)
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Normalize to start of the day
  
    for (let event of events) {
      // Normalize the event start and end times
      const eventStart = new Date(event.startTime);
      eventStart.setHours(0, 0, 0, 0); // Normalize to start of the day
      const eventEnd = new Date(event.endTime);
      eventEnd.setSeconds(-1);
      eventEnd.setHours(0, 0, 0, 0); // Normalize to start of the day
  
      // Check if the given date is within the event's duration
      if (targetDate >= eventStart && targetDate <= eventEnd) {
        return true; // Event occurs on this date
      }
    }
  
    return false; // No event for this date
  }

  // Function to get events by month (year, month)
export function getEventsByMonth(year: number, month: number, events: EventDto[]): EventDto[] {
    const startOfMonth = new Date(year, month - 1, 1); // Month is 0-indexed (0 = January)
    const endOfMonth = new Date(year, month, 0); // Get last day of the month
  
    // Filter events that occur in the given month
    return events.filter(event => {
      // Normalize the event's start and end time to only consider the date
      const eventStart = new Date(event.startTime);
      const eventEnd = new Date(event.endTime);
  
      return (eventStart >= startOfMonth && eventStart <= endOfMonth) || 
             (eventEnd >= startOfMonth && eventEnd <= endOfMonth) || 
             (eventStart <= startOfMonth && eventEnd >= endOfMonth); // Event spans the whole month
    });
  }
  
  // Function to get events by day (specific date)
  export function getEventsByDay(date: Date, events: EventDto[]): EventDto[] {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Normalize to the start of the day
  
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
  
    // Filter events that occur on the given day
    return events.filter(event => {
      // Normalize event times to check if they overlap with the given date
      const eventStart = new Date(event.startTime);
      const eventEnd = new Date(event.endTime);
  
      return (eventStart <= endOfDay && eventEnd >= targetDate);
    });
  }