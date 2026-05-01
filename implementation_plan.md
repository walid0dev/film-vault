# Rating System Implementation Plan

## Problem and approach
The app already uses `rating` (0-10) and `votes` as IMDb-style source data for sorting, filtering, Hero, Featured, and list ordering.  
To add a user-facing rating system while respecting the project constraint (**only `useState` and `useEffect`**), we should keep the current custom store pattern (`app-store.ts` + `useAppStore`) and extend movie data with user-rating fields instead of introducing Context/Reducer/external state libs.

The safest approach is:
1. Keep existing IMDb fields (`rating`, `votes`) intact.
2. Add user rating on a 1-5 star scale.
3. Compute a derived "effective" score used by current sorting/filtering logic so user ratings influence rank and filters without rewriting the whole app architecture.

## Todos
1. Audit current rating flow
   - Confirm every place `movie.rating` is used (`Hero`, `Featured`, `MovieList`, detail card, filter utilities).
   - Identify all spots that must switch to derived/effective rating.

2. Extend movie model for user rating
   - Update `Movie` type with user-rating field(s), e.g. `userRating?: number | null`.
   - Add normalization helper(s) to safely handle old records loaded from `localStorage`.

3. Add rating actions in store
   - In `src/store/app-store.ts`, add actions to set/clear a movie’s user rating.
   - Keep immutable update behavior and existing subscription mechanism.

4. Build reusable rating UI
   - Create `src/components/Rating.tsx` (star control + display mode).
   - Wire interactive rating first in `MovieCardExpanded` (best context for per-movie actions).

5. Wire derived rating into core logic
   - In `src/hooks/index.ts`, introduce a helper for effective score (0-10 compatible).
   - Update sorting/filtering (`getSortedMovies`, `getVisibleMovies`) to use effective score.
   - Update Hero/Featured/list card displays to show user-aware rating consistently.

6. Persistence and migration
   - Ensure persisted movies include new user-rating field.
   - Migrate older `localStorage` entries that lack the new field without data loss.

7. Form and data-source clarity
   - Keep IMDb fields in form explicit as source metadata, while user star rating is managed via rating UI.
   - Avoid mixing IMDb and user-edit interaction in one ambiguous input.

8. End-to-end behavior checks
   - Confirm rating updates instantly affect list order, Hero/top 3, filters, and persisted state.
   - Confirm add/edit/delete still behaves correctly with new fields.

## Notes and constraints
- No Context API, `useReducer`, Redux, Zustand, or extra state-management libraries for this feature.
- Continue using current architecture (`useState` + `useEffect` + custom store module).
- Keep existing numeric slider/filter UX stable; adapt via derived score mapping rather than large UI rewrites.
