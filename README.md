
# 💪 FitLog — Workout Library

FitLog is a responsive workout library and planning application built to make workout discovery, planning, and tracking simple and organized. Users can explore workouts, view detailed exercise information, build a daily workout plan, mark workouts as completed, and save workouts for later.

The application is designed to provide a smooth and responsive experience across mobile, tablet, and desktop devices.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js** | Application framework and UI development |
| **React** | Building reusable UI components |
| **TypeScript** | Type-safe JavaScript development |
| **Tailwind CSS** | Styling and responsive design |
| **Next.js App Router** | Routing and page navigation |
| **React Hot Toast** | User feedback and toast notifications |
| **Lucide React** | Icons used throughout the application |
| **Local Storage** | Persisting plan and saved workout data |

---

## ✨ Key Features

### 1. 🏋️ Workout Library
Browse all available workouts from the FitLog API in a responsive workout library. Each workout card displays useful information such as muscle groups, equipment, duration, calories, and rating.

### 2. 📋 Workout Details
Open an individual workout to view detailed information, including:

- Equipment
- Difficulty level
- Sets and reps
- Duration
- Calories
- Rating
- Exercise instructions

Users can add the workout to today's plan or save it for later directly from the details page.

### 3. 📅 Today's Plan
Build a personalized workout plan for the day with up to **five workouts**.

The plan provides live totals for:

- Exercises
- Minutes
- Calories

Users can also view workout details, mark workouts as done, and remove workouts from the plan.

### 4. 🔖 Saved Workouts
Save interesting workouts for later and access them from the **Saved** tab on the My Plan page.

### 5. 💾 Persistent & Responsive Experience
Today's Plan and Saved Workouts are stored using `localStorage`, allowing the data to remain available after refreshing the browser.

The application is fully responsive and optimized for mobile, tablet, and desktop screens.

---

## 📸 Screenshot
<img width="1336" height="646" alt="image" src="https://github.com/user-attachments/assets/24b81012-3bdf-46e0-b3b9-33593b0f47ba" />


---

## 🚀 Additional Features

- Sort workouts by **Duration**, **Calories**, or **Rating**
- Dynamic Plan and Saved counters in the navbar
- Toast notifications for important user actions
- Loading states while workout data is being fetched
- Custom 404 page for invalid routes
- Responsive workout card grid
- Live workout statistics
- Mark workouts as completed
- Remove workouts from today's plan
- Smooth navigation using the Next.js App Router

---

## 📦 Dependencies

The main dependencies used in this project include:

```text
next
react
react-dom
react-hot-toast
lucide-react
```

Development and styling dependencies include:

```text
typescript
tailwindcss
eslint
```

> For the exact dependency versions used by the project, check the `package.json` file.

---

## 🔌 API

FitLog uses the provided FitLog API to retrieve workout information.

### Get All Workouts

```text
https://api.api-store.workers.dev/api/fitlog
```

### Get a Single Workout

```text
https://api.api-store.workers.dev/api/fitlog/:id
```

Replace `:id` with the ID of the workout you want to retrieve.

---

## ⚙️ Run the Project Locally

Follow these steps to run FitLog on your local machine.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd YOUR_PROJECT_FOLDER_NAME
```

### 3. Install Dependencies

Using npm:

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open the following address in your browser:

```text
http://localhost:3000
```

The application should now be running locally.

---

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

---

## 📱 Responsive Design

FitLog is designed to work across different screen sizes:

- 📱 **Mobile**
- 📟 **Tablet**
- 💻 **Desktop**

The workout grid, navigation, hero section, workout details, and My Plan interface automatically adapt to the available screen size.

---

## 🌐 Live Demo

🔗 **Live Website:** [FitLog Live](https://fit-log-tracker.vercel.app/)

🔗 **GitHub Repository:** [FitLog Repository](https://github.com/say33eed/fit-log)

---

## 📄 Project Summary

FitLog combines workout discovery, planning, saving, and progress tracking in one responsive application. It demonstrates modern frontend development using Next.js, React, TypeScript, and Tailwind CSS while providing persistent client-side workout planning through local storage.

