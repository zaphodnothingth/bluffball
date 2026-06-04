# BluffBall — backlog

Running list of ideas and known rough edges, roughly in priority order. Nothing
here is blocking; the site works today. Captured during the 2026-06 review.

## Known limitations / tech debt

- [ ] **Session cache never expires.** `rawCache` / `sportDataCache` live for the
      browser session. Leave the tab open overnight and "yesterday's" results
      and in-season flags go stale. Add a TTL (refetch after ~30 min, or when
      the calendar date rolls).
- [x] ~~**Duplicate in-flight fetches.**~~ Fixed: `getSportData` caches the
      *promise*, so concurrent callers dedupe to one fetch.
- [ ] **Season cue is color-only.** In-season is signalled by red text + a
      legend. Add a non-color indicator (e.g. a "• in season" tag) for
      colorblind users — red text vs the green active tab is the worst case.
- [ ] **Tabs lack ARIA roles.** Add `role="tablist"`/`role="tab"` and
      `aria-selected` so screen readers announce the selected sport.
- [ ] **ESPN endpoint is unofficial** and now also drives in-season detection
      and the default tab. We fail soft to the month-map + canned lines on any
      error, but for resilience add **Option B**: a GitHub Actions cron job that
      fetches a couple times a day and commits a small `scores.json` the site
      reads locally (needs `workflow` token scope).
- [ ] **Default-tab tiebreak is a fixed order** (`TIEBREAK_ORDER`, currently
      NFL > NBA > NHL > MLB > soccer). When two playoffs overlap with games the
      same day (NBA Finals + Stanley Cup, like today), this decides — so it
      opens on NBA. Revisit whether the feed implies a better tiebreak (e.g.
      stage of postseason, or which championship is closer to clinching).

## Content / authenticity

- [ ] **Tie wording.** "played out a draw" fits soccer; a (rare) NFL tie would
      read oddly. Make tie phrasing sport-specific.
- [ ] **Bigger phrase pools** per sport — more openers/closers, and
      event-aware lines (playoffs, finals, opening day, trade deadline).
- [ ] **Per-sport primer + overarching sports knowledge.** Give each sport a
      short grounding layer — the rules-of-thumb, the rivalries, the clichés
      that are always true, the names that are always safe to drop — plus some
      cross-sport "manly small talk" fundamentals. Right now the bluffer has
      one-liners but no backbone; a primer lets lines stay coherent under a
      follow-up and makes new lines easy to author. (Could be data per sport,
      or generated.)
- [x] ~~**Soccer league choice.**~~ Now tracks MLS first (year-round, US
      audience) then EPL/La Liga, and in-season is taken from the live league
      window — so soccer correctly reads in-season in summer (MLS).
- [ ] **College sports.** Add CFB (regular season, bowls, the Playoff) and
      college basketball (esp. **March Madness**) — these are huge cultural
      moments and prime bluffing territory. Also Champions League, World Cup,
      etc. Note: ESPN has paths for these (`football/college-football`,
      `basketball/mens-college-basketball`), so the same season/feed plumbing
      should extend to them.

## Features

- [ ] **"Send to my phone."** Homage to the show, where the site texted you the
      phrases. Start with copy-to-clipboard / Web Share; real SMS needs a paid
      backend.
- [ ] **Pronunciation / audio.** The original was an *elocution* site. Use the
      Web Speech API to read the line aloud in a suitably confident voice.
- [ ] **Pick your team(s)** and bias real results toward them.
- [ ] **Link the real result** to its ESPN box score / recap.
- [ ] **Dark mode** + difficulty levels ("deep cut" mode).

## Polish / meta

- [ ] **Open Graph / Twitter card** meta for nice link previews when shared.
- [ ] **LICENSE** — repo currently has none (consider MIT).
- [ ] **Tiny test harness.** Extract the pure logic (`parseEvent`,
      `realResultSentence`, season helpers) and guard it with a minimal runner.
- [ ] **Custom domain**, if ever wanted.
