/* BluffBall — your guide to sounding like you watched the game.
 *
 * In the spirit of bluffball.co.uk from The IT Crowd (S03E02, "Are We Not Men?").
 * The whole trick: lines vague enough to be true of almost any game, delivered
 * with total confidence. Open with the classic, nod along, escape cleanly.
 */

const SPORTS = {
  soccer: {
    label: "Football",
    note: "(the proper kind, with the round ball)",
    emoji: "⚽",
    // The original. Roy's way in with "proper men."
    openers: [
      "Did you see that ludicrous display last night?",
      "What a game that was last night, eh?",
      "Can't believe what I watched last night, honestly.",
    ],
    lines: [
      "The thing about Arsenal is, they always try to walk it in.",
      "What was the manager thinking, bringing him on that early?",
      "He should've squared it. Greedy, that.",
      "They've been all over the place at set pieces all season.",
      "No width, that's their problem. No width at all.",
      "You've got to take your chances at this level.",
      "He's been playing him out of position for weeks.",
      "It's a game of two halves, isn't it.",
      "They left themselves too open at the back.",
      "VAR's ruining the game, I'll tell you that for nothing.",
    ],
    closers: [
      "Mind how you go.",
      "Anyway. Back to it.",
      "Still. There's always the replay.",
      "Football, eh? Bloody hell.",
    ],
    panic: "Tell you what though, the ref didn't help.",
  },

  nfl: {
    label: "American Football",
    note: "(downs, helmets, the works)",
    emoji: "🏈",
    openers: [
      "Did you see that ludicrous display last night?",
      "Man, what a game last night.",
      "You catch the game last night? Unreal.",
    ],
    lines: [
      "They've got to establish the run to set up play-action.",
      "You can't abandon the run game in the second half like that.",
      "That's on the o-line, honestly — gave him no time in the pocket.",
      "Their red-zone offense has been a problem all year.",
      "Should've thrown the challenge flag — he had the ball.",
      "Too many guys trying to make a play instead of doing their job.",
      "You've got to win the turnover battle in a game like that.",
      "Their secondary's been getting torched all season.",
      "Clock management at the end was a clinic in what not to do.",
      "Defense kept them in it, give 'em that.",
    ],
    closers: [
      "Anyway — long season.",
      "It is what it is.",
      "On to next week.",
      "Football's a funny game.",
    ],
    panic: "Refs were throwing flags all game, though.",
  },

  nba: {
    label: "Basketball",
    note: "(hoops)",
    emoji: "🏀",
    openers: [
      "Did you see that ludicrous display last night?",
      "That game last night was something else.",
      "You see what happened in the fourth last night?",
    ],
    lines: [
      "They settled for too many threes down the stretch.",
      "You've got to make them play in the half-court.",
      "He's a liability on the defensive end, plain and simple.",
      "They need to get out in transition more.",
      "Too much hero ball in the clutch.",
      "Their bench gave them nothing tonight.",
      "You can't give up second-chance points like that.",
      "He took the night off on defense, did you notice?",
      "Spacing was a mess all game.",
      "It's an 82-game season — you can't read too much into one.",
    ],
    closers: [
      "Long season, though.",
      "Anyway. They'll be fine.",
      "Ball don't lie.",
      "On to the next one.",
    ],
    panic: "Refs were calling everything tonight, though.",
  },

  mlb: {
    label: "Baseball",
    note: "(America's pastime)",
    emoji: "⚾",
    openers: [
      "Did you see that ludicrous display last night?",
      "Some ballgame last night, huh.",
      "You stay up for the game last night?",
    ],
    lines: [
      "He left it over the plate, simple as that.",
      "You've got to manufacture runs in a game like that.",
      "The bullpen's been their problem all season.",
      "He was sitting dead-red on that pitch.",
      "Should've gone to the pen an inning earlier.",
      "They left too many runners in scoring position.",
      "That's just situational hitting, and they don't do it.",
      "Defense up the middle won them that game.",
      "He's been pressing at the plate lately.",
      "Long season. It'll even out.",
    ],
    closers: [
      "That's baseball.",
      "162 games, though.",
      "Anyway. There's a day game tomorrow.",
      "Can't win 'em all.",
    ],
    panic: "Ump's zone was all over the place, though.",
  },

  nhl: {
    label: "Hockey",
    note: "(the ice kind)",
    emoji: "🏒",
    openers: [
      "Did you see that ludicrous display last night?",
      "What a game last night, eh.",
      "You catch the game last night?",
    ],
    lines: [
      "They've got to crash the net more.",
      "Can't be taking those lazy penalties in your own end.",
      "He needs to shoot more from the point.",
      "Their power play has been ice cold.",
      "Get pucks deep and forecheck, that's the whole game.",
      "Goalie stood on his head, kept them in it.",
      "They got caught flat-footed on the rush all night.",
      "You've got to win your battles along the boards.",
      "Too many turnovers at the blue line.",
      "Just one of those puck-luck nights, honestly.",
    ],
    closers: [
      "Anyway. Long road trip ahead.",
      "Hockey, eh.",
      "On to the next one.",
      "They'll bounce back.",
    ],
    panic: "Refs put the whistle away out there, though.",
  },
};

