import React from 'react';
import type { DateRange } from '../App';

interface TravelTimelineProps {
  trips: DateRange[];
}

export function TravelTimeline({ trips }: TravelTimelineProps) {
  if (trips.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No trips added yet. Add your past trips to see them here.
      </div>
    );
  }

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-amber-200" />
      <div className="space-y-6">
        {sortedTrips.map((trip, index) => (
          <div key={index} className="relative pl-10">
            <div className="absolute left-2 top-2 w-5 h-5 bg-amber-500 rounded-full border-4 border-amber-100" />
            <div className="bg-amber-50 rounded-lg p-4 shadow-sm">
              <div className="font-medium text-gray-800">
                Trip #{sortedTrips.length - index}
              </div>
              <div className="text-sm text-gray-600">
                {new Date(trip.startDate).toLocaleDateString()} -{' '}
                {new Date(trip.endDate).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Duration:{' '}
                {Math.floor(
                  (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                ) + 1}{' '}
                days
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}