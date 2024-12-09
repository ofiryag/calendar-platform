import { Modal, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { Dispatch, SetStateAction,  useContext,  useEffect, useState } from 'react';
import { addHours } from '../utilities/helpers';
import { EventDto, EventRequestDto } from '../types/events';
import { EventsContext, EventsContextType } from '../contexts/EventsContext';

type EventCreationFormProps ={
    opened:boolean;
    setOpened:Dispatch<SetStateAction<boolean>>;
    initialEvent?:EventDto;
    formType?:FormType;
}

export enum FormType {
    Create = "Create",
    Update = "Update"
}

function EventUpsertForm({opened, setOpened, initialEvent, formType = FormType.Create}:EventCreationFormProps) {
    const {selectedDate, addEvent, updateEvent } = useContext(EventsContext) as EventsContextType;
    const [newEvent, setNewEvent] = useState<EventRequestDto | EventDto>( formType === FormType.Update && initialEvent ? initialEvent : {
        name: '',
        startTime: selectedDate ?? new Date(),
        endTime: addHours(selectedDate ?? new Date(), 1),
        description:''
      })

    //In order to re-render the modal's data
    useEffect(()=>{
        const eventCopy = {...newEvent};
        eventCopy.startTime = selectedDate ?? new Date();
        eventCopy.endTime= addHours(selectedDate ?? new Date(), 1),
        setNewEvent(eventCopy)
    },[selectedDate])

  return (
    <Modal opened={opened} onClose={()=>setOpened(false)} title={`${formType} Event`}>
    <div>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="Event's title"
        value={newEvent.name}
        onChange={(e)=>{
            const eventCopy = {...newEvent};
            eventCopy.name = e.currentTarget.value
            setNewEvent(eventCopy)
        }}
      />
      <DateTimePicker
        withAsterisk
        label="Start date"
        placeholder="Event's start date"
        value={newEvent.startTime}
        onChange={(date)=>{
            const eventCopy = {...newEvent};
            eventCopy.startTime = date as Date
            setNewEvent(eventCopy)
        }}
      />
      <DateTimePicker
        withAsterisk
        label="End date"
        placeholder="Event's end date"
        value={newEvent.endTime}
        onChange={(date)=>{
            const eventCopy = {...newEvent};
            eventCopy.endTime = date as Date
            setNewEvent(eventCopy)
        }}
      />
        <TextInput
        label="Description"
        placeholder="Event's description"
        value={newEvent.description}
        onChange={(e)=>{
            const eventCopy = {...newEvent};
            eventCopy.description = e.currentTarget.value
            setNewEvent(eventCopy)
        }}
      />
      <div className="justify-end">
        <button onClick={()=>{ 
          formType===FormType.Create ? addEvent(newEvent) : updateEvent(newEvent as EventDto);
           setOpened(false)
           console.log(newEvent)
          }
           } className="p-2 px-4 bg-blue-400 rounded-md mt-2" >Submit</button>
      </div>
    </div>
  </Modal>
  );
}

export default EventUpsertForm