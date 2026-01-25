import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Trip } from "@/lib/interfaces/trip";
import { getTrip } from "@/lib/api_methods/get-trip";
import { TimeLineTripView } from "@/components/trip/timeline-view";
import { APP_ROUTES } from "@/lib/constants";
import { CreatedAtCard } from "@/components/trip/created-at-card";
import { StopLenCard } from "@/components/trip/stop-len-card";
import { TotalDistanceCard } from "@/components/trip/total-distance-card";
import { TripHeader } from "@/components/trip/trip-header";

export default async function TripDetailsPage() {
  const trip = await getTrip<Trip>();
  if (!trip) return notFound();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <Link href={APP_ROUTES.main} className="inline-block mb-12">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>

        <div className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative">
            <TripHeader title={trip.title} description={trip.description} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TotalDistanceCard totalDistance={trip.totalDistance} />

              <StopLenCard stopsLength={trip.stops.length} />

              <CreatedAtCard createdAt={trip.createdAt} />
            </div>
          </div>
        </div>

        <TimeLineTripView trip={trip} />
      </div>
    </div>
  );
}
