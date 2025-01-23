import React, { useState } from 'react';
import { Calendar, Plane, Clock, AlertCircle, Code } from 'lucide-react';
import { TravelTimeline } from './components/TravelTimeline';
import { DateRangeInput } from './components/DateRangeInput';
import { ArrayInput } from './components/ArrayInput';
import { calculateRemainingStay } from './utils/calculations';

export type DateRange = {
  startDate: string;
  endDate: string;
};

function App() {
  const [pastTrips, setPastTrips] = useState<DateRange[]>([]);
  const [newTripStart, setNewTripStart] = useState<string>('');
  const [calculationResult, setCalculationResult] = useState<string>('');
  const [showArrayInput, setShowArrayInput] = useState(false);

  const addTrip = (trip: DateRange) => {
    setPastTrips([...pastTrips, trip]);
  };

  const importTrips = (trips: DateRange[]) => {
    setPastTrips([...pastTrips, ...trips]);
    setShowArrayInput(false);
  };

  const calculateStay = () => {
    if (!newTripStart) {
      alert('Please enter a start date for your new trip');
      return;
    }
    const result = calculateRemainingStay(pastTrips, newTripStart);
    setCalculationResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-10 h-10 text-amber-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">US Travel Calculator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your US travel history and plan future trips while staying compliant with visa regulations
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-amber-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Add Past Trip</h2>
              </div>
              <button
                onClick={() => setShowArrayInput(!showArrayInput)}
                className="flex items-center text-sm text-amber-600 hover:text-amber-700"
              >
                <Code className="w-4 h-4 mr-1" />
                {showArrayInput ? 'Use Form' : 'Import from Array'}
              </button>
            </div>
            {showArrayInput ? (
              <ArrayInput onSubmit={importTrips} />
            ) : (
              <DateRangeInput onSubmit={addTrip} />
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-100">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-amber-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Plan New Trip</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={newTripStart}
                  onChange={(e) => setNewTripStart(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <button
                onClick={calculateStay}
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
              >
                Calculate Remaining Stay
              </button>
            </div>
          </div>
        </div>

        {calculationResult && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-amber-100">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-amber-600 mr-2 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-800">{calculationResult}</p>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-amber-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Travel Timeline</h2>
          <TravelTimeline trips={pastTrips} />
        </div>
      </div>
    </div>
  );
}

export default App;