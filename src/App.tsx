import { useCallback, useEffect, useState } from "react";
import { Book, PenTool, ScrollText } from "lucide-react";
import { Card } from "@/components/ui/card";
import "./app.css";

export default function ComingSoonPage() {
    const launchDate = new Date("2025-04-15T00:00:00+05:00");

    const calculateTimeLeft = useCallback(() => {
        const now = new Date();
        const difference = Math.max(launchDate.getTime() - now.getTime(), 0);

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }, [launchDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isLaunched, setIsLaunched] = useState(new Date() >= launchDate);

    useEffect(() => {
        if (isLaunched) return;

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (new Date() >= launchDate) {
                setIsLaunched(true);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft, isLaunched, launchDate]);

    const features = [
        {
            icon: <Book className="w-8 h-8 text-[#E9815E]" />,
            title: "Wiki Database",
            description:
                "Complete character roster, maps, items, and game mechanics explained",
        },
        {
            icon: <ScrollText className="w-8 h-8 text-[#E9815E]" />,
            title: "Guides & News",
            description:
                "Strategy guides, latest updates, and detailed patch notes coverage",
        },
        {
            icon: <PenTool className="w-8 h-8 text-[#E9815E]" />,
            title: "Game Tools",
            description:
                "Achievement tracker, challenge helper, and progress planner",
        },
    ];

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-[#FDF6E3] relative overflow-hidden">
            <div className="z-10 max-w-4xl px-4 mx-auto text-center">
                <h1 className="font-lucky text-3xl md:text-4xl lg:text-6xl text-[#E9815E] mb-4 hover:text-[#ff6b3d] transition-colors duration-300 float-animation">
                    PARTY ANIMALS HUB
                </h1>
                <p className="mb-12 text-xl font-lucky text-muted-foreground">
                    YOUR ULTIMATE GUIDE TO PARTY ANIMALS MASTERY
                </p>

                {!isLaunched ? (
                    <Card className="p-8 mb-8 shadow-xl bg-white/90 md:p-12 rounded-xl hover:bg-white transition-all hover:shadow-2xl hover:scale-[1.02] duration-300">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <div key={unit} className="text-center group">
                                    <div className="font-lucky text-3xl md:text-5xl lg:text-6xl text-[#E9815E] group-hover:scale-110 transition-transform">
                                        {value.toString().padStart(2, "0")}
                                    </div>
                                    <div className="text-sm capitalize font-lucky md:text-base text-muted-foreground">
                                        {unit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                ) : (
                    <Card className="p-8 mb-8 shadow-xl bg-white/90 md:p-12 rounded-xl hover:bg-white transition-all hover:shadow-2xl hover:scale-[1.02] duration-300">
                        <h2 className="text-2xl font-lucky text-[#E9815E]">
                            🎉 We're Live! 🎉
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Explore our guides and start mastering Party
                            Animals!
                        </p>
                    </Card>
                )}

                <div className="grid gap-6 mb-12 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="p-6 transition-all duration-300 cursor-pointer bg-white/90 hover:bg-white hover:shadow-xl hover:scale-105 group"
                        >
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="transition-transform duration-300 group-hover:scale-110">
                                    {feature.icon}
                                </div>
                                <h3 className="font-lucky text-lg text-[#E9815E] group-hover:text-[#ff6b3d] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm transition-colors text-muted-foreground group-hover:text-black">
                                    {feature.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                <p className="mb-8 text-lg font-lucky md:text-xl text-muted-foreground hover:text-[#E9815E] transition-colors">
                    {!isLaunched
                        ? "LAUNCHING WITH GUIDES & WIKI ON APRIL 15TH, 2024 (HOPEFULLY)"
                        : "EXPLORE OUR COMPREHENSIVE GUIDES & WIKI NOW"}
                </p>

                {/* Footer */}
                <footer className="pt-8 mt-12 border-t border-muted-foreground/20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-center text-muted-foreground/60">
                            <p className="text-xs leading-relaxed">
                                Party Animals Hub is a fan-made website
                                dedicated to providing comprehensive guides,
                                tools, and resources for Party Animals players.
                                We are not affiliated with, endorsed, sponsored,
                                or specifically approved by Source Technology.
                            </p>
                            <p className="mt-2 text-xs">
                                Party Animals™ is a trademark of Source
                                Technology. All related media, characters, and
                                content belong to their respective owners.
                            </p>
                        </div>
                        <div className="mt-4 text-xs text-muted-foreground/60">
                            © 2025 Party Animals Hub. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}
