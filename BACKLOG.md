# BluffBall — backlog

Running list of ideas and known rough edges, roughly in priority order. Nothing
here is blocking; the site works today. Captured during the 2026-06 review.

## Known limitations / tech debt

- [ ] **Game cache never expires.** `gamesCache` lives for the browser session.
      Leave the tab open overnight and "yesterday's" results go stale. Add a
      timestamp + TTL (refetch after ~30 min, or when the calendar date rolls).
- [ ] **Duplicate in-flight fetches.** The cache stores the resolved result, not
      the pending promise, so rapidly switching sports can fire the same fetch
      twice. Cache the promise to dedupe.
- [ ] **Season cue is color-only.** In-season is signalled by red text + a
      legend. Add a non-color indicator (e.g. a "• in season" tag) for
      colorblind users — red text vs the green active tab is the worst case.
- [ ] **Tabs lack ARIA roles.** Add `role="tablist"`/`role="tab"` and
      `aria-selected` so screen readers announce the selected sport.
- [ ] **ESPN endpoint is unofficial** and could change without notice. Today we
      fail soft to canned lines. For resilience, add **Option B**: a GitHub
      Actions cron job that fetches once or twice a day and commits a small
      `scores.json` the site reads locally (needs `workflow` token scope).

## Content / authenticity

- [ ] **Tie wording.** "played out a draw" fits soccer; a (rare) NFL tie would
      read oddly. Make tie phrasing sport-specific.
- [ ] **Bigger phrase pools** per sport — more openers/closers, and
      event-aware lines (playoffs, finals, opening day, trade deadline).
- [ ] **Soccer league choice.** We follow the big European leagues (Aug–May),
      so soccer isn't "in season" in June/July. Decide whether to lean MLS
      (roughly Feb–Dec) for the American audience, or auto-pick by what's on.
- [ ] **More competitions** — College Football, March Madness, Champions
      League, World Cup, etc.

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
