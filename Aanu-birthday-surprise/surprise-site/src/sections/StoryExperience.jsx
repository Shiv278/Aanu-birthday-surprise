import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import AchievementCard from '../components/AchievementCard.jsx';
import Button from '../components/Button.jsx';
import PhotoCard from '../components/PhotoCard.jsx';
import PhotoModal from '../components/PhotoModal.jsx';
import { birthdayLetter, chapters, memories, quizQuestions } from '../data/siteContent.js';

const byId = Object.fromEntries(memories.map((memory) => [memory.id, memory]));

function getPhotos(ids) {
  return ids.map((id) => byId[id]).filter(Boolean);
}

export default function StoryExperience() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [jealousy, setJealousy] = useState(12);
  const [answers, setAnswers] = useState({});
  const [showReal, setShowReal] = useState(false);
  const [finale, setFinale] = useState(false);
  const correctCount = useMemo(
    () => quizQuestions.filter((item, index) => answers[index] === item.answer).length,
    [answers],
  );

  function celebrate() {
    setFinale(true);
    confetti({ particleCount: 90, spread: 72, origin: { y: 0.78 }, colors: ['#ff7eb6', '#f8d77b', '#c7a6ff'] });
    window.setTimeout(() => {
      confetti({ particleCount: 55, angle: 60, spread: 50, origin: { x: 0, y: 0.75 } });
      confetti({ particleCount: 55, angle: 120, spread: 50, origin: { x: 1, y: 0.75 } });
    }, 400);
  }

  return (
    <div className="story-experience">
      {chapters.map((chapter, index) => (
        <StoryChapter
          chapter={chapter}
          index={index}
          key={chapter.id}
          onPhotoClick={setSelectedPhoto}
        />
      ))}

      <JalkukriMode jealousy={jealousy} setJealousy={setJealousy} />
      <MemoryWall onPhotoClick={setSelectedPhoto} />
      <BestieQuiz answers={answers} correctCount={correctCount} setAnswers={setAnswers} />
      <RealReveal showReal={showReal} setShowReal={setShowReal} onPhotoClick={setSelectedPhoto} />
      <BirthdayLetter />
      <Finale finale={finale} celebrate={celebrate} />

      <PhotoModal isOpen={Boolean(selectedPhoto)} title={selectedPhoto?.title} onClose={() => setSelectedPhoto(null)}>
        {selectedPhoto ? (
          <figure className="modal-figure">
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            <figcaption>
              <strong>{selectedPhoto.title}</strong>
              <span>{selectedPhoto.date}</span>
            </figcaption>
          </figure>
        ) : null}
      </PhotoModal>
    </div>
  );
}

