import React, {useEffect, useState} from 'react';


const UseSound = (sound: string) => {
    const [audio] = useState(new Audio(sound));
    // audio.load()
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        setPlaying(true)
    };

    useEffect(() => {
            playing ? audio.play(): audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [toggle];

};

export default UseSound;