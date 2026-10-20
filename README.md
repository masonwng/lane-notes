# Lane notes

A small League of Legends laning journal with searchable champion portraits and matchup item suggestions. Log a matchup, role, CS at 10 and 15, gold difference, deaths before 15, and what to try next game. Search previous entries and export a JSON backup. No account, server, Riot API, or tracking.

Live: https://masonwang.dev/projects/lane-notes/index.html

## Run

```
npm test
npm start
```

Champion portraits, class tags and item icons are a local Data Dragon snapshot from patch 16.20.1. No dependencies to install. Tests need Node 20+; the local server uses Python 3. Open http://localhost:4174.

## Storage

Entries live only in this browser’s localStorage, under `lane-notes:entries:v1`. Clearing browser storage deletes entries. Export backups before clearing data or moving devices. Exports are JSON for archival; this version does not import backups or sync between devices. Entries are rendered as plain text. Deletions ask for confirmation. Saved field values are validated again on load.

This is an unofficial fan project, not endorsed by Riot Games. No third-party artwork is used.

## Matchup recommendations

`builds.js` contains hand-authored starter builds for common champions, class-based fallback builds, and a few specific matchup notes. It adjusts boot and defensive/anti-heal suggestions for the opposing champion, selected role, and editable damage/pressure profile. Auto damage uses Riot’s broad attack/magic ratings as a heuristic, not actual damage percentages. Support and jungle roles get an explicit reminder to buy their role’s starting item. The suggestions are not live statistics, optimal builds, or predictions. Visitors can change the damage estimate and pressure type. Item and champion artwork belongs to Riot Games.
