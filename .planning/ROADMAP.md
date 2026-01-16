# AI or Not — Roadmap

## Milestone 1: v1.0 MVP

### Phase 1: Foundation
**Goal:** Project scaffolding with Expo, navigation, and TypeScript configuration

- Initialize Expo managed workflow project
- Configure TypeScript with strict mode
- Set up React Navigation (stack navigator)
- Create basic screen structure (Game, Results)
- Configure ESLint and Prettier

**Research flag:** None — standard React Native setup

---

### Phase 2: Card Stack
**Goal:** Swipeable card component with buttery smooth gesture physics

- Build card component with image display
- Implement swipe gesture handling (react-native-gesture-handler)
- Add swipe animations with react-native-reanimated
- Create card stack manager (preload next cards)
- Fine-tune gesture physics for satisfying feel

**Research flag:** Gesture libraries and physics tuning

---

### Phase 3: Educational Overlay
**Goal:** Bottom sheet overlay showing results after each swipe

- Implement bottom sheet component
- Build Real image result view (photographer, source link)
- Build AI image result view (model, tells list)
- Add correct/incorrect feedback styling
- Create "Next" button to advance to next card

**Research flag:** None — standard UI components

---

### Phase 4: API Integration
**Goal:** Remote API service for fetching image cards

- Define API client with fetch/axios
- Implement image card fetching endpoint
- Add image preloading for smooth UX
- Handle loading states and errors
- Implement offline fallback (cached cards)

**Research flag:** API design and caching strategy

---

### Phase 5: Progression
**Goal:** Streak tracking and difficulty progression

- Implement streak counter (current/best)
- Add streak persistence (AsyncStorage)
- Build difficulty selection UI
- Filter cards by difficulty level
- Add visual feedback for streaks (animations)

**Research flag:** None — standard state management

---

### Phase 6: Authentication
**Goal:** User accounts for saved progress across devices

- Integrate authentication provider (Expo AuthSession or similar)
- Build login/signup screens
- Sync streak data to user account
- Handle auth state throughout app
- Implement logout and account management

**Research flag:** Auth provider selection (Firebase, Supabase, etc.)

---

## Progress

| Phase | Status | Completed |
|-------|--------|-----------|
| 1. Foundation | Not Started | — |
| 2. Card Stack | Not Started | — |
| 3. Educational Overlay | Not Started | — |
| 4. API Integration | Not Started | — |
| 5. Progression | Not Started | — |
| 6. Authentication | Not Started | — |

---
*Last updated: 2026-01-15*
