export const CONFIG = {
  // Upvotes
  votes: true,
  // The Map/Leaderboard switch and the leaderboard page
  leaderboard: false,
  // Comments and feedback: turn on once they're connected to Supabase
  database: false,
  supabase: {
    url: "https://wdeeyvzdrsakphgdnwhv.supabase.co",
    key: "sb_publishable_X-K3J7779urJP8FPgA5HJA_F0cl9T7L", // Public by design; the database rules protect the data
  },
  turnstileSiteKey: "0x4AAAAAAF21Ko7dIZpv-zKT",
  // flightsim.to page for the mod
  downloadUrl: "https://flightsim.to/addon/118361/smoother-roads",
  // Requests still go to the Google Form until the database is set up
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScVRxjvCpeIfGorNrgSnyEDUzc5pUqHID3kDfYGQ5CKOJtYPw/viewform",
  formFields: {
    place: "entry.544154387",
    lat: "entry.701741949",
    lon: "entry.1418313407",
    radius: "entry.890763123",
    notes: "entry.1442149465",
  },
};
