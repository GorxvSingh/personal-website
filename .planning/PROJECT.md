# AI or Not

A Tinder-style mobile game to train media literacy. Users swipe to guess if images are "Real" or "AI-Generated," then learn why through educational overlays.

## Vision

Help people develop intuition for spotting AI-generated images through gamified practice. The familiar swipe mechanic lowers friction while the educational overlay transforms each guess into a learning moment.

**Core Priority:** The swipe feel must be buttery smooth and satisfying. The interaction is the product.

## User Flow

1. User sees a card with an image
2. User swipes:
   - **RIGHT** = Guessing "AI"
   - **LEFT** = Guessing "Real"
3. Card stays visible, bottom sheet slides up with:
   - If Real: Photographer credit and source link
   - If AI: Specific "tells" (e.g., "Look at the hands," "Texture is too smooth")
4. User taps "Next" to dismiss overlay and see next card

## Data Model

```typescript
interface ImageCard {
  id: string;
  imageUrl: string;
  isAi: boolean; // The source of truth
  difficulty: 'easy' | 'medium' | 'hard';
  metadata: {
    // For Real Images
    photographerName?: string;
    sourceUrl?: string;
    // For AI Images
    aiModel?: string; // e.g. "Midjourney v6"
    tells?: string[]; // e.g. ["The left hand has 6 fingers", "Background text is gibberish"]
  };
}
```

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Swipeable card stack with smooth, satisfying gesture physics
- [ ] Bottom sheet educational overlay showing result after swipe
- [ ] Real image overlay: photographer name + source link
- [ ] AI image overlay: AI model + list of tells
- [ ] Simple streak counter (current streak, best streak)
- [ ] Remote API integration for fetching image cards
- [ ] User authentication for saved progress across sessions
- [ ] Difficulty progression (easy/medium/hard)

### Out of Scope

- User-submitted content — curated content only for v1
- Leaderboards/social features — no competing with others
- Android support — iOS only for v1

## Technical Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React Native + Expo | Faster iteration, simpler builds, sufficient for iOS-only | Pending |
| iOS only | Focused scope, ship faster, expand later | Confirmed |
| Remote API | Fresh content, easy updates without app releases | Pending |
| Bottom sheet overlay | Keeps image visible during explanation | Confirmed |

## Constraints

- None specified — open to recommendations

## Target Platform

- iOS (iPhone)

---
*Last updated: 2026-01-15 after initialization*
