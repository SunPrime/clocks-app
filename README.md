# 🌍 TimeSync Dashboard

# 🌍 TimeSync Dashboard

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwind-css)
![Vitest](https://img.shields.io/badge/Coverage-100%25-449d45?style=for-the-badge&logo=vitest)
![Tests](https://github.com/SunPrime/countdown/actions/workflows/ci.yaml/badge.svg)
![Version](https://img.shields.io/badge/version-2.0.2-blue)

**TimeSync** is a modern, minimalist web application designed to track time across various time zones (London, Kyiv, Kathmandu). Built with **React 19** and **Vite**, it leverages **Tailwind CSS v4** to deliver a sleek, premium user experience.

## ✨ Features

* **Real-time Tracking**: Automatically updates time every second for all configured locations.
* **Integrated Control Panel**: A unified capsule-style UI for toggling modes and setting custom times.
* **Custom Time Mode**: Adjust the "base" time to instantly see the corresponding time shifts across other zones.
* **Responsive & Fluid**: A mobile-first grid system that adapts perfectly to any screen size.
* **Premium UI/UX**: Features glassmorphism, soft shadows, and high-fidelity typography (Roboto).

## 🛠 Tech Stack

* **Framework**: [React 19](https://react.dev/)
* **Build Tool**: [Vite 7](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Data**: Open-Meteo API
* **Testing**: Vitest, React Testing Library
* **Key Libraries**:
* `react-clock` — High-performance analog clock visualization.
* `@tailwindcss/vite` — Native Vite integration for the latest Tailwind engine.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/clocks-app.git
cd clocks-app

```

### 2. Install dependencies

```bash
npm install

```

### 3. Start the development server

```bash
npm run dev

```

Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) in your browser to see the result.

### 4. Build for production

```bash
npm run build

```

## 📂 Project Structure

```text
src/
├── component/        # Atomic components (Button, Input, Weather)
├── layout/           # Major UI blocks (Header, Footer, Main)          # Static assets and icons
├── App.jsx           # Root application component
├── main.jsx          # Vite entry point
└── index.css         # Global styles & Tailwind v4 configuration

```

## 🔧 Configuration

### Tailwind CSS v4

This project utilizes the latest **Tailwind v4** engine. Unlike previous versions, the configuration is handled primarily via CSS variables within `src/index.css` using the `@theme` directive.

### Adding Time Zones

To add a new city, update the time zone array in `src/layout/main/main.jsx`. Use standard IANA time zone strings (e.g., `America/New_York`).

---