import { useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

// -------------------------------------------------------------
// CUSTOMIZE ALL CONTENT & SETTINGS HERE
// -------------------------------------------------------------
const CONFIG = {
    // Step 1: Landing
    startTitle: "A little surprise for you...",
    startSubtitle: "Distance means so little when you mean so much.",
    startButtonText: "Open Your Gift ✨",

    // Step 2: Candles & Blow
    candleCount: 3,
    candleInstructionText: "Make a wish and blow out the candles 🕯️",
    candleBlowingText: "Making your wish come true...",
    blowDelayMs: 2000,

    // Step 3: Slicing
    sliceInstructionText: "Now, click the cake to slice it! 🎂",

    // Step 4: Eating
    eatInstructionText: "Time to eat! Tap the slice to take bites 🍴",
    totalBites: 4,

    // Step 5: Intermediate Popup
    midPopupTitle: " Didn't even offer me a bite. 🙄🙄🙄",
    midPopupBody: "Cake is not enough you deserve more so here is little something for you...",
    midPopupButtonText: "Read My Note 💌",

    // Step 6: Final Heartfelt Letter & Gift
    finalTitle: "Happy Birthday! 🎉",
    finalBody: `Even though miles separate us today, I'm celebrating you just the same.

Thank you for being you and a bright presence in my life no matter the distance. I pray that upcoming year and onwards you experience days full of warmth, peace, and everything you've been hoping for.

Save me a real slice when we meet next! 🙄`,

    // Download button settings
    pdfUrl: "/gift.pdf", // Matches public/gift.pdf
    pdfFileName: "src/MORE TO COME JUST OPEN THE DOOR .pdf", // The filename they will see when saved
    downloadButtonText: "Download Your Gift 🎁",

    replayButtonText: "Experience Again ↺",
};

export default function App() {
    const [phase, setPhase] = useState('landing');
    const [bitesLeft, setBitesLeft] = useState(CONFIG.totalBites);

    const handleStart = () => {
        setPhase('readyToBlow');
    };

    const handleMainCakeClick = () => {
        if (phase === 'readyToBlow') {
            setPhase('blowing');

            setTimeout(() => {
                setPhase('readyToSlice');
            }, CONFIG.blowDelayMs);

        } else if (phase === 'readyToSlice') {
            setPhase('eating');
            setBitesLeft(CONFIG.totalBites);
        }
    };

    const handleSliceClick = () => {
        if (phase !== 'eating' || bitesLeft <= 0) return;

        const nextBites = bitesLeft - 1;
        setBitesLeft(nextBites);

        if (nextBites === 0) {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });

            setTimeout(() => {
                setPhase('midPopup');
            }, 500);
        }
    };

    const handleOpenFinal = () => {
        setPhase('finalLetter');

        confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
        });
    };

    const handleReset = () => {
        setBitesLeft(CONFIG.totalBites);
        setPhase('readyToBlow');
    };

    const renderCandles = () => {
        return Array.from({ length: CONFIG.candleCount }).map((_, index) => (
            <div key={index} className="candle">
                <div
                    className={`flame flame-${index % 3} ${
                        phase !== 'readyToBlow' && phase !== 'landing' ? 'extinguished' : ''
                    }`}
                />
            </div>
        ));
    };

    const biteProgress = bitesLeft / CONFIG.totalBites;

    return (
        <div className="scene-wrapper">
            {/* BACKGROUND DECORATIONS */}
            {/* 1. Hanging Bunting Flags */}
            <div className="bunting-banner">
                {['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#e84393'].map((color, i) => (
                    <div key={i} className="flag" style={{ borderTopColor: color }} />
                ))}
            </div>

            {/* 2. Floating Balloons */}
            <div className="balloons-layer">
                <div className="balloon balloon-1" />
                <div className="balloon balloon-2" />
                <div className="balloon balloon-3" />
                <div className="balloon balloon-4" />
            </div>

            {/* 3. Twinkling Stars */}
            <div className="stars-layer">
                <div className="star star-1">✦</div>
                <div className="star star-2">★</div>
                <div className="star star-3">✦</div>
                <div className="star star-4">★</div>
                <div className="star star-5">✦</div>
            </div>

            {/* 1. LANDING OVERLAY */}
            {phase === 'landing' && (
                <div className="landing-screen">
                    <h1 className="landing-title">{CONFIG.startTitle}</h1>
                    <p className="landing-subtitle">{CONFIG.startSubtitle}</p>
                    <button className="primary-action-btn" onClick={handleStart}>
                        {CONFIG.startButtonText}
                    </button>
                </div>
            )}

            {/* 2. TABLE / CAKE STAGE */}
            <div className={`stage-container ${phase === 'landing' ? 'stage-hidden' : 'stage-visible'}`}>
                <p className="prompt">
                    {phase === 'readyToBlow' && CONFIG.candleInstructionText}
                    {phase === 'blowing' && CONFIG.candleBlowingText}
                    {phase === 'readyToSlice' && CONFIG.sliceInstructionText}
                    {phase === 'eating' && `${CONFIG.eatInstructionText} (${bitesLeft} bites left)`}
                </p>

                <div className="table-surface">
                    <div
                        className={`cake-station ${phase === 'blowing' ? 'disabled' : ''}`}
                        onClick={handleMainCakeClick}
                    >
                        <div
                            className={`candles-container ${
                                phase === 'eating' || phase === 'midPopup' || phase === 'finalLetter'
                                    ? 'hidden'
                                    : ''
                            }`}
                        >
                            {renderCandles()}
                        </div>
                        <div
                            className={`cake-whole ${
                                phase === 'eating' || phase === 'midPopup' || phase === 'finalLetter'
                                    ? 'cut'
                                    : ''
                            }`}
                        />
                        <div className="plate main-plate" />
                    </div>

                    <div
                        className={`slice-station ${
                            phase === 'eating' || phase === 'midPopup' || phase === 'finalLetter'
                                ? 'revealed'
                                : ''
                        }`}
                        onClick={handleSliceClick}
                    >
                        <div
                            className="cake-slice-piece"
                            style={{
                                transform: `scale(${biteProgress})`,
                                opacity: bitesLeft === 0 ? 0 : 1,
                            }}
                        />
                        <div className="plate small-plate" />
                    </div>
                </div>
            </div>

            {/* 3. INTERMEDIATE POPUP */}
            <div className={`letter-card ${phase === 'midPopup' ? 'open' : ''}`}>
                <h2 className="letter-title">{CONFIG.midPopupTitle}</h2>
                <p className="letter-text">{CONFIG.midPopupBody}</p>
                <button className="primary-action-btn" onClick={handleOpenFinal}>
                    {CONFIG.midPopupButtonText}
                </button>
            </div>

            {/* 4. FINAL HEARTFELT LETTER */}
            <div className={`letter-card ${phase === 'finalLetter' ? 'open' : ''}`}>
                <h2 className="letter-title">{CONFIG.finalTitle}</h2>
                <p className="letter-text">{CONFIG.finalBody}</p>

                <div className="card-actions">
                    {/* Download PDF Button */}
                    <a
                        href={CONFIG.pdfUrl}
                        download={CONFIG.pdfFileName}
                        className="download-gift-btn"
                    >
                        {CONFIG.downloadButtonText}
                    </a>

                    {/* Replay Button */}
                    <button className="replay-link-btn" onClick={handleReset}>
                        {CONFIG.replayButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}