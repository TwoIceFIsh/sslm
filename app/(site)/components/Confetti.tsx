"use client";

import confetti from "canvas-confetti";
import {useEffect} from "react";

export default function ConfettiLogin() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 0};

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    const handleConfetti = () => {
        const intervalId: NodeJS.Timeout = setInterval(() => {
            let timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(intervalId);
            }

            let particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2},
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2},
                })
            );
        }, 500);
    };

    useEffect(() => {
        handleConfetti();
    }, []);

    return (
        <div>
        </div>
    );
}