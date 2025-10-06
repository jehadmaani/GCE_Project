"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchEvents } from "../lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading reports</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((report) => (
        <Card
          key={report.id}
          className="shadow-md hover:shadow-lg transition cursor-pointer"
          onClick={() => router.push(`/events/${report.id}`)}
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold">{report.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Location:</strong> {report.location.address}
            </p>
            <p>
              <strong>Importance:</strong> {report.importance}
            </p>
            <p className="text-gray-600 mt-2">{report.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
