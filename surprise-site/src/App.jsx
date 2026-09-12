import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import SectionTransition from './components/SectionTransition.jsx';
import OpeningScreen from './sections/OpeningScreen.jsx';
import StoryExperience from './sections/StoryExperience.jsx';

export default function App() {
  const [scene, setScene] = useState('opening');

  function enterWorld() {
    setScene('transitioning');
    window.setTimeout(() => setScene('story'), 1150);
  }

  return (
    <main className={`app-shell app-shell--${scene}`}>
      <AnimatedBackground isAccelerated={scene === 'transitioning'} />
      <AnimatePresence mode="wait">
        {scene !== 'story' ? (
          <SectionTransition key="opening">
            <OpeningScreen isEntering={scene === 'transitioning'} onEnter={enterWorld} />
          </SectionTransition>
        ) : (
          <SectionTransition key="story">
            <StoryExperience />
          </SectionTransition>
        )}
      </AnimatePresence>
    </main>
  );
}
