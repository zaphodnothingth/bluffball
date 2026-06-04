# BluffBall ⚽🏈🏀⚾🏒

### 👉 Live site: **https://zaphodnothingth.github.io/bluffball/**

> "It sends you a list of football phrases that you can use in normal conversation, updated daily. It's great." — Maurice Moss

A working recreation of **bluffball.co.uk**, the fictional site from *The IT Crowd*
(S03E02, ["Are We Not Men?"](https://en.wikipedia.org/wiki/Are_We_Not_Men%3F_(The_IT_Crowd))),
where Moss and Roy use daily football phrases to pass as "proper men."

The trick is the same as in the show: lines vague enough to be true of almost
any game, delivered with total confidence. Open with the classic —
*"Did you see that ludicrous display last night?"* — nod along, and get out
clean.

Unlike the original (and the other recreations out there), this one isn't
soccer-only. Pick your sport:

- ⚽ **Football** (the proper kind) — the original parlance
- 🏈 **American Football**
- 🏀 **Basketball**
- ⚾ **Baseball**
- 🏒 **Hockey**

## How it works

Pure static site — HTML, CSS, one vanilla JS file. No build step, no
dependencies.

- **Today's bluff** is seeded by the date, so it's the same for everyone on a
  given day and refreshes tomorrow — honoring the show's "updated daily" gag.
- **Give me another** rolls a fresh random combo.
- **They asked a follow-up** reveals an all-purpose escape line. Deploy
  immediately, then change the subject.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

| file | purpose |
| --- | --- |
| `index.html` | markup |
| `styles.css` | styling (pitch-green, retro-ish) |
| `bluff.js` | phrase data + the bluff engine |

## Disclaimer

For entertainment only. Not affiliated with Channel 4 or *The IT Crowd*. At
some point you may have to actually watch a game.

Mind how you go.
