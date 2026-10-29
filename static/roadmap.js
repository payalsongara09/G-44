
"use strict";

/*
 * CareerPath AI — Roadmap
 * Works with the existing roadmap.html and roadmap.css.
 */

const roadmapData = {
    "Software Developer": {
        domain: "Software Development",
        description:
            "Design, develop, test, and maintain software applications that solve real-world problems.",
        overview:
            "Software developers transform requirements into working applications. They write code, test features, fix bugs, maintain existing software, and collaborate with designers, testers, and other developers.",

        salary: {
            range: "Explore current salary data",
            description:
                "Compensation varies by location, experience, technical skills, company, and specialization. Check current job listings and reliable salary surveys for an accurate estimate."
        },

        responsibilities: [
            "Understand user requirements and plan software solutions.",
            "Write, test, and maintain readable code.",
            "Debug errors and improve application performance.",
            "Collaborate with developers, designers, and testers.",
            "Document projects and maintain software over time."
        ],

        suitability: [
            "Enjoys logical thinking and solving problems.",
            "Likes building applications and learning technology.",
            "Is willing to practice and debug patiently.",
            "Enjoys improving ideas through experimentation."
        ],

        skills: [
            "Programming",
            "Problem Solving",
            "Data Structures",
            "Debugging",
            "SQL and Databases",
            "Git",
            "Communication"
        ],

        eligibility:
            "Possible routes include a relevant degree, diploma, or skill-based pathway. Mathematics and computer science can be useful, but requirements vary by course and institution. Check the eligibility criteria of each target program.",

        exams: [
            "JEE Main — eligible engineering programs",
            "State engineering entrance exams",
            "University-specific admission tests",
            "Diploma admission requirements"
        ],

        courses: [
            "B.Tech / B.E. Computer Science",
            "BCA",
            "B.Sc. Computer Science",
            "Diploma in Computer Engineering",
            "Relevant software development courses"
        ],

        stages: [
            {
                title: "School Foundation",
                duration: "Classes 9–10",
                description:
                    "Build mathematics, logical thinking, communication, and computer fundamentals.",
                tasks: [
                    "Strengthen mathematics and analytical thinking.",
                    "Explore introductory programming with Python.",
                    "Build small projects such as a calculator or quiz."
                ]
            },
            {
                title: "Choose Your Academic Direction",
                duration: "Classes 11–12",
                description:
                    "Select subjects based on your preferred higher-education pathway.",
                tasks: [
                    "Consider Mathematics and Computer Science where available.",
                    "Learn programming fundamentals and basic algorithms.",
                    "Research eligibility for degree and diploma programs."
                ]
            },
            {
                title: "Higher Education",
                duration: "Typically 3–4 years, depending on course",
                description:
                    "Study programming, databases, software engineering, and computer science.",
                tasks: [
                    "Choose an eligible degree or diploma program.",
                    "Practice data structures, algorithms, and databases.",
                    "Complete academic and personal software projects."
                ]
            },
            {
                title: "Projects and Practical Experience",
                duration: "During or after studies",
                description:
                    "Demonstrate your skills through practical work.",
                tasks: [
                    "Build a website, application, or useful automation tool.",
                    "Learn Git and document your projects.",
                    "Seek eligible internships or supervised project experience."
                ]
            },
            {
                title: "Career Preparation",
                duration: "After building relevant skills",
                description:
                    "Prepare for further study, internships, or entry-level opportunities.",
                tasks: [
                    "Prepare a portfolio and project-based resume.",
                    "Practice coding and technical interview questions.",
                    "Apply to suitable opportunities and keep learning."
                ]
            }
        ],

        related: [
            "Data Analyst",
            "UI/UX Designer",
            "AI & Machine Learning Engineer"
        ]
    },

    "Graphic Designer": {
        domain: "Art & Design",
        description:
            "Create visual content for brands, websites, advertisements, social media, and digital products.",

        overview:
            "Graphic designers communicate ideas visually using typography, colour, images, layouts, and design software. Their work can include branding, posters, digital advertisements, publications, and social media graphics.",

        salary: {
            range: "Explore current salary data",
            description:
                "Earnings depend on portfolio quality, experience, location, employer, specialization, and freelance demand."
        },

        responsibilities: [
            "Understand design briefs and audience requirements.",
            "Create visual concepts, layouts, and design assets.",
            "Choose suitable typography, colours, and imagery.",
            "Revise designs using feedback.",
            "Prepare and export final assets for their intended use."
        ],

        suitability: [
            "Enjoys creativity and visual communication.",
            "Likes experimenting with colour and layouts.",
            "Pays attention to details.",
            "Is open to feedback and revision."
        ],

        skills: [
            "Creativity",
            "Typography",
            "Colour Theory",
            "Layout Design",
            "Canva or Design Tools",
            "Visual Communication",
            "Portfolio Development"
        ],

        eligibility:
            "Graphic design can be pursued through different educational routes. Some programs require specific qualifications or entrance tests; others assess portfolios or practical skills. Check each institution's admission requirements.",

        exams: [
            "Institution-specific design tests",
            "Portfolio assessments where applicable",
            "NID DAT for eligible design programs",
            "UCEED for eligible participating programs"
        ],

        courses: [
            "B.Des. in an appropriate specialization",
            "Bachelor's in Graphic Design",
            "Visual Communication",
            "Diploma in Graphic Design",
            "Relevant certificate courses"
        ],

        stages: [
            {
                title: "Develop Visual Foundations",
                duration: "Classes 9–10",
                description:
                    "Explore drawing, visual observation, colour, and communication.",
                tasks: [
                    "Practice composition and colour combinations.",
                    "Observe how posters and advertisements communicate.",
                    "Create simple posters for practice."
                ]
            },
            {
                title: "Explore Design and Subjects",
                duration: "Classes 11–12",
                description:
                    "Explore design interests and research suitable education routes.",
                tasks: [
                    "Practice typography and layout design.",
                    "Learn beginner-friendly tools such as Canva.",
                    "Check the subject and portfolio requirements of target courses."
                ]
            },
            {
                title: "Study Design",
                duration: "Duration depends on the selected program",
                description:
                    "Develop design knowledge through structured study or training.",
                tasks: [
                    "Explore eligible design degrees, diplomas, or certificates.",
                    "Practice branding, publication, and digital design.",
                    "Learn professional design workflows."
                ]
            },
            {
                title: "Build a Portfolio",
                duration: "During your learning journey",
                description:
                    "Show your process and demonstrate the quality of your work.",
                tasks: [
                    "Create posters, brand concepts, and social media designs.",
                    "Explain the goal and decisions behind each project.",
                    "Collect feedback and improve selected work."
                ]
            },
            {
                title: "Explore Opportunities",
                duration: "After developing relevant skills",
                description:
                    "Use your portfolio to explore further learning and work.",
                tasks: [
                    "Prepare a clear digital portfolio.",
                    "Explore internships, junior roles, or freelance projects.",
                    "Learn to manage design briefs, deadlines, and revisions."
                ]
            }
        ],

        related: [
            "UI/UX Designer",
            "Software Developer",
            "Data Analyst"
        ]
    },

    "UI/UX Designer": {
        domain: "Design & Technology",
        description:
            "Design digital experiences by understanding user needs, planning interfaces, and improving usability.",

        overview:
            "UI/UX designers help make websites and applications useful and easy to navigate. They research user needs, plan page structures, create prototypes, test designs, and improve experiences using feedback.",

        salary: {
            range: "Explore current salary data",
            description:
                "Compensation depends on experience, design skills, portfolio quality, location, employer, and specialization."
        },

        responsibilities: [
            "Understand user needs and product requirements.",
            "Create user flows, wireframes, and interface designs.",
            "Build interactive prototypes.",
            "Conduct usability checks and review feedback.",
            "Collaborate with developers and product teams."
        ],

        suitability: [
            "Enjoys creativity and problem-solving.",
            "Is curious about how people use applications.",
            "Likes improving layouts and user experiences.",
            "Enjoys combining design with analytical thinking."
        ],

        skills: [
            "User Research",
            "Wireframing",
            "Figma",
            "Prototyping",
            "Visual Design",
            "Usability Testing",
            "Communication"
        ],

        eligibility:
            "Possible routes include design, technology, interaction design, or related programs. Admission requirements differ by institution; some programs require an entrance examination, portfolio, or aptitude assessment.",

        exams: [
            "Institution-specific design tests",
            "Portfolio assessments where applicable",
            "NID DAT for eligible design programs",
            "UCEED for eligible participating programs"
        ],

        courses: [
            "B.Des. in an appropriate specialization",
            "Interaction Design",
            "Visual Communication",
            "Human-Computer Interaction",
            "Relevant UI/UX courses"
        ],

        stages: [
            {
                title: "Explore Design Fundamentals",
                duration: "Classes 9–10",
                description:
                    "Build observation, communication, and basic digital design skills.",
                tasks: [
                    "Observe how websites and apps are organized.",
                    "Practice simple layouts and visual hierarchy.",
                    "Explore basic design tools."
                ]
            },
            {
                title: "Develop Creative and Technical Skills",
                duration: "Classes 11–12",
                description:
                    "Explore design education and strengthen digital skills.",
                tasks: [
                    "Practice layouts, typography, and accessibility basics.",
                    "Learn introductory wireframing.",
                    "Check eligibility for relevant higher-education programs."
                ]
            },
            {
                title: "Study Design or a Related Field",
                duration: "Duration depends on the selected program",
                description:
                    "Learn user experience, interface design, and research methods.",
                tasks: [
                    "Explore relevant degree, diploma, or certificate options.",
                    "Learn to create wireframes and interactive prototypes.",
                    "Study usability and inclusive design."
                ]
            },
            {
                title: "Create Case Studies",
                duration: "During your learning journey",
                description:
                    "Demonstrate how you identify and solve user problems.",
                tasks: [
                    "Design a website or mobile application concept.",
                    "Collect feedback and test your prototype.",
                    "Document your process and improvements."
                ]
            },
            {
                title: "Prepare for Opportunities",
                duration: "After developing relevant skills",
                description:
                    "Present your work and explore suitable opportunities.",
                tasks: [
                    "Create a portfolio with clear case studies.",
                    "Practice explaining design decisions.",
                    "Explore internships and junior design roles."
                ]
            }
        ],

        related: [
            "Graphic Designer",
            "Software Developer",
            "Data Analyst"
        ]
    },

    "Data Analyst": {
        domain: "Data & Analytics",
        description:
            "Use data, statistics, and visualizations to identify patterns and support informed decisions.",

        overview:
            "Data analysts collect, clean, examine, and visualize information. They use spreadsheets, SQL, visualization tools, and sometimes programming to answer questions and communicate findings.",

        salary: {
            range: "Explore current salary data",
            description:
                "Compensation varies by experience, industry, technical skills, location, and employer."
        },

        responsibilities: [
            "Collect and validate relevant data.",
            "Clean datasets and investigate missing values.",
            "Use spreadsheets, SQL, and analytical methods.",
            "Create charts, reports, or dashboards.",
            "Communicate findings, assumptions, and limitations."
        ],

        suitability: [
            "Enjoys analytical and logical thinking.",
            "Likes finding patterns and answering questions.",
            "Is interested in numbers and technology.",
            "Enjoys explaining information clearly."
        ],

        skills: [
            "Data Analysis",
            "Excel",
            "SQL",
            "Statistics",
            "Data Visualization",
            "Python",
            "Critical Thinking"
        ],

        eligibility:
            "Relevant pathways include statistics, mathematics, computer science, information technology, economics, and business analytics. Required subjects and admission criteria vary by institution and program.",

        exams: [
            "University-specific admission tests",
            "Relevant degree entrance examinations",
            "Program-specific eligibility requirements"
        ],

        courses: [
            "B.Sc. Statistics",
            "B.Sc. Mathematics",
            "BCA",
            "B.Tech. Computer Science",
            "Business or Data Analytics programs"
        ],

        stages: [
            {
                title: "Build Mathematical Foundations",
                duration: "Classes 9–10",
                description:
                    "Strengthen numeracy, logical thinking, and basic computer skills.",
                tasks: [
                    "Practice percentages, averages, and basic statistics.",
                    "Create charts from small datasets.",
                    "Learn spreadsheet fundamentals."
                ]
            },
            {
                title: "Choose Relevant Subjects",
                duration: "Classes 11–12",
                description:
                    "Explore mathematics and other subjects required for your target programs.",
                tasks: [
                    "Check eligibility for relevant degree programs.",
                    "Practice spreadsheets and introductory statistics.",
                    "Explore how data helps answer practical questions."
                ]
            },
            {
                title: "Study a Relevant Field",
                duration: "Duration depends on the selected program",
                description:
                    "Develop analytical knowledge through higher education or training.",
                tasks: [
                    "Explore statistics, mathematics, computer science, or analytics.",
                    "Learn SQL and data cleaning.",
                    "Practice creating charts and dashboards."
                ]
            },
            {
                title: "Complete Data Projects",
                duration: "During your learning journey",
                description:
                    "Apply analytical methods to real or public datasets.",
                tasks: [
                    "Clean and analyze a dataset.",
                    "Create a dashboard that answers specific questions.",
                    "Document findings and limitations."
                ]
            },
            {
                title: "Prepare for Opportunities",
                duration: "After developing relevant skills",
                description:
                    "Demonstrate your analytical process and communication skills.",
                tasks: [
                    "Build a portfolio of data projects.",
                    "Practice SQL and analytical questions.",
                    "Explore internships and suitable entry-level roles."
                ]
            }
        ],

        related: [
            "Software Developer",
            "AI & Machine Learning Engineer",
            "UI/UX Designer"
        ]
    }
};


