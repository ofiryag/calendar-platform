export type EventDto = {
    name:string;
    description:string;
    startTime:Date;
    endTime:Date;
    createdDate:Date;
    lastModified?:Date;
    archived:boolean
}