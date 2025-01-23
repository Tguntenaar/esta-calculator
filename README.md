# ESTA-calculator

Important information:

- For exact ESTA compliance, you need to enforce that no single visit exceeds 90 days.

- There is no formal 180-day limit over 12 months in the U.S. VWP rules.

- The code you shared appears designed more like a Schengen or UK 180-in-12-months calculator and does not match the actual U.S. ESTA rules.
Hence, if you truly want an “ESTA calculator,” it’s best to remove the 180-day rolling logic and tailor checks to the 90-day-per-visit rule.

I just made it this way since I don't want to be deported on arrival.



# Example input

```js
[
  { startDate: '2024-01-19', endDate: '2024-02-14' },
  { startDate: '2024-04-01', endDate: '2024-04-24' },
  { startDate: '2024-06-15', endDate: '2024-07-06' },
  { startDate: '2024-08-18', endDate: '2024-11-03' },
  { startDate: '2024-11-13', endDate: '2024-11-13' },
  { startDate: '2024-11-23', endDate: '2024-12-01' },
  { startDate: '2025-01-11', endDate: '2025-02-01' },
]
```