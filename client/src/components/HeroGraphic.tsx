export function HeroGraphic() {
    return (
        <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Central Glow */}
            <div className="absolute inset-1/3 bg-primary/30 rounded-full blur-3xl animate-pulse" />

            {/* Modern Network Container */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-[500px] max-h-[500px]">

                    {/* Hexagonal Network Frame */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg viewBox="0 0 200 200" className="w-full h-full opacity-70">
                            {/* Outer Hexagon */}
                            <polygon
                                points="100,10 170,50 170,130 100,170 30,130 30,50"
                                fill="none"
                                stroke="rgba(0,243,255,0.4)"
                                strokeWidth="1.5"
                                className="animate-pulse"
                                style={{ animationDuration: '3s' }}
                            />
                            {/* Middle Hexagon */}
                            <polygon
                                points="100,30 150,60 150,120 100,150 50,120 50,60"
                                fill="rgba(0,243,255,0.05)"
                                stroke="rgba(0,243,255,0.5)"
                                strokeWidth="2"
                            />
                            {/* Inner Hexagon */}
                            <polygon
                                points="100,50 130,70 130,110 100,130 70,110 70,70"
                                fill="rgba(0,243,255,0.1)"
                                stroke="rgba(0,243,255,0.6)"
                                strokeWidth="1"
                                className="animate-pulse"
                                style={{ animationDuration: '2s', animationDelay: '0.5s' }}
                            />

                            {/* Connecting Lines from Center */}
                            <line x1="100" y1="90" x2="100" y2="10" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                            <line x1="100" y1="90" x2="170" y2="50" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                            <line x1="100" y1="90" x2="170" y2="130" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                            <line x1="100" y1="90" x2="100" y2="170" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                            <line x1="100" y1="90" x2="30" y2="130" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />
                            <line x1="100" y1="90" x2="30" y2="50" stroke="rgba(0,243,255,0.3)" strokeWidth="1" />

                            {/* Glowing Nodes at Hexagon Points */}
                            <circle cx="100" cy="10" r="3" fill="rgba(0,243,255,0.9)" className="animate-pulse" />
                            <circle cx="170" cy="50" r="3" fill="rgba(0,243,255,0.9)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                            <circle cx="170" cy="130" r="3" fill="rgba(0,243,255,0.9)" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                            <circle cx="100" cy="170" r="3" fill="rgba(0,243,255,0.9)" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
                            <circle cx="30" cy="130" r="3" fill="rgba(0,243,255,0.9)" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
                            <circle cx="30" cy="50" r="3" fill="rgba(0,243,255,0.9)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />

                            {/* Animated Center Node */}
                            <circle cx="100" cy="90" r="5" fill="rgba(0,243,255,1)" className="animate-pulse" style={{ animationDuration: '1.5s' }}>
                                <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>

                </div>
            </div>
        </div>
    );
}
