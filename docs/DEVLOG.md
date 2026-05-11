# Dev Log

## 2026-05-04

- Set up project. Vite. Client and server. Basic routing.
- Backend can send learning data (one array) to frontend. User can practice copying. Frontend sends back result.

## 2026-05-05

- added context
- adapted types and data to accept more than one list
- frontend can now update db. backend takes result and mutates json.

## 2026-05-06

- added three levels of practice.
- backend finds due cards
- basic styling
- updated json

## 2026-05-07

- saves after every level 3, which means I no longer need a current number useState. I can just pop off the list until list is empty.
- updated learning data
- a little styling
- taks are sorted by level. highest level gets priority. review is always priority in learning.
- to solve flash of loading screen between cards, I added a updating state which only affects the button, keeping the card visible until it is replaced by next card.
- added useRef for scrolling

## 2026-05-08

- refactored taks feature into controller, domain, repo, routes, service and types.
- incorporated result pattern error handling with attempt.ts
- refactored practice.tsx by creating usePracticeSession.ts

## 2026-05-08

- added function to create blanks. number of levels and difficulty can be set in tasks.domain eg const DIFFICULTY = [0, 0.3, 0.6]
- removed NotFound. everything now redirects to '/'
  `<Route path="*" element={<Practice key={currentBranch} />} />`
- set a limit of level 350 (30 days) for review

  NEXT:
  [ ] settings management
  [ ] list management, add lists, delete lists, add cards, delete cards, edit cards
  [ ] improve review algorithm, 350 levels.... (go exponential)
