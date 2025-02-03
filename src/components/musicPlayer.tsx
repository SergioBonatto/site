"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }
    }, []);

    return (
        <div>
            <audio ref={audioRef} src="/music.mp3" loop />
        </div>
    );
};
