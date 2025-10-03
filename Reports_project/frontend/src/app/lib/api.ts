import { EventSchema, EventsSchema, Event } from "../../../types";

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch("http://localhost:4000/events");
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return EventsSchema.parse(data);
}

export async function fetchEventById(id: string): Promise<Event> {
  const events = await fetchEvents();
  const event = events.find((event) => event.id === id);

  if (!event) {
    throw new Error("Event not found");
  }

  return EventSchema.parse(event);
}
