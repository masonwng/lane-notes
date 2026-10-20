# Lane notes

A small League of Legends laning journal. Log a matchup, role, CS at 10 and 15, gold difference, deaths before 15, and what to try next game. Search previous entries and export a JSON backup. No account, server, Riot API, or tracking.

Live: https://masonwang.dev/projects/lane-notes/index.html

## Run

```
npm test
npm start
```

No dependencies to install. Tests need Node 20+; the local server uses Python 3. Open http://localhost:4174.

## Storage

Entries live only in this browser’s localStorage, under `lane-notes:entries:v1`. Clearing browser storage deletes entries. Export backups before clearing data or moving devices. Exports are JSON for archival; this version does not import backups or sync between devices. Entries are rendered as plain text. Deletions ask for confirmation. Saved field values are validated again on load.

This is an unofficial fan project, not endorsed by Riot Games. No third-party artwork is used.