/* ---- what's in season (US-centric, by month) ----
 *
 * Two things drive off this: which sport the page opens on, and which sport
 * names get the red "in season" treatment. Months are 1-based. */

// Months each sport is in season (regular season through finals).
const IN_SEASON_MONTHS = {
  nfl: [9, 10, 11, 12, 1, 2], // Sep kickoff → early-Feb Super Bowl
  nba: [10, 11, 12, 1, 2, 3, 4, 5, 6], // Oct → June Finals
  mlb: [4, 5, 6, 7, 8, 9, 10], // Apr → Oct World Series
  nhl: [10, 11, 12, 1, 2, 3, 4, 5, 6], // Oct → June Stanley Cup
  soccer: [8, 9, 10, 11, 12, 1, 2, 3, 4, 5], // big leagues Aug → May
};

// The marquee American sport to open on, per month — when several overlap,
// pick the one most people are actually talking about that month.
const DEFAULT_US_SPORT_BY_MONTH = {
  1: "nfl", // playoffs
  2: "nfl", // Super Bowl
  3: "nba",
  4: "mlb", // opening day
  5: "nba", // playoffs
  6: "nba", // Finals
  7: "mlb", // All-Star
  8: "mlb",
  9: "nfl", // football's back
  10: "nfl",
  11: "nfl",
  12: "nfl",
};

function currentMonth() {
  return new Date().getMonth() + 1;
}

function isInSeason(key, month) {
  return (IN_SEASON_MONTHS[key] || []).indexOf(month) !== -1;
}

function defaultSport(month) {
  return DEFAULT_US_SPORT_BY_MONTH[month] || "nfl";
}

/* Deterministic per day so the site feels "updated daily" — same bluff for
 * everyone on a given date, a fresh one tomorrow. */
