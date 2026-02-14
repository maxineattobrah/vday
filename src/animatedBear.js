import React,{use, useState} from "react";

export default function AnimatedBear({image =""}){
    const [frame, setFrame] = useState(0);

    return(
        <div>
            <div className="bear-wrapper">
                <div className="bear-pose"
                    style={{
                        clipPath: `inset(${Math.floor(frame/2)*50}%)`,
                        transform: ``
                    }}
                >
                    <img src={image} alt="cute" className="bear-image"/>
                </div>

            </div>
            <style>{`
                .bear-wrapper{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position:relative;
                    overflow:hidden;
                    animation: bear-bounce 1.2s ease-in-out infinite;
                    transform-origin: center bottom;
            
                }
                .bear-pose{
                    width: 100%;
                    height: 100%;
                    transition: clip-path 0.1s step-end, transform 0.1s step-end;
                    filter: brightness(0.7) contrast(1.2);              
                }
                .bear-image{
                    width: 100%;
                    height: 100%;
                }

                @keyframes bear-bounce{
                0%, 100% {
                        transform: translateY(0px);
                    }
                50% {
                        transform: translateY(-25px);
                    }
                }

                @keyframes bear-squash{
              
                50% {
                        transform: scaleY(1.0) scaleX(0.45);
                    }
                90% {
                        transform: scaleY(0.45) scaleX(1.0);
                    }
                }
            `}
            </style>
        </div>
    )

}