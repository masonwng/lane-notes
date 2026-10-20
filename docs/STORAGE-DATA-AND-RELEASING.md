# Storage, assets, and publishing

## Browser storage and privacy

Journal entries are stored under `lane-notes:entries:v1` in this browser's localStorage. Theme uses `lane-notes:theme`. There is no account, server database, cloud sync, or collection of Riot account information. Changing browser, profile, device, or site origin does not carry entries across. Clearing site data removes them.

Each entry contains:

| Field | Meaning |
| --- | --- |
| `id` | Browser-generated UUID |
| `champion`, `opponent` | Trimmed entered champion names |
| `role` | Top, Jungle, Mid, ADC, or Support |
| `date` | Valid calendar date in YYYY-MM-DD format |
| `cs10`, `cs15` | Whole-number CS values; CS at 15 must not be below CS at 10 |
| `gold` | Optional whole-number difference at 15, positive or negative |
| `deaths` | Whole-number deaths before 15 |
| `notes` | What happened in lane |
| `next` | One thing to try next game |

The damage/pressure overrides and displayed build are not currently persisted in entries. Existing entries are validated again on load. Invalid records are excluded. User text is rendered through `textContent`, not interpreted as HTML.

A failed write does not announce success. If storage is unavailable at startup, the app supports a temporary session and tells the visitor to export before leaving. Export creates a JSON download with app/version, export time, and all in-memory entries. It is a backup/archive format; this version has no import UI. Deleting an entry asks for confirmation and has no in-app undo, so export important data first.

History filtering searches champion, opponent, role, and note text locally. Display order is descending by entry date. No request is made to a recommendation service when searching or entering notes.

## Riot data

The current snapshot is Data Dragon patch `16.20.1`, with 173 champion portraits and selected item icons/metadata. Champion records preserve Riot IDs, names, class tags, broad attack/magic ratings, and resource type. The recommendation model itself is hand-authored in `builds.js`.

Sources:

- [Riot Data Dragon documentation](https://developer.riotgames.com/docs/lol#data-dragon)
- `https://ddragon.leagueoflegends.com/cdn/<patch>/data/en_US/champion.json`
- `https://ddragon.leagueoflegends.com/cdn/<patch>/data/en_US/item.json`
- Versioned champion and item image URLs in those records.

Riot Games owns the names and artwork. Retain the visible fan-project notice and source credit. Third-party art is not original project code. There is no API key, background patch updater, live matchup feed, or account integration.

## Refreshing a patch

Fetch the chosen champion and item snapshots. Update `champions.json`, its version, resource fields, portrait files, and any newly referenced item icons. Review each hand-authored build and matchup explanation for removed or changed items. Run tests and manually compare a physical, magic, sustain, crowd-control, support, and jungle matchup. Update README references if the patch or data count changes.

## Release path

Source: `masonwng/lane-notes`, branch `main`. The public deployment at `https://masonwang.dev/projects/lane-notes/index.html` is a static snapshot in `masonwng/mason-portfolio`.

Keep the checkouts as siblings named `lane-notes`, `league-itemle`, and the portfolio directory. From the portfolio run `node scripts/sync-projects.mjs`, commit the refreshed snapshot, run its lint/build, and deploy the existing Vercel project when authorized. Push source changes here as well. Source pushes alone do not refresh the portfolio copy.

Do not commit exported journals, user sample entries, credentials, `.env`, `.vercel`, or private screenshots. The repository tests use clearly identified in-memory examples rather than real journal exports.