/* --------------------------------------------------
   GENERAL CAREER FALLBACK
-------------------------------------------------- */

function createGenericCareer(name) {
    return {
        domain: "Career Development",

        description:
            `Explore the skills, educational options, and practical experience relevant to becoming a ${name}.`,

        overview:
            `A ${name} follows a career pathway shaped by the profession's responsibilities, qualifications, and specialist skills. Research current industry expectations before choosing a course.`,

        salary: {
            range: "Salary data not available",
            description:
                "Check reliable salary surveys and current job advertisements for this occupation. Earnings vary by location, experience, employer, and specialization."
        },

        responsibilities: [
            `Research the daily responsibilities of a ${name}.`,
            "Identify the main tools, knowledge, and professional skills required.",
            "Develop relevant knowledge through study and practice.",
            "Complete practical activities and request feedback.",
            "Review industry expectations and further learning options."
        ],

        suitability: [
            "Interested in learning about this profession.",
            "Willing to develop relevant knowledge and skills.",
            "Open to practice and constructive feedback.",
            "Interested in exploring suitable career pathways."
        ],

        skills: [
            "Problem Solving",
            "Communication",
            "Subject Knowledge",
            "Organization",
            "Teamwork",
            "Continuous Learning"
        ],

        eligibility:
            "Eligibility depends on the occupation, course, institution, and relevant regulations. Identify recognized qualifications and check official admission requirements before applying.",

        exams: [
            "Check institution-specific requirements",
            "Relevant entrance exams where applicable",
            "Portfolio or aptitude assessments where applicable"
        ],

        courses: [
            "Relevant bachelor's degree",
            "Relevant diploma",
            "Recognized professional training",
            "Career-specific certification where appropriate"
        ],

        stages: [
            {
                title: "Explore the Career",
                duration: "School foundation",
                description:
                    "Understand the profession and identify the skills it requires.",
                tasks: [
                    `Research the daily work of a ${name}.`,
                    "Identify important subjects and foundational knowledge.",
                    "Explore beginner-friendly learning resources."
                ]
            },
            {
                title: "Choose Relevant Subjects",
                duration: "Secondary / senior secondary education",
                description:
                    "Compare subjects against the requirements of possible courses.",
                tasks: [
                    "Check eligibility for relevant programs.",
                    "Discuss subject choices with a teacher or counsellor.",
                    "Set realistic learning goals."
                ]
            },
            {
                title: "Pursue Further Education",
                duration: "Depends on the selected pathway",
                description:
                    "Explore appropriate degrees, diplomas, or vocational training.",
                tasks: [
                    "Compare course content and eligibility.",
                    "Research recognized institutions.",
                    "Review costs, duration, and admission procedures."
                ]
            },
            {
                title: "Gain Practical Experience",
                duration: "During or after training",
                description:
                    "Apply what you learn through practical activities.",
                tasks: [
                    "Complete a relevant project or supervised activity.",
                    "Collect feedback and identify areas for improvement.",
                    "Record your work and learning progress."
                ]
            },
            {
                title: "Plan Your Next Step",
                duration: "After building relevant skills",
                description:
                    "Explore suitable education and career opportunities.",
                tasks: [
                    "Check current professional requirements.",
                    "Prepare relevant project or qualification evidence.",
                    "Explore further study or suitable entry-level opportunities."
                ]
            }
        ],

        related: []
    };
}


