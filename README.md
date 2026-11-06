# Smoother Roads

Drivable roads for ground vehicles in Microsoft Flight Simulator 2024.

**Check coverage and request your area:** https://olivajames110.github.io/smoother-roads/

Smoother Roads removes broken photogrammetry in a narrow strip along real roads and lays a smooth
surface that follows the road's height, so cars, UTVs and other ground vehicles can drive without
hitting spikes. Everything off the road keeps its photogrammetry. Coverage comes as region packs,
added based on requests.

## Files

| Path | What it is |
| --- | --- |
| `src/` | The site: React, TypeScript and Leaflet, built with Vite |
| `public/areas.json` | The list of covered regions. The site reads this file live. |
| `.github/workflows/deploy.yml` | Builds the site and publishes it to GitHub Pages on every push to `main` |

## Running it locally

```
npm install
npm run dev
```

Open http://localhost:5173/, or http://localhost:5173/?demo for sample data. Requests from the normal page
go to the real Google Form, even in local dev, so test with `?demo`. Sample data only exists in local dev.

## Adding a covered region

Add an entry to `areas` in `public/areas.json` and commit:

```json
{
  "id": "farmingdale-ny",
  "name": "Farmingdale, NY",
  "region": "New York, United States",
  "country": "United States",
  "icao": "KFRG",
  "cat": "town",
  "noPhotogrammetry": false,
  "package": "smoother-roads-farmingdale-ny",
  "lat": 40.7326,
  "lon": -73.4454,
  "radiusKm": 15,
  "added": "2026-11-03",
  "version": "0.1.0"
}
```

`cat` is one of `city`, `town`, `airport`, `mountain`, `coastal`, `race`, `island`. Set `noPhotogrammetry` to
`true` to show the amber caution beside an area outside a photogrammetry zone. Also update `"updated"`
and `"modVersion"` at the top. Only publish a region once the version that contains it is live on
flightsim.to.

## Adding a requested area

Requests from the Google Form go in the same list, with a `status` and `votes` and without `package` or
`version`:

```json
{
  "id": "orlando-fl",
  "name": "Orlando, FL",
  "region": "Florida, United States",
  "country": "United States",
  "icao": "",
  "cat": "city",
  "noPhotogrammetry": false,
  "status": "requested",
  "votes": 1,
  "by": "Community",
  "lat": 28.53567,
  "lon": -81.37985,
  "radiusKm": 20,
  "added": "2026-11-04"
}
```

`status` is `requested` or `progress`. Entries without one count as released, which also makes them count
as covered in the Submit area check.

## Credits

- Road data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL
- Elevation: Copernicus DEM GLO-30 © DLR e.V. / Airbus, provided under COPERNICUS by the European Union and ESA
- Map tiles and place search: © OpenStreetMap contributors, Nominatim
