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
      "Should've challenged that. Clear loss of possession.",
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
    panic: "The refs swallowed the whistle on that one, though.",
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
    panic: "The officiating was inconsistent both ways, though.",
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
    panic: "Strike zone was all over the place, though.",
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
      "You can't take those penalties — too many men in the box.",
      "He needs to shoot more from the point.",
      "Their power play has been ice cold.",
      "Get pucks deep and forecheck, that's the whole game.",
      "Goalie stood on his head, kept them in it.",
      "They got caught flat-footed on the rush all night.",
      "You've got to win your battles along the boards.",
      "Too many turnovers at the blue line.",
      "It's a 'puck luck' kind of night, honestly.",
    ],
    closers: [
      "Anyway. Long road trip ahead.",
      "Hockey, eh.",
      "On to the next one.",
      "They'll bounce back.",
    ],
    panic: "Reffing was a joke out there, though.",
  },
};

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

/* ---- wiring ---- */

let currentSport = "soccer";

function todayString() {
  const d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function render(seed) {
  const b = buildBluff(currentSport, seed);
  document.getElementById("opener").textContent = b.opener;
  document.getElementById("line").textContent = b.line;
  document.getElementById("closer").textContent = b.closer;
  document.getElementById("panic-line").textContent = b.panic;

  const s = SPORTS[currentSport];
  document.getElementById("sport-emoji").textContent = s.emoji;
  document.getElementById("sport-note").textContent = s.note;
}

function renderDaily() {
  render(dailySeed(todayString() + currentSport));
}

function init() {
  // Build the sport tabs.
  const tabs = document.getElementById("tabs");
  Object.keys(SPORTS).forEach((key) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (key === currentSport ? " active" : "");
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
