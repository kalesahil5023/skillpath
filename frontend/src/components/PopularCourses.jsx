import React, { useState } from "react";
import { Star, Users, Clock, ArrowRight, BookOpen, Check, Layers, Code, Shield, Brain, Terminal } from "lucide-react";

export default function PopularCourses({ onSelectCourse }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Web Development", "Python & DSA", "Machine Learning", "Cybersecurity", "Cloud & Systems"];

  const courses = [
    {
      id: "web-dev-pro",
      category: "Web Development",
      title: "Modern Full-Stack Engineering with React & Django",
      level: "Intermediate",
      duration: "10 Weeks",
      students: "14,820",
      rating: "4.95",
      reviews: "1,240",
      instructor: {
        name: "Marcus Vance",
        role: "Principal Architect",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      },
      skills: ["React 18", "Django 5.x", "PostgreSQL", "REST APIs", "Vite"],
      accentColor: "#059669",
      bgGradient: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
      icon: Code,
    },
    {
      id: "python-dsa-mastery",
      category: "Python & DSA",
      title: "Data Structures & Algorithms: The Technical Interview",
      level: "Beginner to Advanced",
      duration: "8 Weeks",
      students: "22,400",
      rating: "4.98",
      reviews: "3,120",
      instructor: {
        name: "Elena Rostova",
        role: "Ex-Staff Engineer",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      },
      skills: ["Big-O Complexity", "Graphs", "Dynamic Programming", "Trees"],
      accentColor: "#2563eb",
      bgGradient: "linear-gradient(135deg, #eff6ff, #dbeafe)",
      icon: Terminal,
    },
    {
      id: "applied-ml",
      category: "Machine Learning",
      title: "Applied Machine Learning & Neural Network Pipelines",
      level: "Intermediate",
      duration: "12 Weeks",
      students: "9,640",
      rating: "4.92",
      reviews: "840",
      instructor: {
        name: "Dr. Aris Thorne",
        role: "AI Research Scientist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      },
      skills: ["PyTorch", "scikit-learn", "Vector Databases", "Embeddings"],
      accentColor: "#7c3aed",
      bgGradient: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
      icon: Brain,
    },
    {
      id: "cybersec-defense",
      category: "Cybersecurity",
      title: "Practical Network Defense & Web Security Protocols",
      level: "Beginner",
      duration: "6 Weeks",
      students: "7,180",
      rating: "4.89",
      reviews: "560",
      instructor: {
        name: "Sarah Chen",
        role: "Senior Security Analyst",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      },
      skills: ["OWASP Top 10", "Wireshark", "Burp Suite", "Hardening"],
      accentColor: "#e11d48",
      bgGradient: "linear-gradient(135deg, #fff1f2, #ffe4e6)",
      icon: Shield,
    },
    {
      id: "cloud-devops",
      category: "Cloud & Systems",
      title: "Production DevOps: Docker, Kubernetes & CI/CD Pipelines",
      level: "Intermediate",
      duration: "8 Weeks",
      students: "11,350",
      rating: "4.94",
      reviews: "990",
      instructor: {
        name: "Devon Reed",
        role: "Cloud Infrastructure Lead",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      },
      skills: ["Docker", "Kubernetes", "GitHub Actions", "Monitoring"],
      accentColor: "#d97706",
      bgGradient: "linear-gradient(135deg, #fffbeb, #fef3c7)",
      icon: Layers,
    },
    {
      id: "foundations-cs",
      category: "Python & DSA",
      title: "Computer Systems Fundamentals: Memory, OS & Networks",
      level: "Beginner",
      duration: "6 Weeks",
      students: "16,200",
      rating: "4.96",
      reviews: "1,450",
      instructor: {
        name: "Julian Rivera",
        role: "Systems Engineer",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      },
      skills: ["C Basics", "Process Scheduling", "Sockets", "TCP/IP"],
      accentColor: "#0284c7",
      bgGradient: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
      icon: BookOpen,
    },
  ];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <section id="popular-courses" className="section-spacing" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <BookOpen size={13} />
            <span>Structured Learning Tracks</span>
          </div>
          <h2>Most loved by our learners</h2>
          <p>
            Rigorous curricula built backwards from actual hiring expectations. Every track includes hands-on challenges, graded assessments, and a portfolio project.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "44px",
            overflowX: "auto",
            paddingBottom: "8px",
          }}
        >
          <div className="tabs-container">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "28px",
          }}
          className="courses-grid"
        >
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "14px",
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                }}
              >
                {/* Visual Thumbnail Banner */}
                <div
                  style={{
                    height: "140px",
                    background: course.bgGradient,
                    padding: "20px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--border-subtle)",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        backgroundColor: "#ffffff",
                        color: course.accentColor,
                        padding: "4px 10px",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        fontFamily: "var(--font-heading)",
                        boxShadow: "var(--shadow-xs)",
                      }}
                    >
                      {course.category}
                    </span>

                    <span
                      style={{
                        fontSize: "0.76rem",
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                      }}
                    >
                      {course.level}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        backgroundColor: "#ffffff",
                        color: course.accentColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "var(--shadow-xs)",
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 500 }}>
                      {course.duration} comprehensive track
                    </div>
                  </div>
                </div>

                {/* Course Card Body */}
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      fontSize: "1.18rem",
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: "var(--text-primary)",
                      marginBottom: "14px",
                      minHeight: "48px",
                    }}
                  >
                    {course.title}
                  </h3>

                  {/* Skills Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {course.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: "0.74rem",
                          backgroundColor: "var(--bg-subtle)",
                          color: "var(--text-secondary)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontWeight: 500,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats: Learners & Rating */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingBottom: "16px",
                      borderBottom: "1px solid var(--border-subtle)",
                      marginBottom: "16px",
                      fontSize: "0.84rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Users size={14} />
                      <span>{course.students} enrolled</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#b45309", fontWeight: 700 }}>
                      <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                      <span>{course.rating}</span>
                      <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({course.reviews})</span>
                    </div>
                  </div>

                  {/* Instructor & CTA */}
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                      <div>
                        <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--text-primary)" }}>
                          {course.instructor.name}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          {course.instructor.role}
                        </div>
                      </div>
                    </div>

                    <a
                      href="#path-finder"
                      className="btn btn-secondary"
                      style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                    >
                      <span>Syllabus</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .courses-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
