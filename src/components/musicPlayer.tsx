"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }
    }, []);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    return (
        <div>
            <audio ref={audioRef} src="/music.mp3" loop />
        </div>
    );
};
