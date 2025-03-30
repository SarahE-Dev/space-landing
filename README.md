# SpaceLanding Component

## Overview
The `SpaceLanding` component is a visually immersive and interactive landing page built with React, Next.js, and Three.js (using `@react-three/fiber` and `@react-three/drei`). It features a cosmic theme with animated stars, planets, and interactive UI elements, providing an engaging digital universe experience. 

# SpaceLanding Project

![Screenshot of the landing page](./image.png)

You can view the live demo here: [SpaceLanding Live Demo](https://space-landing-psi.vercel.app/)



## Features
- **Interactive 3D Universe**: Includes a rotating Saturn planet with rings, ambient and point lights, and animated stars.
- **Responsive Design**: The layout adapts to different screen sizes and provides a seamless experience across devices.
- **Motion Effects**: Smooth animations using `framer-motion` for the UI elements like buttons, headers, and icons.
- **Custom UI Components**: Utilizes reusable components such as `SpaceNav`, `PlanetSection`, `FeatureCard`, and `GalaxyBackground` for modularity.
- **Call to Action**: Multiple call-to-action buttons for user engagement like "Begin Journey", "Learn More", and "Launch Now".
  
## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- Yarn or npm

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/SarahE-Dev/space-landing.git
   cd space-landing
   ```

2. **Install Dependencies:**
   Install required dependencies using Yarn or npm.
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Run the Development Server:**
   Start the development server with the following command:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the landing page in action.

## Component Breakdown

### `SpaceLanding`
- The main component that renders the space-themed landing page.
- It includes sections like the hero section, features section, planet showcase, and call to action.
  
### `ColorfulSaturn`
- A custom 3D planet rendering using Three.js and `@react-three/fiber`.
- The Saturn planet has a colorful texture and rotating rings.
- The texture is generated dynamically using an HTML canvas, with gradient backgrounds and animated stripes.

### `GalaxyBackground`
- A background component featuring a starry sky with animated stars.

### `SpaceNav`
- A navigation bar component that appears at the top of the page for quick access to other sections.

### `FeatureCard`
- A reusable card component to highlight different features of the platform.

### `PlanetSection`
- A section that displays the planet showcase, allowing for visual interactivity.

## Custom Hooks

### `useResponsiveScale`
- A custom hook used to scale the 3D planet model based on the viewport size.

## Dependencies
- `react`
- `next`
- `@react-three/fiber`
- `@react-three/drei`
- `three`
- `framer-motion`
- `lucide-react`
- `@/components/ui/button`

## Contributing
Feel free to fork this project and submit pull requests. If you encounter any issues or have suggestions, please open an issue on the GitHub repository.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
