import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import type { AppContextType } from "../types/AppContext";
import { CgDarkMode } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaProjectDiagram, FaGraduationCap, FaCode, FaEnvelope, FaDownload } from "react-icons/fa";
import user_info from "../data/userdata";

interface HeaderProps {
    switchTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ switchTheme }) => {
    const { theme } = useContext<AppContextType>(AppContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    const navItems = [
        { id: "hero", label: "Home", icon: <FaHome /> },
        { id: "projects", label: "Projects", icon: <FaProjectDiagram /> },
        { id: "education-and-experience", label: "Education", icon: <FaGraduationCap /> },
        { id: "skills", label: "Skills", icon: <FaCode /> },
        { id: "contact", label: "Contact", icon: <FaEnvelope /> },
    ];

    // Handle scroll effect
    useEffect(() => {
        const navItemIds = ["hero", "projects", "education-and-experience", "skills", "contact"];

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navItemIds.map(id => document.getElementById(id));
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section, index) => {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(navItemIds[index]);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Fixed Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "py-2 shadow-lg backdrop-blur-md"
                    : "py-4"
                    }`}
                style={{
                    backgroundColor: isScrolled
                        ? theme === "dark"
                            ? "rgba(0, 0, 0, 0.9)"
                            : "rgba(255, 255, 255, 0.95)"
                        : "transparent",
                }}
            >
                <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo / Name */}
                        <button
                            onClick={() => scrollToSection("hero")}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300">
                                <img
                                    src={user_info.main.photo}
                                    alt={user_info.main.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                                    {user_info.main.name.split(" ").slice(-2).join(" ")}
                                </h1>
                                <p className="text-xs text-[var(--color-subtext)]">{user_info.main.role}</p>
                            </div>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeSection === item.id
                                        ? "bg-[var(--color-accent)] text-white"
                                        : "text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10 hover:text-[var(--color-accent)]"
                                        }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">
                            {/* Download CV Button */}
                            <a
                                href="/CV_MaiNguyenTienDat.pdf"
                                download
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 text-sm font-medium"
                            >
                                <FaDownload />
                                <span>CV</span>
                            </a>

                            {/* Theme Toggle */}
                            <button
                                onClick={switchTheme}
                                className="p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10 hover:text-[var(--color-accent)] transition-all duration-300"
                                aria-label="Toggle Theme"
                            >
                                <CgDarkMode className="text-2xl" />
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10 transition-all duration-300"
                                aria-label="Toggle Menu"
                            >
                                {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
            </div>

            {/* Mobile Menu */}
            <nav
                className={`fixed top-0 right-0 z-50 h-full w-72 md:hidden transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{
                    backgroundColor: "var(--color-bg)",
                    boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
                }}
            >
                <div className="p-6">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10"
                    >
                        <HiX className="text-2xl" />
                    </button>

                    {/* Profile */}
                    <div className="mt-8 mb-8 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-3 border-[var(--color-accent)]">
                            <img
                                src={user_info.main.photo}
                                alt={user_info.main.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="mt-4 font-bold text-lg text-[var(--color-text)]">
                            {user_info.main.name}
                        </h2>
                        <p className="text-sm text-[var(--color-accent)]">{user_info.main.role}</p>
                    </div>

                    {/* Nav Items */}
                    <div className="space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`w-full px-4 py-3 rounded-lg font-medium text-left transition-all duration-300 flex items-center gap-3 ${activeSection === item.id
                                    ? "bg-[var(--color-accent)] text-white"
                                    : "text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10"
                                    }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Download CV */}
                    <a
                        href="/cv.pdf"
                        download
                        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-all duration-300"
                    >
                        <FaDownload />
                        Download CV
                    </a>
                </div>
            </nav>

            {/* Scroll Progress Indicator */}
            <ScrollProgress />

            {/* Spacer for fixed header */}
            <div className="h-16" />
        </>
    );
};

// Scroll Progress Component
const ScrollProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
            <div
                className="h-full bg-[var(--color-accent)] transition-all duration-100"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default Header;
