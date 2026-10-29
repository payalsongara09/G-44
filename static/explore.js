
// ========================================
// CareerPath AI - Explore Career Module
// Compatible with career_explorer_all_domains(2).csv
// ========================================

const careerGrid = document.getElementById("careerGrid");
const careerSearch = document.getElementById("careerSearch");
const domainFilters = document.getElementById("domainFilters");
const careerCount = document.getElementById("careerCount");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");
const careerDetails = document.getElementById("careerDetails");

let allCareers = [];
let selectedDomain = "All";

// ========================================
// Icons for different career domains
// ========================================

const domainIcons = {
    "Core Engineering": "⚙️",
    "Technology": "💻",
    "Healthcare & Medicine": "🩺",
    "Healthcare": "🩺",
    "Finance & Banking": "📊",
    "Finance": "📊",
    "Design & Creative Arts": "🎨",
    "Design": "🎨",
    "Law & Legal Services": "⚖️",
    "Law": "⚖️",
    "Aerospace": "🚀",
    "Psychology & Mental Health": "🧠",
    "Psychology": "🧠",
    "Business & Management": "💼",
    "Business": "💼",
    "Education & Academia": "📚",
    "Education": "📚",
    "Science & Research": "🔬",
    "Science": "🔬",
    "Media & Communication": "🎬",
    "Media": "🎬",
    "Agriculture & Food Systems": "🌱",
    "Agriculture": "🌱",
    "Environment & Sustainability": "🌍",
    "Hospitality & Tourism": "🏨",
    "Sports & Fitness": "🏆",
    "Government, Public Policy & Administration": "🏛️",
    "Defence, Aerospace & Security Services": "🛡️",
    "default": "✨"
};


// ========================================
// Helper: Read a field safely
// ========================================

function getValue(career, field, fallback = "") {
    const value = career[field];

    if (value === null || value === undefined) {
        return fallback;
    }

    const text = String(value).trim();

    return text || fallback;
}


// ========================================
// Helper: Format long text for display
// ========================================

function formatText(value) {
    if (!value) {
        return "Information not available.";
    }

    return String(value)
        .split(";")
        .map(item => item.trim())
        .filter(Boolean)
        .join(" • ");
}


// ========================================
// Load career data from Flask API
// ========================================

async function loadCareers() {
    try {
        loadingMessage.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        emptyMessage.classList.add("hidden");

        const response = await fetch("/api/careers");

        if (!response.ok) {
            const errorResult = await response.json().catch(() => ({}));

            throw new Error(
                errorResult.message || "Could not load career dataset."
            );
        }

        const result = await response.json();

        if (
            result.status !== "success" ||
            !Array.isArray(result.careers)
        ) {
            throw new Error(
                result.message || "Invalid dataset response."
            );
        }

        // Use the actual dataset records.
        allCareers = result.careers;

        // Remove records without a career name.
        allCareers = allCareers.filter(career =>
            getValue(career, "career_name") !== ""
        );

        loadingMessage.classList.add("hidden");

        createDomainFilters();
        displayCareers();

        console.log("Careers loaded:", allCareers.length);
        console.log("Dataset columns:", Object.keys(allCareers[0] || {}));

    } catch (error) {
        console.error("Career loading error:", error);

        loadingMessage.classList.add("hidden");

        errorMessage.textContent =
            "Unable to load careers: " + error.message;

        errorMessage.classList.remove("hidden");

        careerCount.textContent = "Careers unavailable";
    }
}


// ========================================
// Create domain filter buttons
// ========================================

function createDomainFilters() {
    const domains = [
        ...new Set(
            allCareers
                .map(career =>
                    getValue(career, "career_domain")
                )
                .filter(Boolean)
        )
    ].sort();

    domainFilters.innerHTML = "";

    // Reset an invalid selection if the dataset changes.
    if (
        selectedDomain !== "All" &&
        !domains.includes(selectedDomain)
    ) {
        selectedDomain = "All";
    }

    addFilterButton("All", "All Domains");

    domains.forEach(domain => {
        addFilterButton(domain, domain);
    });
}


// ========================================
// Add an individual filter button
// ========================================

function addFilterButton(domain, label) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "filter-btn";
    button.textContent = label;
    button.dataset.domain = domain;

    if (domain === selectedDomain) {
        button.classList.add("active");
    }

    button.addEventListener("click", () => {
        selectedDomain = domain;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.dataset.domain === selectedDomain
            );
        });

        displayCareers();
    });

    domainFilters.appendChild(button);
}


// ========================================
// Search and filter careers
// ========================================

function displayCareers() {
    if (!careerGrid || !careerSearch) {
        return;
    }

    const searchTerm = careerSearch.value.trim().toLowerCase();

    const filteredCareers = allCareers.filter(career => {

        // Actual dataset column: career_domain
        const domain = getValue(career, "career_domain");

        const matchesDomain =
            selectedDomain === "All" ||
            domain === selectedDomain;

        // Search using actual CSV column names.
        const searchableText = [
            career.career_id,
            career.career_name,
            career.career_domain,
            career.branch,
            career.career_description,
            career.skills,
            career.school_subjects,
            career.education_pathways,
            career.project_ideas,
            career.career_progression,
            career.tfidf_keywords,
            career.key_responsibilities,
            career.eligibility_guidance,
            career.entrance_exams,
            career.class_9_10_roadmap,
            career.class_11_12_roadmap,
            career.after_12th_roadmap,
            career.college_roadmap,
            career.internship_guidance,
            career.related_careers
        ]
            .map(value => String(value || ""))
            .join(" ")
            .toLowerCase();

        const matchesSearch =
            searchableText.includes(searchTerm);

        return matchesDomain && matchesSearch;
    });

    careerGrid.innerHTML = "";

    careerCount.textContent =
        `${filteredCareers.length} career` +
        `${filteredCareers.length === 1 ? "" : "s"} found`;

    emptyMessage.classList.toggle(
        "hidden",
        filteredCareers.length !== 0
    );

    filteredCareers.forEach(career => {
        careerGrid.appendChild(createCareerCard(career));
    });
}