/* --------------------------------------------------
   READ SELECTED CAREER
-------------------------------------------------- */

const params = new URLSearchParams(window.location.search);

const selectedCareer =
    params.get("career") ||
    sessionStorage.getItem("recommendedCareer") ||
    "AI & Machine Learning Engineer";

const career =
    roadmapData[selectedCareer] || createGenericCareer(selectedCareer);


/* --------------------------------------------------
   SAFE DOM HELPERS
-------------------------------------------------- */

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value ?? "";
    }
}

function renderBulletList(id, items) {
    const container = document.getElementById(id);

    if (!container) return;

    container.innerHTML = "";

    if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML =
            '<p class="empty-state">Information is not available yet.</p>';
        return;
    }

    items.forEach(item => {
        const element = document.createElement("div");

        element.className = "bullet-item";
        element.textContent = item;

        container.appendChild(element);
    });
}

function renderTags(id, items) {
    const container = document.getElementById(id);

    if (!container) return;

    container.innerHTML = "";

    if (!Array.isArray(items) || items.length === 0) {
        container.innerHTML =
            '<p class="empty-state">No information available.</p>';
        return;
    }

    items.forEach(item => {
        const tag = document.createElement("span");

        tag.className = "data-tag";
        tag.textContent = item;

        container.appendChild(tag);
    });
}


