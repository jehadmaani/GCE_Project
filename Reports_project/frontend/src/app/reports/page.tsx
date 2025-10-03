"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchEvents } from "../lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading events</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((event) => (
        <Card
          key={event.id}
          className="shadow-md hover:shadow-lg transition cursor-pointer"
          onClick={() => router.push(`/events/${event.id}`)}
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Location:</strong> {event.location.address}
            </p>
            {/* <p>
              Lat: {event.location.lat}, Lng: {event.location.lng}
            </p> */}
            <p>
              <strong>Importance:</strong> {event.importance}
            </p>
            {/* <p>
              <strong>Type:</strong> {event.type}
            </p> */}
            <p className="text-gray-600 mt-2">{event.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
