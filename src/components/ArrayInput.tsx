import React, { useState } from 'react';
import type { DateRange } from '../App';

interface ArrayInputProps {
  onSubmit: (trips: DateRange[]) => void;
}

export function ArrayInput({ onSubmit }: ArrayInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Parse the input string as JavaScript
      const trips = eval(`(${input})`);

      // Validate the array structure
      if (!Array.isArray(trips)) {
        throw new Error('Input must be an array');
      }

      // Validate each trip object
      const isValid = trips.every(trip => 
        trip && 
        typeof trip === 'object' && 
        typeof trip.startDate === 'string' && 
        typeof trip.endDate === 'string' &&
        !isNaN(new Date(trip.startDate).getTime()) &&
        !isNaN(new Date(trip.endDate).getTime())
      );

      if (!isValid) {
        throw new Error('Invalid trip format. Each trip must have startDate and endDate as valid dates');
      }

      onSubmit(trips);
      setInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input format');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Paste your trips array here
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 font-mono text-sm"
          placeholder={`[
  { startDate: '2024-01-19', endDate: '2024-02-14' },
  { startDate: '2024-04-01', endDate: '2024-04-24' }
]`}
        />
      </div>
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
      >
        Import Trips
      </button>
    </form>
  );
}