function dailySeed(dateStr) {
  let h = 2166136261;
  for (let i = 0; i < dateStr.length; i++) {
    h ^= dateStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function buildBluff(sportKey, seed) {
  const s = SPORTS[sportKey];
  // Spread the seed across the three slots so they don't move in lockstep.
  return {
    opener: pick(s.openers, seed),
    line: pick(s.lines, Math.floor(seed / 7) + 1),
    closer: pick(s.closers, Math.floor(seed / 13) + 2),
    panic: s.panic,
  };
}

/* ---- real games (ESPN public scoreboard JSON — no key, CORS open) ----
 *
 * We keep the iconic generic opener, and graft a TRUE fact (who beat whom, the
 * score) onto the front of the vague analysis line. Fact + waffle = a bluff
 * that survives an informed nod. If there are no games (offseason) or the
 * fetch fails, we silently keep the canned line. */

const ESPN_PATHS = {
  nfl: ["football/nfl"],
  nba: ["basketball/nba"],
  mlb: ["baseball/mlb"],
  nhl: ["hockey/nhl"],
  // Try a few big leagues; first one with finished games wins.
  soccer: ["soccer/eng.1", "soccer/usa.1", "soccer/esp.1", "soccer/ger.1"],
};

const gamesCache = {}; // sportKey -> array of parsed completed games (per session)

function yesterdayYMD() {
  const d = new Date(Date.now() - 86400000);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return "" + d.getFullYear() + m + day;
}

function parseEvent(e) {
  const comp = e.competitions && e.competitions[0];
  if (!comp) return null;
  const done =
    (e.status && e.status.type && e.status.type.completed === true) ||
    (e.status && e.status.type && e.status.type.state === "post");
  if (!done) return null;
  const cs = comp.competitors || [];
  const home = cs.find((c) => c.homeAway === "home");
  const away = cs.find((c) => c.homeAway === "away");
  if (!home || !away) return null;
  const hs = parseInt(home.score, 10);
  const as = parseInt(away.score, 10);
  if (isNaN(hs) || isNaN(as)) return null;
  const nm = (t) =>
    (t.team &&
      (t.team.shortDisplayName || t.team.displayName || t.team.name)) ||
    "the other lot";
  return { home: nm(home), away: nm(away), hs: hs, as: as };
}

async function fetchScoreboard(path) {
  const base =
    "https://site.api.espn.com/apis/site/v2/sports/" + path + "/scoreboard";
  // Yesterday first (for that "last night" feel), then today's slate.
  const urls = [base + "?dates=" + yesterdayYMD(), base];
  const out = [];
  for (const url of urls) {
    try {
      const r = await fetch(url);
      if (!r.ok) continue;
      const d = await r.json();
      (d.events || []).forEach((ev) => out.push(ev));
    } catch (e) {
      /* network hiccup — try the next url */
    }
  }
  return out;
}

async function getCompletedGames(sportKey) {
  if (gamesCache[sportKey]) return gamesCache[sportKey];
  const paths = ESPN_PATHS[sportKey] || [];
  let games = [];
  for (const p of paths) {
    const events = await fetchScoreboard(p);
    games = events.map(parseEvent).filter(Boolean);
    if (games.length) break; // good enough from the first league with results
  }
  gamesCache[sportKey] = games;
  return games;
}

function realResultSentence(sportKey, g) {
  if (g.hs === g.as) {
    return g.home + " and " + g.away + " played out a " + g.hs + "–" + g.as +
      " draw.";
  }
  const homeWon = g.hs > g.as;
  const winner = homeWon ? g.home : g.away;
  const loser = homeWon ? g.away : g.home;
  const ws = homeWon ? g.hs : g.as;
  const ls = homeWon ? g.as : g.hs;
  // US sports take "the" before the nickname; soccer clubs don't.
  const the = sportKey === "soccer" ? "" : "the ";
  return winner + " beat " + the + loser + " " + ws + "–" + ls + ".";
}

/* ---- wiring ---- */

let currentSport = "soccer";
let renderToken = 0; // guards against a slow fetch landing after a sport switch

function setText(id, txt) {
  const el = document.getElementById(id);
  if (el) el.textContent = txt;
}

function todayString() {
  const d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function render(seed) {
  const token = ++renderToken;
  const sportKey = currentSport;
  const s = SPORTS[sportKey];
  const b = buildBluff(sportKey, seed);

  setText("opener", b.opener);
  setText("line", b.line);
  setText("closer", b.closer);
  setText("panic-line", b.panic);
  setText("sport-emoji", s.emoji);
  setText("sport-note", s.note);
  document.getElementById("real-badge").classList.add("hidden");

  enrichWithRealGame(sportKey, seed, token);
}

// Try to replace the vague line with "<real result>. <vague line>".
async function enrichWithRealGame(sportKey, seed, token) {
  try {
    const games = await getCompletedGames(sportKey);
    if (token !== renderToken) return; // user switched sport/rolled again
    if (!games || !games.length) return; // offseason / none → keep canned line
    const g = games[Math.abs(seed) % games.length];
    const fact = realResultSentence(sportKey, g);
    if (!fact) return;
    // Avoid canned lines that name a specific team (e.g. the Arsenal one) —
    // they'd contradict the real matchup we just stated.
    let vague = buildBluff(sportKey, seed).line;
    if (/Arsenal/.test(vague)) {
      const pool = SPORTS[sportKey].lines.filter((l) => !/Arsenal/.test(l));
      vague = pool[Math.abs(seed) % pool.length];
    }
    setText("line", fact + " " + vague);
    document.getElementById("real-badge").classList.remove("hidden");
  } catch (e) {
    /* keep the canned line — never show a broken card */
  }
}

function renderDaily() {
  render(dailySeed(todayString() + currentSport));
}

function init() {
  // Open on whatever American sport is the marquee event this month.
  const month = currentMonth();
  currentSport = defaultSport(month);

  // Build the sport tabs.
  const tabs = document.getElementById("tabs");
  Object.keys(SPORTS).forEach((key) => {
    const btn = document.createElement("button");
    btn.className =
      "tab" +
      (key === currentSport ? " active" : "") +
      (isInSeason(key, month) ? " in-season" : "");
    btn.dataset.sport = key;
    btn.innerHTML = SPORTS[key].emoji + " " + SPORTS[key].label;
    btn.addEventListener("click", () => {
      currentSport = key;
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.toggle("active", t.dataset.sport === key));
      renderDaily();
    });
    tabs.appendChild(btn);
  });

  // "Give me another" — random, not tied to the date.
  document.getElementById("another").addEventListener("click", () => {
    render((Math.random() * 1e9) >>> 0);
  });

  // Panic button reveal.
  document.getElementById("panic-btn").addEventListener("click", () => {
    document.getElementById("panic-box").classList.toggle("hidden");
  });

  // Date stamp.
  document.getElementById("date").textContent = new Date().toLocaleDateString(
    undefined,
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  renderDaily();
}

document.addEventListener("DOMContentLoaded", init);
