# Architecture and matchup suggestions

## Runtime

Lane notes is a static, dependency-free browser app. `index.html` owns the form, build panel, history, export control, and champion-picker dialog. `style.css` supports responsive light/dark layouts. No authentication, server, analytics service, or live Riot API is used.

| File | Responsibility |
| --- | --- |
| `app.js` | Validate/save journal entries, filter/render history, export JSON, toggle theme |
| `core.js` | Entry validation and defensive parsing of saved data |
| `matchup.js` | Load local champion/item data, searchable portrait picker, suggestions UI, history portraits |
| `builds.js` | Hand-authored core builds, class fallbacks, damage estimates, situational item explanations |
| `champions.json` | Pinned champion IDs/names/classes/ratings/resources and selected item metadata |
| `assets/champions/`, `assets/items/` | Local Riot artwork |
| `core.test.js`, `builds.test.js` | Data, asset, validation, and recommendation checks |

## Champion interaction

The two text inputs accept champion names and provide a native datalist. Portrait buttons open a native modal with search by name or class. Selecting a portrait updates the appropriate field, closes the modal, restores focus, and recomputes suggestions. Normalization handles punctuation/case differences in names. The matchup banner and saved history show local portraits when the names can be resolved. Unknown manual names can still be logged, but cannot produce a champion build or portrait.

Changing champion, opponent, role, damage type, or pressure updates the displayed suggestions. Form statistics are not required to explore a build. The recommendation inputs are exploratory UI state, not a prediction model or live game connection.

## Recommendation layers

1. Use a hand-authored core build for a supported champion. Otherwise use Riot class tags to choose a generic baseline. Support role uses its role-based fallback.
2. Estimate enemy pressure from Riot's broad champion ratings unless the visitor overrides it. A magic rating at least three above attack produces `magic`; attack at least three above magic produces `physical`; otherwise use `mixed`. These scores are not actual damage percentages.
3. Select a boot idea for magic pressure/crowd control, attack pressure, or a class baseline. An explicit note explains the tradeoff and that tenacity does not shorten knockups.
4. Add an anti-heal component for a healing matchup, using manually maintained champion sets or the visitor's pressure override.
5. Add situational defensive items where appropriate for the player's class and opponent pressure. Physical defense checks the player's resource so manaless champions are not automatically directed to a mana item.
6. Show a specific matchup note when one is hand-authored; otherwise explain the class/pressure fallback. Jungle/support roles get a reminder to purchase the appropriate role starter before treating these as later item ideas.

The result is not a complete purchase order, live meta ranking, win-rate analysis, best-in-slot guarantee, or optimal answer for every champion/role. Team composition, patch changes, lane state, gold, and player preference still matter. The interface explicitly labels the limitations and lets visitors override broad estimates.

## Extending builds

Edit `profiles` for champion-specific item IDs, and the matchup-note table for directed pairs such as `Garen:Darius`. A pair's reverse direction is a separate entry. Review healing/CC sets when adding champions. Add new items to the local metadata and icon directory before referencing them. Keep explanations conditional rather than inventing performance claims.

Run `npm test`. The suite checks valid/invalid entries, corrupted storage, champion portraits, referenced recommendation icons, physical versus magic adjustments, healing pressure, and role-specific guidance. Browser-check the portrait modal with mouse and keyboard, override controls, notes save/reload, history portraits, filtering, export, both themes, and phone layout.
