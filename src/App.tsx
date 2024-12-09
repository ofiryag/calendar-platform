import EventsGrid from "./components/EventsGrid";
import EventsProvider from "./contexts/EventsContext";
import EventsCalendar from "./components/EventsCalendar";



export default function App() {
  return <div className="flex flex-col">
    <h1 className="flex  text-3xl font-bold underline ml-5">Calendar</h1>
    <div className="flex flex-row items-start justify-start">
      <EventsProvider>
        <EventsCalendar/>
        <EventsGrid />
      </EventsProvider>
  </div>
  </div>
}