/* --------------------------------------------------
   CAREER INTRODUCTION
-------------------------------------------------- */

setText("careerTitle", selectedCareer);
setText("careerBranch", career.domain);
setText("careerDescription", career.description);

setText(
    "careerOverview",
    career.overview
);

setText(
    "salaryRange",
    career.salary.range
);

setText(
    "salaryDescription",
    career.salary.description
);

renderBulletList(
    "responsibilitiesList",
    career.responsibilities
);

renderBulletList(
    "careerSuitability",
    career.suitability
);

renderTags(
    "skillsList",
    career.skills
);

setText(
    "eligibilityText",
    career.eligibility
);

renderTags(
    "entranceExams",
    career.exams
);

renderTags(
    "recommendedCourses",
    career.courses
);


/* --------------------------------------------------
   FIVE-STAGE EDUCATIONAL ROADMAP
-------------------------------------------------- */

const roadmapContainer =
    document.getElementById("roadmapStages");

if (roadmapContainer) {
    roadmapContainer.innerHTML = career.stages.map((stage, index) => `
        <article class="roadmap-stage" data-stage="${index}">
            <div class="stage-icon">${index + 1}</div>

            <div class="stage-content">
                <span class="stage-label">
                    ${escapeHTML(stage.duration)}
                </span>

                <h3>${escapeHTML(stage.title)}</h3>

                <p>${escapeHTML(stage.description)}</p>

                <ul class="stage-tasks">
                    ${stage.tasks.map(task => `
                        <li>${escapeHTML(task)}</li>
                    `).join("")}
                </ul>

                <label class="stage-check">
                    <input
                        type="checkbox"
                        class="stage-checkbox"
                        aria-label="Mark ${escapeHTML(stage.title)} complete"
                    >
                    Mark complete
                </label>
            </div>
        </article>
    `).join("");
}


