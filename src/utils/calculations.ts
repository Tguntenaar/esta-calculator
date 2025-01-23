export function calculateRemainingStay(
  dateRanges: { startDate: string; endDate: string }[],
  newTripStartDate: string
): string {
  // Sort the date ranges by start date (earliest first)
  dateRanges.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  let currentDate = new Date();
  let totalDaysStayed = 0;

  // Go through each past travel date range
  for (let i = 0; i < dateRanges.length; i++) {
    let startDate = new Date(dateRanges[i].startDate);
    let endDate = new Date(dateRanges[i].endDate);
    
    // Calculate the time difference for each range to the current date
    let timeDiffStart = currentDate.getTime() - startDate.getTime();
    let timeDiffEnd = currentDate.getTime() - endDate.getTime();

    // Only count the days if the date range is within the last 12 months
    if (timeDiffStart <= 365 * 24 * 60 * 60 * 1000) { // within the last 12 months
      // Calculate the number of days for this range (add 1 to make it inclusive)
      let daysInRange = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

      // Add the days in the range if it's within the last 12 months
      if (timeDiffEnd <= 365 * 24 * 60 * 60 * 1000) {
        totalDaysStayed += daysInRange;
      } else {
        // If the end date is more than 12 months ago, count only the days within the last 12 months
        let daysWithinLast12Months = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
        totalDaysStayed += Math.min(daysInRange, daysWithinLast12Months);
      }
    }
  }

  // Calculate the remaining days you can stay for the new trip
  let remainingDays = 180 - totalDaysStayed;

  // If the remaining days is negative, it means you've exceeded the limit
  if (remainingDays <= 0) {
    return "You have exceeded the 180-day limit in the past 12 months.";
  } else {
    return `You have stayed ${totalDaysStayed} days in the past 12 months. You can stay for up to ${Math.min(90, remainingDays)} more days for your new trip starting on ${new Date(newTripStartDate).toLocaleDateString()}.`;
  }
}