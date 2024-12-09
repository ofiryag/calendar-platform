export type EventDto = EventRequestDto & {
    id:string;
    createdDate:Date;
    lastModified?:Date;
    archived:boolean;
}

export type EventRequestDto = {
    name:string;
    description:string;
    startTime:Date;
    endTime:Date;
}