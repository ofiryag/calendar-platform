import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { EventDto, EventRequestDto } from '../types/events';
import { EVENTS_DATA } from '../utilities/consts';
import { v4 as uuidv4 } from 'uuid';
import { DateValue } from '@mantine/dates';

export type EventsContextType = {
    selectedDate:Date | null;
    setSelectedDate:Dispatch<SetStateAction<Date | null>>;
    events: EventDto[];
    activeEvents: EventDto[];
    addEvent: (event: EventRequestDto) => void;
    updateEvent: (id: EventDto) => void;
    archiveEvent: (id: string) => void;
  };

export const EventsContext = React.createContext<EventsContextType | null>(null);

const EventsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<DateValue>(null);
  const [events, setEvents] = React.useState<EventDto[]>(EVENTS_DATA.filter(e=>!e.archived));
  const activeEvents = useMemo(()=>{return events.filter(e=>!e.archived)},[events])
  const addEvent = (event: EventRequestDto) => {
    const newEvent: EventDto = {
      id: uuidv4(),
      createdDate: new Date(Date.now()),
      archived:false,
      ...event
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (eventUpdate: EventDto) => {
    events.filter((event: EventDto) => {
      if (event.id === eventUpdate.id) {
        event = eventUpdate;
        event.lastModified = new Date(Date.now());
        setEvents([...events]);
      }
    });
  };

  const archiveEvent = (id: string) => {
    events.filter((event: EventDto) => {
      if (event.id === id) {
        event.archived = true;
        setEvents([...events]);
      }
    });
  };
  
  return <EventsContext.Provider value={{events, addEvent, updateEvent, archiveEvent,selectedDate , setSelectedDate,activeEvents }}>
    {children}
  </EventsContext.Provider>;
};

export default EventsProvider;