import React,{ useEffect, useMemo, useRef, useState} from "react";
import AnimatedBear from './animatedBear';

export default function Vday(){
    const [response, setResponse] = useState(null);
    const [noButtonPosition, setNoButtonPosition] = useState(null);
    const [noClickCount, setNoClickCount] = useState(0);
    const [musicPlaying, setMusicPlaying] = useState(false);

    const homeScreenBackgroundMusic = useRef(null);
    const celebreationBackgroundMusic = useRef(null);


    const heartPositions = useMemo(()=>{
        return [...Array(15)].map(()=>({
            left: Math.random()*100,
            duration: 5+Math.random()*3,
            fontSize: 15+Math.random()*15,
            opacity: 0.6+Math.random()*0.4
        }))
    },[]);

    useEffect(()=>{

        if(homeScreenBackgroundMusic.current){
            homeScreenBackgroundMusic.current.volume = 0.3;
        }
        if(celebreationBackgroundMusic.current){
            celebreationBackgroundMusic.current.volume = 0.5;
        }
    },[]);

    const handleYes = () =>{
        setResponse("yes");
        if(homeScreenBackgroundMusic.current){
            homeScreenBackgroundMusic.current.pause(); 
        }
        if(celebreationBackgroundMusic.current){
            celebreationBackgroundMusic.current.play(); 
        }
    }

    const toggleMusic = () =>{
        if(homeScreenBackgroundMusic.current){
            if(musicPlaying){
                homeScreenBackgroundMusic.current.pause();
            }else{
                homeScreenBackgroundMusic.current.play();
            }
            setMusicPlaying(!musicPlaying);
        }

    }

    const handleNoButtonHover = () =>{
        // move the no button to random positions when hovering
        // over the No button
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 100;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        setNoButtonPosition({x:randomX, y:randomY});
        setNoClickCount(prev => prev +1);
    }

    if(response == "yes")
        return(
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-valentines-pink to-valentines-pink-dark overflow-hidden relative">
            {/* floating heart background */}
            <div className="celebration-hearts absolute top-0 left-0 w-full h-full pointer-events-none">

                {[...Array(20)].map((_,i) =>(
                    <span key={i}
                        className="absolute animate-explode"
                        style={{
                            left: `${Math.random()*100}%`,
                            top: '50%',
                            animationDelay: `${Math.random()*2}s`,
                            fontSize: `${20 + Math.random()*30}px`,
                            "--random-x": `${Math.random()*400-200}px`,
                            "--random-y": `${Math.random()*400-200}px`
                        }}
                    >
                        ❤️
                    </span>
                ))}
            </div>
            {/* Fireworks */}
            <div className="fireworks-container absolute top-0 left-0 w-full h-full pointer-events-none">
                {[...Array(12)].map((_,i) =>(
                    <div key={i}
                        className="firework"
                        style={{
                            left: `${20 + Math.random()*60}%`,
                            top: `${10 + Math.random()*40}%`,
                            animationDelay: `${i*0.4}s`,
                            animationDuration: `${2 + Math.random()*1}s`,
            
                        }}
                    >
                    {[...Array(8)].map((_,j) =>(
                    <div key={j}
                        className="spark"
                        style={{
                            "--angle": `${j*45}deg`,
                            "--delay": `${Math.random()*0.2}s`,
                            "--color": ["#ff0068","#ffd700", "#00ff88", "#ff6b9d","#a855f7"] [Math.floor(Math.random()*5)],
                        }}
                    />
                ))}
            </div>
        ))}

    </div>


            <div className="text-center z-10">
                <div className="inline-block mb-8">
                    <div>
                        <AnimatedBear className="animate-explode" image="yes_bear.png"/>
                    </div>
                </div>
                
                <h1 className="text-7xl text-valentines-red mb-5 font-semibold drop-shadow-md animate-scaleIn">
                    Yay! 🍾
                </h1>

                <p className="text-3xl text-pink-700 animate-fadeIn">
                    Can't wait to spend Valentines Day weekend with you!
                </p>
            </div>

            <style>{`
                .firework {
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    animation: firework-launch 2s ease-out infinite;
                }

                .spark {
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: var(--color);
                    box-shadow: 0 0 10px var(--color);
                    animation: spark-explode 1s ease-out infinite;
                    transform: rotate(var(--angle)) translateY(0);
                    opacity: 0;
                }
                
                @keyframes firework-launch{
                    0%{
                        opacity: 0;
                        transform: translateY(100vh) scale(0);
                    }
                        40%{
                        opacity: 1;
                        transform: translateY(100vh) scale(1);
                    }
                        100%{
                        opacity: 0;
                        transform: translateY(100vh) scale(1);
                    }
                }

                @keyframes spark-explode{
                    0%{
                        opacity: 1;
                        transform: rotate(var(--angle)) translateY(0) scale(1);
                    }
                    100%{
                    opacity: 1;
                    transform: rotate(var(--angle)) translateY(-100px) scale(0);
                    }
                }
            `}</style>
        </div>

        )

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-valentines-pink to-valentines-pink-dark font-sans overflow-hidden relative">
            {/* Background music */}
            <audio ref={homeScreenBackgroundMusic} loop>
                <source src={process.env.PUBLIC_URL + "/influence.mp3" }type="audio/mpeg"/>
            </audio>
            <audio ref={celebreationBackgroundMusic} loop>
                <source src={process.env.PUBLIC_URL + "/cheers.mp3"} type="audio/mpeg"/>
            </audio>
            <button
                onClick={toggleMusic}
                className="fixed top-5 right-8 z-50 hover:rounded-full p-3 shadow-lg hover:scale-110"
                title={musicPlaying? "Pause Music": "Play Music"}
                >
                {musicPlaying?(
                    <span className="text-2xl">⏸️</span>
                ):(
                    <span className="text-2xl">▶️</span>
                )}
            </button>
            {/* floating heart background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                
                {heartPositions.map((heart,i)=>(
                    <span key={i}
                        className="absolute animate-float"
                        style={{
                            left: `${heart.left}%`,
                            bottom: `${-50 + (i*-30)}px`,
                            animationDelay: "0s",
                            animationDuration: `${heart.duration}s`,
                            fontSize: `${heart.fontSize}px`,
                            opacity: heart.opacity,
                        }}
                    >
                        ❤️
                    </span>

                ))}

            </div>
            {/* main content */}
            <div className="text-center z-10 p-5">
                <div className="relative inline-block mb-8">
                    <div className="text-[40px] absolute bottom-5 -left-2 animate-wiggle">
                        🌹
                    </div>
                    <AnimatedBear image="home_screen_bear.png"/>
                    
                    <div className="text-[40px] absolute bottom-5 -right-2 animate-wiggle">
                        🌹
                    </div>
                </div>
                
                <h1 className="text-5xl text-valentines-red mb-10 font-semibold drop-shadow-sm">
                    Will you be my valentine?
                </h1>

                <div className="flex gap-5 justify-center items-center min-h-[60px]">
                    <button
                        className="px-12 py-4 text-2xl bg-green-600 text-white rounded-xl cursor-pointer
                        font-semibold shadow-lg shadow-green-600/40 transition-all hover:scale-110"
                        onClick={handleYes}
                    >
                        Yes
                    </button>
                    <button
                        className="px-12 py-4 text-2xl bg-red-600 text-white rounded-xl cursor-pointer
                        font-semibold shadow-lg shadow-red-600/40 transition-all"
                        style={{
                            position: noClickCount > 0 ? "fixed":"relative",
                            left: noClickCount > 0 ? `${noButtonPosition.x}px`:"auto",
                            top: noClickCount > 0 ? `${noButtonPosition.y}px`:"auto",
                        }}
                        onMouseEnter={handleNoButtonHover}
                        onClick={handleNoButtonHover}
                    >
                        No
                    </button>
                </div>

                {noClickCount>0 &&(
                    <p className="mt-8 text-lg text-valentines-red animate-fadeIn">
                        {noClickCount === 1 && "That button is shy 🙈"}
                        {noClickCount === 2 && "It's playing hard to get 😜"}
                        {noClickCount === 3 && "Maybe try the this 👆🏾 button? 🤷🏾‍♀️"}
                        {noClickCount > 3 && "Don't play with me 🤨. You know you want to say yes!😁"}

                    </p>
                )}
            </div>
        </div>
    );
}