# Road Flattener

Smooth roads for ground vehicles in Microsoft Flight Simulator 2024.

**Check coverage and request your area:** https://olivajames110.github.io/road-flattener/

Road Flattener flattens the terrain and removes broken photogrammetry along real roads, so cars,
UTVs and other ground vehicles can drive without hitting spikes. Coverage is added area by area
based on requests.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The coverage map website (served by GitHub Pages) |
| `areas.json` | The list of covered areas. The map reads this file live. |

## Adding a covered area

Add an entry to `areas` in `areas.json` and commit:

```json
{
  "id": "unique-id",
  "name": "Place name, ST",
  "lat": 40.74,
  "lon": -73.415,
  "radiusKm": 15,
  "added": "2026-10-30",
  "version": "0.2.0"
}
```

Also update `"updated"` and `"modVersion"` at the top. Only publish an area once the mod version
that contains it is live on flightsim.to.

## Credits

- Road data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL
- Elevation: Copernicus DEM GLO-30 © DLR e.V. / Airbus, provided under COPERNICUS by the European Union and ESA
- Map tiles and place search: © OpenStreetMap contributors, Nominatim