// ========================================
// Create individual career cards
// ========================================

function createCareerCard(career) {
    const card = document.createElement("article");

    card.className = "career-card";

    // Correct dataset column names.
    const domain = getValue(
        career,
        "career_domain",
        "Other"
    );

    const branch = getValue(
        career,
        "branch"
    );

    const careerName = getValue(
        career,
        "career_name",
        "Career"
    );

    const overview = getValue(
        career,
        "career_description",
        "Explore this career and its opportunities."
    );

    const education = getValue(
        career,
        "education_pathways",
        "Explore suitable education pathways."
    );

    const icon = domainIcons[domain] || domainIcons.default;

    // Card header
    const top = document.createElement("div");
    top.className = "card-top";

    const iconBox = document.createElement("div");
    iconBox.className = "career-icon";
    iconBox.textContent = icon;

    const domainTag = document.createElement("span");
    domainTag.className = "domain-tag";
    domainTag.textContent = domain;

    top.append(iconBox, domainTag);

    // Career title
    const title = document.createElement("h3");
    title.textContent = careerName;

    // Optional branch label
    if (branch) {
        const branchLabel = document.createElement("p");

        branchLabel.className = "career-branch";
        branchLabel.textContent = branch;

        card.append(top, title, branchLabel);
    } else {
        card.append(top, title);
    }

    // Career description
    const description = document.createElement("p");

    description.textContent =
        overview.length > 145
            ? overview.slice(0, 145) + "..."
            : overview;

    // Card footer
    const bottom = document.createElement("div");
    bottom.className = "card-bottom";

    const educationLabel = document.createElement("span");
    educationLabel.className = "education-label";

    educationLabel.textContent =
        education.length > 55
            ? education.slice(0, 55) + "..."
            : education;

    const detailsButton = document.createElement("button");

    detailsButton.type = "button";
    detailsButton.className = "details-btn";
    detailsButton.textContent = "Explore →";

    detailsButton.addEventListener("click", () => {
        showCareerDetails(career);
    });

    bottom.append(educationLabel, detailsButton);

    card.append(description, bottom);

    return card;
}


// ========================================
// Display detailed career information
// ========================================

function showCareerDetails(career) {

    // Career title and domain
    document.getElementById("detailName").textContent =
        getValue(career, "career_name", "Career");

    document.getElementById("detailDomain").textContent =
        getValue(career, "career_domain", "Career Domain");


    // Career overview
    document.getElementById("detailOverview").textContent =
        getValue(
            career,
            "career_description",
            "No overview available."
        );


    // Key skills
    document.getElementById("detailSkills").textContent =
        formatText(
            getValue(career, "skills")
        );


    // Education and entry pathway
    document.getElementById("detailEducation").textContent =
        formatText(
            getValue(career, "education_pathways")
        );


    // Recommended career progression
    document.getElementById("detailPathway").textContent =
        formatText(
            getValue(career, "career_progression")
        );


    // Important school subjects
    document.getElementById("detailSubjects").textContent =
        formatText(
            getValue(career, "school_subjects")
        );


    // Career roadmap:
    // Combine the actual education-stage roadmap fields.
    const roadmapParts = [
        ["Classes 9–10", "class_9_10_roadmap"],
        ["Classes 11–12", "class_11_12_roadmap"],
        ["After Class 12", "after_12th_roadmap"],
        ["College", "college_roadmap"],
        ["Internship", "internship_guidance"]
    ];

    const roadmapText = roadmapParts
        .map(([label, field]) => {
            const value = getValue(career, field);

            if (!value) {
                return "";
            }

            return `${label}: ${value}`;
        })
        .filter(Boolean)
        .join("\n\n");

    document.getElementById("detailRoadmap").textContent =
        roadmapText || "Information not available.";


    // Related careers
    document.getElementById("detailRelated").textContent =
        formatText(
            getValue(career, "related_careers")
        );


    // Add optional entrance examination information
    // to the existing education section without changing HTML.
    const entranceExams = getValue(career, "entrance_exams");

    if (entranceExams) {
        document.getElementById("detailEducation").textContent +=
            "\n\nEntrance Examinations: " + entranceExams;
    }


    // Pass the selected career to the roadmap page.
    const roadmapButton = document.getElementById("getRoadmapBtn");

    const careerId = getValue(career, "career_id");

    if (careerId) {
        roadmapButton.href =
            "/roadmap?career_id=" + encodeURIComponent(careerId);
    } else {
        roadmapButton.href =
            "/roadmap?career=" +
            encodeURIComponent(
                getValue(career, "career_name", "Career")
            );
    }


    // Display the existing career profile.
    careerDetails.classList.remove("hidden");

    careerDetails.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ========================================
// Close career details
// ========================================

document.getElementById("closeDetails").addEventListener("click", () => {
    careerDetails.classList.add("hidden");
});


// ========================================
// Search while typing
// ========================================

careerSearch.addEventListener("input", displayCareers);


// ========================================
// Start the module
// ========================================

loadCareers();
