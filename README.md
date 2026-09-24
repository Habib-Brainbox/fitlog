#  FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion. Pick a lift, lock it into today's plan, and watch the week's work add up.

##  Live Demo
Add your live link here after deploying.

##  Technologies Used
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- React Hot Toast
- React Icons

##  Key Features
1. **Responsive design** for mobile, tablet and desktop.
2. **Workout library** with 12 lifts fetched from an API, shown as cards with tags, equipment, duration, calories and rating.
3. **Sort dropdown** to sort workouts by duration, calories or rating.
4. **Workout details page** with key specs, step-by-step instructions, and Add to today's plan / Save for later buttons.
5. **My Plan page** with live stats, Today's Plan and Saved tabs, Mark as Done and Remove actions.
6. **Toast notifications** and live Plan / Saved badges in the navbar.
7. **localStorage persistence**, a 5-lift plan cap, loading spinners, and a custom 404 page.

##  Getting Started
```bash
git clone https://github.com/Habib-Brainbox/fitlog.git
cd fitlog
npm install
npm run dev
```
Open http://localhost:3000 in your browser.

##  API
- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`