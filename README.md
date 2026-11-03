# Smoother Roads

Drivable roads for ground vehicles in Microsoft Flight Simulator 2024.

**Check coverage and request your area:** https://olivajames110.github.io/smoother-roads/

Smoother Roads removes broken photogrammetry in a narrow strip along real roads and lays a smooth
surface that follows the road's height, so cars, UTVs and other ground vehicles can drive without
hitting spikes. Everything off the road keeps its photogrammetry. Coverage comes as region packs,
added based on requests.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The coverage map website (served by GitHub Pages) |
| `areas.json` | The list of covered regions. The map reads this file live. |

## Adding a covered region

Add an entry to `areas` in `areas.json` (and the fallback copy in `index.html`) and commit:

```json
{
  "id": "farmingdale-ny",
  "name": "Farmingdale, NY",
  "package": "smoother-roads-farmingdale-ny",
  "lat": 40.7326,
  "lon": -73.4454,
  "radiusKm": 15,
  "added": "2026-11-03",
  "version": "0.1.0"
}
```

Also update `"updated"` and `"modVersion"` at the top. Only publish a region once the version that
contains it is live on flightsim.to.

## Credits

- Road data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL
- Elevation: Copernicus DEM GLO-30 © DLR e.V. / Airbus, provided under COPERNICUS by the European Union and ESA
- Map tiles and place search: © OpenStreetMap contributors, Nominatim
