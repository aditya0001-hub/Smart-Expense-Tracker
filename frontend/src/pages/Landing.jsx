import { motion } from "framer-motion";
import React from 'react'
import { useNavigate } from "react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
} from "chart.js";
function MoneyParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        function resize() {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        resize();
        window.addEventListener("resize", resize);

        const particles = Array.from({ length: 20 }).map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speed: Math.random() * 30 + 10, // pixels per second
            size: Math.random() * 3 + 2,
        }));

        let lastTime = performance.now();

        function animate(time) {
            const delta = (time - lastTime) / 1000; // seconds
            lastTime = time;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.y -= p.speed * delta; // TIME BASED movement
                if (p.y < 0) p.y = window.innerHeight;

                ctx.fillStyle = "rgba(19,236,91,0.6)";
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
function useTyping(text, speed = 80) {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplay(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [text]);

    return display;
}
function FintechChart() {
    const data = React.useMemo(() => ({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Income",
                data: [1200, 1900, 3000, 2500, 4000, 4200],
                borderColor: "#13ec5b",
                tension: 0.4,
            },
        ],
    }), []);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false, // 🔥 REQUIRED
        plugins: { legend: { display: false } },
    }), []);

    return (
        <div className="w-full h-full min-h-62.5">
            <Line data={data} options={options} />
        </div>
    );
}

export default function Landing() {
    const navigate = useNavigate()
    const handleLogin = () => {
        
        navigate("/login")
    }
    const handleRegister = () => {
        
        navigate("/register")
    }


    const typed = useTyping("Track expenses. Manage budgets. Visualize wealth.");



    ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);


    return (
        <div className="min-h-screen bg-(--color-background-dark) text-white overflow-x-hidden">
            <header className="fixed top-0 w-full z-50 backdrop-blur bg-(--color-background-dark)/80 border-b border-(--color-card-border)">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    {/* LEFT LOGO */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center font-bold text-black">
                            C
                        </div>
                        <span className="text-white font-semibold text-lg">
                            Smart Expense Tracker
                        </span>
                    </div>

                    {/* CENTER LINKS */}
                    <nav className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
                        <a href="#features" className="hover:text-white transition">Features</a>
                        <a href="#chart" className="hover:text-white transition">Charts</a>
                        <a href="#" className="hover:text-white transition">Free</a>

                    </nav>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-4">
                        <button onClick={handleLogin} className="text-sm text-text-secondary hover:text-white transition">
                            Log In
                        </button>

                        <button onClick={handleRegister} className="h-9 px-5 rounded-lg bg-primary text-black font-semibold text-sm hover:brightness-110 transition">
                            Get Started
                        </button>
                    </div>
                </div>
            </header>
            {/* HEADER (unchanged) */}
            <header className="sticky top-0 z-50 border-b border-(--color-card-border) bg-(--color-background-dark)/80 backdrop-blur">
                {/* same header code */}
            </header>

            {/* HERO SECTION */}
            <div className="absolute inset-0 neon-grid opacity-20 pointer-events-none"></div>

            <section className="relative pt-24 pb-32 text-center overflow-hidden">

                {/* 🔥 ANIMATED GLOW BACKGROUND */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{
                        background:
                            "radial-gradient(circle at center, rgba(19,236,91,0.18), transparent 70%)",
                    }}
                />

                <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center gap-8">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="px-3 py-1 rounded-full bg-card-dark border border-(--color-card-border) text-primary text-xs font-bold uppercase flex items-center gap-2"
                    >
                        <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                        {/* New v2.0 Released */}
                    </motion.div>

                    {/* TITLE TEXT ANIMATION */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold leading-tight"
                    >
                        Take Control of Your <br />
                        <span className="bg-linear-to-r from-primary to-green-200 bg-clip-text text-transparent">
                            Financial Future

                        </span>
                    </motion.h1>

                    <MoneyParticles />

                    {/* SUBTEXT */}

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-lg text-text-secondary max-w-2xl"
                    >
                        {typed}
                    </motion.p>

                    {/* BUTTONS */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <motion.button onClick={handleRegister}
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(19,236,91,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            className="h-14 px-8 rounded-xl bg-primary text-black font-bold flex items-center gap-2"
                        >
                            Get Started Free
                        </motion.button>


                    </motion.div>

                    {/* DASHBOARD PREVIEW FLOAT ANIMATION */}
                    <motion.div
                        className="mt-16 w-full max-w-5xl p-2 bg-card-dark border border-(--color-card-border) rounded-xl shadow-2xl relative"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div id="chart" className="absolute inset-0 bg-linear-to-r from-primary to-green-600 opacity-20 blur"></div>
                        <div className="relative bg-(--color-background-dark) border border-(--color-card-border) aspect-video rounded-lg p-6">
                            <FintechChart />
                        </div>

                    </motion.div>

                </div>
            </section>

            {/* FEATURES CARDS ANIMATION */}
            <section id="features" className="py-24 border-t border-(--color-card-border)">
                <div className="max-w-7xl mx-auto px-6 text-center">

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold"
                    >
                        Everything you need to manage money
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        <AnimatedFeature title="Track Anything" feature="Users can track income and expenses, categorize transactions,
set monthly budgets" />
                        <AnimatedFeature title="See Spending" feature="visualize spending patterns through analytics dashboards" />
                        <AnimatedFeature title="In Depth Analysis" feature="Category-wise and monthly summaries" />

                    </div>

                </div>
            </section>

        </div>
    );
}

/* Animated Feature Card */
function AnimatedFeature({ title, feature, icon }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-8 bg-card-dark border border-(--color-card-border) rounded-2xl hover:border-primary transition"
        >
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                {icon}
            </div>
            <h3 className="text-xl font-bold mt-4">{title}</h3>
            <p className="text-text-secondary mt-2">
                {feature}
            </p>
        </motion.div>
    );

}