/* --------------------------------------------------
   RELATED CAREERS
-------------------------------------------------- */

const relatedContainer =
    document.getElementById("relatedCareers");

function renderRelatedCareers(items) {
    if (!relatedContainer) return;

    relatedContainer.innerHTML = "";

    if (!Array.isArray(items) || items.length === 0) {
        relatedContainer.innerHTML = `
            <p class="empty-state">
                Related-career recommendations are not available yet.
            </p>
        `;
        return;
    }

    items.forEach(item => {
        const name =
            typeof item === "string"
                ? item
                : item.name || item.career || item.title;

        if (!name || name === selectedCareer) return;

        const score =
            typeof item === "object"
                ? Number(item.similarity ?? item.score)
                : NaN;

        const card = document.createElement("a");

        card.className = "related-career-card";
        card.href = `/roadmap?career=${encodeURIComponent(name)}`;

        const details = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = name;

        const description = document.createElement("p");
        description.textContent = "Explore this career pathway";

        details.append(title, description);

        card.appendChild(details);

        if (Number.isFinite(score)) {
            const badge = document.createElement("span");

            badge.className = "similarity-score";

            const percentage =
                score <= 1
                    ? Math.round(score * 100)
                    : Math.round(score);

            badge.textContent = `${Math.max(0, Math.min(100, percentage))}% Match`;

            card.appendChild(badge);
        }

        relatedContainer.appendChild(card);
    });

    if (!relatedContainer.children.length) {
        relatedContainer.innerHTML = `
            <p class="empty-state">
                No related careers are available for this selection.
            </p>
        `;
    }
}


