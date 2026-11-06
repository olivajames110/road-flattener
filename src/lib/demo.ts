/* eslint-disable */
// Sample data for local previews only (npm run dev, then add ?demo to the URL)
import { countryOf } from "./format";
import type { Area, Cat, Shape, Status } from "./types";

const DAY = 864e5;
const NOW = Date.now();

const shot = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9cc3ea"/><stop offset="1" stop-color="#dce9f5"/></linearGradient></defs><rect width="640" height="360" fill="url(#s)"/><path d="M0 230 Q160 200 320 215 T640 205 V360 H0z" fill="#7d9a6b"/><path d="M250 360 L310 220 L340 220 L420 360z" fill="#4b5058"/><path d="M296 300 Q325 255 360 300" fill="#5c626b" stroke="#2b2f35" stroke-width="2"/><path d="M325 230v14M326 262v18M327 300v22M328 340v20" stroke="#f1f1f1" stroke-width="4"/><rect x="160" y="150" width="60" height="75" fill="#c9b9a3"/><rect x="440" y="130" width="80" height="95" fill="#b9a891"/><circle cx="328" cy="288" r="52" fill="none" stroke="#e5484d" stroke-width="5"/><text x="20" y="34" font-family="Arial" font-size="18" fill="#1f2937">Spike in road mesh · 2nd Ave &amp; Pike</text></svg>`);
const samples: any[] = [
  {id:1,name:'Seattle Downtown',region:'Washington, USA',icao:'KBFI',cat:'city',status:'released',votes:412,voted:false,by:'skyhopper',date:NOW-62*DAY,
   notes:'Downtown grid from Belltown to Pioneer Square, including the waterfront and the I-5 overpasses.',shape:{type:'circle',center:[47.6062,-122.3321],radius:3000},
   comments:[{author:'skyhopper',type:'feedback',text:'Drove the whole waterfront at night — this is incredible. Thanks for the release!',date:NOW-20*DAY},
     {author:'mtn_rider',type:'issue',text:'Sharp spike in the road mesh at 2nd Ave & Pike. Cars launch into the air when crossing it.',image:shot,pin:[47.6097,-122.3407],date:NOW-4*DAY},
     {author:'Smoother Roads',dev:true,type:'feedback',text:'Thanks — reproduced it. Fix is going into the next patch.',date:NOW-3*DAY}]},
  {id:2,name:'Monaco',region:'Monaco',icao:'LNMC',cat:'race',status:'progress',votes:356,voted:true,by:'gp_fan',date:NOW-41*DAY,
   notes:'The Grand Prix circuit plus the switchbacks up toward Monte Carlo. Tunnel sections are the priority.',
   shape:{type:'polygon',points:[[43.7247,7.4090],[43.7378,7.4205],[43.7510,7.4385],[43.7445,7.4420],[43.7300,7.4280],[43.7230,7.4160]]},
   comments:[{author:'gp_fan',type:'question',text:'Will the harbour tunnel be included, or only the surface streets?',date:NOW-12*DAY},
     {author:'Smoother Roads',dev:true,type:'feedback',text:'Tunnel is included. Currently working on the hairpin near the Fairmont.',date:NOW-11*DAY}]},
  {id:3,name:'Chicago Loop',region:'Illinois, USA',icao:'KMDW',cat:'city',status:'released',votes:288,voted:false,by:'windycity',date:NOW-90*DAY,
   notes:'The Loop bounded by the river and Roosevelt Rd. Lower Wacker would be a bonus.',shape:{type:'polygon',points:[[41.8890,-87.6410],[41.8890,-87.6240],[41.8670,-87.6240],[41.8670,-87.6410]]},
   comments:[{author:'trucker_joe',type:'issue',text:'Bridges over the river on Michigan Ave sit about 2 m below the road — small drop when driving onto them.',pin:[41.8885,-87.6245],date:NOW-9*DAY}]},
  {id:4,name:'Queenstown',region:'Otago, New Zealand',icao:'NZQN',cat:'town',status:'requested',votes:241,voted:false,by:'kiwi_pilot',date:NOW-15*DAY,
   notes:'Town centre and the road out to Frankton/airport. Great approach scenery, would love to drive it after landing.',shape:{type:'circle',center:[-45.0312,168.6626],radius:2500},
   comments:[{author:'alpine_av',type:'feedback',text:'+1, please include the Frankton road so we can drive from the terminal.',date:NOW-6*DAY}]},
  {id:5,name:'Innsbruck',region:'Tyrol, Austria',icao:'LOWI',cat:'mountain',status:'requested',votes:173,voted:false,by:'alpine_av',date:NOW-8*DAY,notes:'Old town and the valley floor around the airport.',shape:{type:'circle',center:[47.2692,11.4041],radius:3500},comments:[]},
  {id:6,name:'Reykjavík Centre',region:'Iceland',icao:'BIRK',cat:'city',status:'requested',votes:94,voted:false,by:'northern_lights',date:NOW-2*DAY,notes:'Downtown around Hallgrímskirkja down to the harbour.',shape:{type:'circle',center:[64.1466,-21.9426],radius:2000},comments:[]},
];
const CITIES: [string, string, number, number, string, Cat][] = [
 ['New York City','New York, USA',40.7128,-74.006,'KJFK','city'],['Los Angeles','California, USA',34.0522,-118.2437,'KLAX','city'],['San Francisco','California, USA',37.7749,-122.4194,'KSFO','city'],
 ['Las Vegas Strip','Nevada, USA',36.1147,-115.1728,'KLAS','city'],['Miami Beach','Florida, USA',25.7907,-80.13,'KMIA','coastal'],['Denver','Colorado, USA',39.7392,-104.9903,'KDEN','city'],
 ['Austin','Texas, USA',30.2672,-97.7431,'KAUS','city'],['Boston','Massachusetts, USA',42.3601,-71.0589,'KBOS','city'],['Nashville','Tennessee, USA',36.1627,-86.7816,'KBNA','city'],
 ['Phoenix','Arizona, USA',33.4484,-112.074,'KPHX','city'],['Honolulu','Hawaii, USA',21.3069,-157.8583,'PHNL','island'],['Anchorage','Alaska, USA',61.2181,-149.9003,'PANC','town'],
 ['Juneau','Alaska, USA',58.3019,-134.4197,'PAJN','town'],['Aspen','Colorado, USA',39.1911,-106.8175,'KASE','mountain'],['Key West','Florida, USA',24.5551,-81.78,'KEYW','island'],
 ['Pacific Coast Hwy · Big Sur','California, USA',36.2704,-121.8081,'KMRY','coastal'],['Vancouver','British Columbia, Canada',49.2827,-123.1207,'CYVR','city'],['Toronto','Ontario, Canada',43.6532,-79.3832,'CYYZ','city'],
 ['Montréal','Québec, Canada',45.5017,-73.5673,'CYUL','city'],['Banff','Alberta, Canada',51.1784,-115.5708,'CYYC','mountain'],['Mexico City','Mexico',19.4326,-99.1332,'MMMX','city'],
 ['Havana','Cuba',23.1136,-82.3666,'MUHA','city'],['Rio de Janeiro','Brazil',-22.9068,-43.1729,'SBRJ','coastal'],['São Paulo','Brazil',-23.5505,-46.6333,'SBSP','city'],
 ['Buenos Aires','Argentina',-34.6037,-58.3816,'SABE','city'],['Lima','Peru',-12.0464,-77.0428,'SPJC','city'],['Bogotá','Colombia',4.711,-74.0721,'SKBO','city'],
 ['Santiago','Chile',-33.4489,-70.6693,'SCEL','city'],['Ushuaia','Argentina',-54.8019,-68.303,'SAWH','town'],['London','United Kingdom',51.5074,-0.1278,'EGLC','city'],
 ['Paris','France',48.8566,2.3522,'LFPG','city'],['Amsterdam','Netherlands',52.3676,4.9041,'EHAM','city'],['Berlin','Germany',52.52,13.405,'EDDB','city'],
 ['Rome','Italy',41.9028,12.4964,'LIRF','city'],['Barcelona','Spain',41.3874,2.1686,'LEBL','city'],['Lisbon','Portugal',38.7223,-9.1393,'LPPT','city'],
 ['Zürich','Switzerland',47.3769,8.5417,'LSZH','city'],['Stelvio Pass','Lombardy, Italy',46.5286,10.4527,'','mountain'],['Nürburgring','Germany',50.3356,6.9475,'EDDK','race'],
 ['Spa-Francorchamps','Belgium',50.4372,5.9714,'EBLG','race'],['Amalfi Coast','Campania, Italy',40.634,14.6027,'LIRN','coastal'],['Edinburgh','Scotland, UK',55.9533,-3.1883,'EGPH','city'],
 ['Dublin','Ireland',53.3498,-6.2603,'EIDW','city'],['Oslo','Norway',59.9139,10.7522,'ENGM','city'],['Stockholm','Sweden',59.3293,18.0686,'ESSA','city'],
 ['Helsinki','Finland',60.1699,24.9384,'EFHK','city'],['Prague','Czechia',50.0755,14.4378,'LKPR','city'],['Vienna','Austria',48.2082,16.3738,'LOWW','city']
];

function seeded(s: number) {
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function demoAreas(): Area[] {
  const rand = seeded(7);
  const statuses: Status[] = ["requested", "requested", "requested", "requested", "progress", "released"];
  const generated = CITIES.map(([name, region, lat, lon, icao, cat], i) => ({
    id: 100 + i,
    name,
    region,
    icao,
    cat,
    status: statuses[Math.floor(rand() * statuses.length)],
    votes: Math.floor(rand() * rand() * 240) + 3,
    voted: false,
    by: "sample_user",
    date: NOW - Math.floor(rand() * 120) * DAY,
    notes: "",
    shape: { type: "circle", center: [lat, lon], radius: 1500 + Math.floor(rand() * 40) * 100 } as Shape,
    comments: [],
  }));
  return [...samples, ...generated].map((a) => ({
    ...a,
    id: "demo-" + a.id,
    country: countryOf(a.region),
    comments: a.comments.map((c: object, i: number) => ({ ...c, id: `demo-${a.id}-${i}` })),
  }));
}
