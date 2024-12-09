import { IconPlus } from '@tabler/icons-react'
import { EVENT_ROW_CLASSNAME } from '../utilities/classNames'

type EmptyEventRowProps ={
    onRowClick:()=>void;
}

function EmptyEventRow({onRowClick}:EmptyEventRowProps) {
  return <div onClick={()=>onRowClick()} className={`${EVENT_ROW_CLASSNAME} cursor-pointer`}>
    <IconPlus size={20} className="cursor-pointer"/>
    </div>
}

export default EmptyEventRow