function StoryChapter({ chapter, index, onPhotoClick }) {
  const photos = getPhotos(chapter.photoIds);

  return (
    <motion.section
      className={`story-chapter story-chapter--${chapter.tone || 'default'}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="chapter-copy">
        <p className="mini-label">{chapter.eyebrow}</p>
        <h2>{chapter.title}</h2>
        <p>{chapter.body}</p>
        {chapter.achievement ? (
          <AchievementCard badge="✦" title={chapter.achievement} description="A tiny badge for a memory that got very real." />
        ) : null}
      </div>
      <div className={`chapter-photos chapter-photos--${Math.min(photos.length, 5)}`}>
        {photos.map((photoItem, photoIndex) => (
          <PhotoCard
            key={`${chapter.id}-${photoItem.id}`}
            image={photoItem}
            variant={(index + photoIndex) % 4}
            onClick={() => onPhotoClick(photoItem)}
          />
        ))}
      </div>
    </motion.section>
  );
}

function JalkukriMode({ jealousy, setJealousy }) {
  return (
    <motion.section className="story-chapter jalkukri-section" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
      <div className="chapter-copy">
        <p className="mini-label">Jalkukri mode</p>
        <h2>AFFECTIONATE JEALOUSY DETECTED</h2>
        <p>A scientific meter for a deeply unscientific bestie emotion. Press it carefully. It has opinions.</p>
      </div>
      <div className="jealousy-card">
        <div className="jealousy-meter" aria-label={`Jalkukri meter ${jealousy}%`}>
          <span style={{ width: `${jealousy}%` }} />
        </div>
        <p>{jealousy > 75 ? 'Maximum jalkukri. Bestie rights have been claimed.' : 'Mostly calm. Slightly suspicious.'}</p>
        <Button onClick={() => setJealousy((value) => (value >= 94 ? 22 : value + 24))}>Activate Jalkukri Mode</Button>
      </div>
    </motion.section>
  );
}

function MemoryWall({ onPhotoClick }) {
  return (
    <section className="memory-wall" aria-labelledby="memory-wall-title">
      <div className="chapter-copy">
        <p className="mini-label">Memory wall</p>
        <h2 id="memory-wall-title">EVERY LITTLE PROOF</h2>
        <p>All the supplied memories live here too, so the whole story stays together.</p>
      </div>
      <div className="memory-grid">
        {memories.map((memory, index) => (
          <PhotoCard key={memory.id} image={memory} variant={index % 5} onClick={() => onPhotoClick(memory)} />
        ))}
      </div>
    </section>
  );
}

function BestieQuiz({ answers, correctCount, setAnswers }) {
  return (
    <section className="quiz-section" aria-labelledby="quiz-title">
      <p className="mini-label">Bestie quiz</p>
      <h2 id="quiz-title">PROVE THE LORE</h2>
      {quizQuestions.map((item, index) => (
        <fieldset className="quiz-card" key={item.question}>
          <legend>{item.question}</legend>
          {item.options.map((option) => {
            const picked = answers[index] === option;
            const answered = Boolean(answers[index]);
            const correct = option === item.answer;
            return (
              <button
                className={`quiz-option ${picked ? 'quiz-option--picked' : ''}`}
                type="button"
                key={option}
                onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
              >
                {option}
                {picked && correct ? <span>Correct ✦</span> : null}
                {picked && answered && !correct ? <span>Funny, but no 😭</span> : null}
              </button>
            );
          })}
        </fieldset>
      ))}
      <div className="quiz-result">{correctCount === quizQuestions.length ? 'BESTIE LEVEL: MAXIMUM' : `${correctCount}/${quizQuestions.length} lore points`}</div>
    </section>
  );
}

function RealReveal({ showReal, setShowReal, onPhotoClick }) {
  const real = byId['real-mumfali'];
  const revealLines = ["We've had avatars...", "We've had tags...", "We've had games...", "We've had our own little world...", 'But behind all of that...'];

  return (
    <section className="real-reveal" aria-labelledby="real-reveal-title">
      <div className="reveal-lines">
        {revealLines.map((line, index) => (
          <motion.p key={line} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
            {line}
          </motion.p>
        ))}
      </div>
      {!showReal ? <Button onClick={() => setShowReal(true)}>Reveal Mumfali</Button> : null}
      {showReal ? (
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="real-photo-wrap">
          <PhotoCard image={real} variant={2} onClick={() => onPhotoClick(real)} />
          <h2 id="real-reveal-title">there's you. ♥</h2>
          <p>The girl behind my favourite Mumfali. 🥜</p>
        </motion.div>
      ) : null}
    </section>
  );
}

function BirthdayLetter() {
  return (
    <section className="letter-section" aria-labelledby="letter-title">
      <p className="mini-label">Birthday letter</p>
      <h2 id="letter-title">A SMALL LETTER</h2>
      <div className="letter-paper">
        {birthdayLetter.map((line, index) => (
          <motion.p key={line} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.16 }}>
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

function Finale({ finale, celebrate }) {
  return (
    <section className={`finale-section ${finale ? 'finale-section--active' : ''}`} aria-labelledby="finale-title">
      {!finale ? <Button onClick={celebrate}>Start Birthday Countdown</Button> : null}
      {finale ? (
        <motion.div className="finale-card" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="countdown" aria-hidden="true"><span>3</span><span>2</span><span>1</span></div>
          <h2 id="finale-title">HAPPY BIRTHDAY, MUMFALI! 🥜🎀♥</h2>
          <p>BESTIE LEVEL: LV 3</p>
          <p>STATUS: PERMANENT ♥</p>
          <strong>Our story isn't finished yet.</strong>
          <span>To be continued...</span>
        </motion.div>
      ) : null}
    </section>
  );
}
