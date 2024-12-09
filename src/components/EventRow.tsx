import { IconEdit, IconTrash } from '@tabler/icons-react'
import { EventDto } from '../types/events'
import { EVENT_ROW_CLASSNAME } from '../utilities/classNames'
import { useContext } from 'react'
import { EventsContext,EventsContextType } from '../contexts/EventsContext'

type EventProps = {
  event:EventDto;
  onRowClick:()=>void;
}

function EventRow({event,onRowClick}:EventProps) {
  const { archiveEvent } = useContext(EventsContext) as EventsContextType;
  
  return (
    <div className={EVENT_ROW_CLASSNAME}>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
        <label className="flex flex-col">
          {event.name}
        </label>
      <label className="flex flex-col">
        {event.description}
      </label>
      </div>
        <div className="flex flex-row">
        {event.lastModified && <div className="flex flex-col text-xs text-gray-500">
            <label>
              Last Modified:
            </label>
             <label>
              {event.lastModified.toDateString()}
            </label>
            
          </div>
        }
          <IconEdit size={16} className="cursor-pointer" onClick={()=>onRowClick()}/>
          <IconTrash size={16} className="cursor-pointer" onClick={()=>{
            archiveEvent(event.id);
            }}/>
        </div>
      </div>
      
    </div>
  )
}

export default EventRow