/*
 * Temporary career suggestions are shown only when no backend
 * recommendation endpoint is configured successfully.
 *
 * These are not similarity scores. No percentage is fabricated.
 */

renderRelatedCareers(career.related);


/* --------------------------------------------------
   LOAD RELATED CAREERS FROM FLASK
-------------------------------------------------- */

/*
 * This expects an optional Flask endpoint:
 * GET /api/related-careers?career=Software%20Developer
 *
 * Expected response:
 * {
 *   "careers": [
 *      {"name": "Data Analyst", "similarity": 0.76}
 *   ]
 * }
 *
 * Similarity values must come from the actual recommendation model.
 */

async function loadRelatedCareers() {
    try {
        const url =
            `/api/related-careers?career=${encodeURIComponent(selectedCareer)}`;

        const response = await fetch(url);

        if (!response.ok) return;

        const data = await response.json();

        if (Array.isArray(data.careers)) {
            renderRelatedCareers(data.careers);
        }
    } catch (error) {
        /*
         * The backend endpoint may not exist yet.
         * The page continues to work using career-related suggestions.
         */
        console.info(
            "Using available related-career suggestions.",
            error.message
        );
    }
}

loadRelatedCareers();


/* --------------------------------------------------
   ROADMAP PROGRESS
-------------------------------------------------- */

const progressKey =
    `careerRoadmapProgress_${selectedCareer}`;

const stageCheckboxes = [
    ...document.querySelectorAll(".stage-checkbox")
];

function updateProgress() {
    const completed = stageCheckboxes.filter(
        checkbox => checkbox.checked
    ).length;

    const total = stageCheckboxes.length;

    const percentage = total
        ? Math.round(completed / total * 100)
        : 0;

    stageCheckboxes.forEach(checkbox => {
        const stage = checkbox.closest(".roadmap-stage");

        if (stage) {
            stage.classList.toggle(
                "is-complete",
                checkbox.checked
            );
        }
    });

    sessionStorage.setItem(
        progressKey,
        JSON.stringify(
            stageCheckboxes.map(checkbox => checkbox.checked)
        )
    );
}

function restoreProgress() {
    try {
        const saved = JSON.parse(
            sessionStorage.getItem(progressKey) || "[]"
        );

        stageCheckboxes.forEach((checkbox, index) => {
            checkbox.checked = Boolean(saved[index]);
        });
    } catch (error) {
        console.warn("Unable to restore progress.", error);
    }

    updateProgress();
}

stageCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateProgress);
});

restoreProgress();


/* --------------------------------------------------
   AI ROADMAP BUTTON
-------------------------------------------------- */

const generatePlanButton =
    document.getElementById("generatePlanButton");

if (generatePlanButton) {
    generatePlanButton.addEventListener("click", () => {
        const roadmapSection =
            document.getElementById("roadmapStages");

        if (roadmapSection) {
            roadmapSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            roadmapSection.classList.add("roadmap-highlight");

            window.setTimeout(() => {
                roadmapSection.classList.remove("roadmap-highlight");
            }, 1600);
        }
    });
}


/* --------------------------------------------------
   DOWNLOAD ROADMAP
-------------------------------------------------- */

const downloadButton =
    document.getElementById("downloadButton");

if (downloadButton) {
    downloadButton.addEventListener("click", () => {
        window.print();
    });
}


/* --------------------------------------------------
   PAGE TITLE
-------------------------------------------------- */

document.title = `${selectedCareer} Roadmap | CareerPath AI`;
