"use client";

import { Event } from "../../../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchEventById } from "../../lib/api";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<Event>({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Event not found</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-4 p-6">
      <div className="lg:w-2/5">
        <Card className="shadow-md p-4">
          <CardHeader>
            <CardTitle className="text-2xl">{data.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Description:</strong> {data.description}
            </p>
            <p>
              <strong>Type:</strong> {data.type}
            </p>
            <p>
              <strong>Importance:</strong> {data.importance}
            </p>
            <p>
              <strong>Location:</strong> {data.location.address}
            </p>
            <p>
              Lat: {data.location.lat}, Lng: {data.location.lng}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
