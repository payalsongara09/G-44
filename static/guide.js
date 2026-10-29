/* ==========================================
   PERSONALIZED CAREER ADVISOR
   GUIDE ME QUESTIONNAIRE
========================================== */

let currentStep = 1;
const totalSteps = 3;


/* ==========================================
   STUDENT DATA
========================================== */

const studentData = {
    name: "",
    class: "",
    stream: "",
    subjects: [],
    domains: [],

    problemSolving: 7,
    logicalReasoning: 7,
    creativity: 7,
    coding: 7,
    communication: 7,
    publicSpeaking: 7,

    preferredWork: "",
    workStyle: "",
    educationGoal: ""
};


/* ==========================================
   OPTION SELECTION
========================================== */

const optionCards = document.querySelectorAll(".option-card");

optionCards.forEach(card => {
    card.addEventListener("click", () => {

        const field = card.dataset.field;
        const value = card.dataset.value;
        const group = card.dataset.group;

        /*
         * MULTI SELECT
         */

        if (card.classList.contains("multi")) {

            if (group === "domains") {

                if (
                    !card.classList.contains("selected") &&
                    studentData.domains.length >= 3
                ) {
                    alert("You can select up to 3 career areas.");
                    return;
                }
            }

            card.classList.toggle("selected");

            if (group === "subjects") {
                updateArray(
                    studentData.subjects,
                    value,
                    card.classList.contains("selected")
                );
            }

            if (group === "domains") {
                updateArray(
                    studentData.domains,
                    value,
                    card.classList.contains("selected")
                );
            }

            return;
        }

        /*
         * SINGLE SELECT
         */

        document
            .querySelectorAll(`[data-field="${field}"]`)
            .forEach(item => {
                item.classList.remove("selected");
            });

        card.classList.add("selected");

        studentData[field] = value;
    });
});


/* ==========================================
   ARRAY HELPER
========================================== */

function updateArray(array, value, selected) {

    if (selected) {

        if (!array.includes(value)) {
            array.push(value);
        }

    } else {

        const index = array.indexOf(value);

        if (index !== -1) {
            array.splice(index, 1);
        }
    }
}


/* ==========================================
   RANGE SLIDERS
========================================== */

const sliders = [
    ["problemSolving", "problemSolvingValue"],
    ["logicalReasoning", "logicalReasoningValue"],
    ["creativity", "creativityValue"],
    ["coding", "codingValue"],
    ["communication", "communicationValue"],
    ["publicSpeaking", "publicSpeakingValue"]
];

sliders.forEach(([sliderId, outputId]) => {

    const slider = document.getElementById(sliderId);
    const output = document.getElementById(outputId);

    // Skip missing elements instead of stopping the entire script.
    if (!slider || !output) {
        return;
    }

    // Display the initial slider value.
    output.textContent = slider.value;

    studentData[sliderId] = Number(slider.value);

    slider.addEventListener("input", () => {

        output.textContent = slider.value;

        studentData[sliderId] = Number(slider.value);
    });
});


/* ==========================================
   VALIDATION
========================================== */

function validateStep(step) {

    /*
     * STEP 1: STUDENT DETAILS
     */

    if (step === 1) {

        const nameElement = document.getElementById("studentName");

        const name = nameElement
            ? nameElement.value.trim()
            : "";

        studentData.name = name;

        if (!name) {
            alert("Please enter your name.");
            return false;
        }

        if (!studentData.class) {
            alert("Please select your class.");
            return false;
        }

        if (!studentData.stream) {
            alert("Please select your stream.");
            return false;
        }
    }

    /*
     * STEP 2: INTEREST QUESTIONS
     */

    if (step === 2) {

        if (studentData.subjects.length === 0) {
            alert("Please select at least one subject.");
            return false;
        }

        if (studentData.domains.length === 0) {
            alert("Please select at least one career area.");
            return false;
        }
    }

    /*
     * STEP 3: SKILLS AND PREFERENCES
     */

    if (step === 3) {

        if (!studentData.preferredWork) {
            alert("Please select the type of work you prefer.");
            return false;
        }

        if (!studentData.workStyle) {
            alert("Please select your work style.");
            return false;
        }

        if (!studentData.educationGoal) {
            alert("Please select your education goal.");
            return false;
        }
    }

    return true;
}


/* ==========================================
   CHANGE STEP
========================================== */

function showStep(step) {

    document
        .querySelectorAll(".question-section")
        .forEach(section => {
            section.classList.remove("active");
        });

    const currentSection = document.getElementById(`step${step}`);

    if (!currentSection) {
        console.error(
            `Questionnaire section step${step} was not found.`
        );
        return;
    }

    currentSection.classList.add("active");

    /*
     * PROGRESS BAR
     */

    const progressFill = document.getElementById("progressFill");

    if (progressFill) {
        const percentage = (step / totalSteps) * 100;
        progressFill.style.width = `${percentage}%`;
    }

    /*
     * STEP NUMBER
     */

    const stepNumber = document.getElementById("stepNumber");

    if (stepNumber) {
        stepNumber.textContent = `${step} / ${totalSteps}`;
    }

    /*
     * STEP LABEL
     */

    const labels = {
        1: "Student Details",
        2: "Interest Questions",
        3: "Skills & Preferences"
    };

    const stageLabel = document.getElementById("stageLabel");

    if (stageLabel) {
        stageLabel.textContent = labels[step];
    }

    /*
     * PROGRESS CIRCLES
     */

    document
        .querySelectorAll(".progress-step")
        .forEach(item => {
            item.classList.remove("active");
        });

    const progressStep = document.getElementById(`progress${step}`);

    if (progressStep) {
        progressStep.classList.add("active");
    }

    /*
     * BACK BUTTON
     */

    const backButton = document.getElementById("backButton");

    if (backButton) {
        backButton.style.visibility =
            step === 1 ? "hidden" : "visible";
    }

    /*
     * CONTINUE BUTTON
     */

    const continueButton = document.getElementById("continueButton");

    if (continueButton) {

        if (step === totalSteps) {
            continueButton.innerHTML =
                `Generate My Career Path <span>✦</span>`;
        } else {
            continueButton.innerHTML =
                `Continue <span>→</span>`;
        }
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==========================================
   NEXT BUTTON
========================================== */

const continueButton = document.getElementById("continueButton");

if (continueButton) {

    continueButton.addEventListener("click", async () => {

        if (!validateStep(currentStep)) {
            return;
        }

        if (currentStep < totalSteps) {

            currentStep++;

            showStep(currentStep);

            return;
        }

        // Final step: request a career prediction.
        await generateCareerPrediction();
    });
}


/* ==========================================
   BACK BUTTON
========================================== */

const backButton = document.getElementById("backButton");

if (backButton) {

    backButton.addEventListener("click", () => {

        if (currentStep > 1) {

            currentStep--;

            showStep(currentStep);
        }
    });
}


/* ==========================================
   CONVERT CLASS
========================================== */

function convertClass(value) {

    const number = Number(value);

    if (!Number.isNaN(number)) {
        return number;
    }

    /*
     * Compatibility with the existing model,
     * which expects a numeric Class feature.
     */

    return 12;
}


/* ==========================================
   CALCULATE ACADEMIC VALUES
========================================== */

function calculateMathPercentage() {

    if (studentData.subjects.includes("Mathematics")) {
        return 85;
    }

    return 70;
}


function calculateProgrammingPercentage() {

    if (
        studentData.subjects.includes("Computer Science") ||
        studentData.domains.includes("Technology")
    ) {
        return studentData.coding * 10;
    }

    return 50;
}


/* ==========================================
   INTEREST AREA
========================================== */

function getInterestArea() {

    if (studentData.domains.length > 0) {
        return studentData.domains[0];
    }

    return "General";
}


/* ==========================================
   SEND DATA TO FLASK
========================================== */

async function generateCareerPrediction() {

    /*
     * Keep the payload compatible with the
     * existing Flask model.
     */

    const payload = {

        Class: convertClass(studentData.class),

        Math_Percentage: calculateMathPercentage(),

        Programming_Percentage: calculateProgrammingPercentage(),

        Communication_Skills: studentData.communication,

        Logical_Reasoning: studentData.logicalReasoning,

        Creativity_Score: studentData.creativity,

        Coding_Skills_Rating: studentData.coding,

        Public_Speaking_Rating: studentData.publicSpeaking,

        Problem_Solving_Rating: studentData.problemSolving,

        Interest_Area: getInterestArea(),

        Preferred_Work: studentData.preferredWork,

        Work_Style: studentData.workStyle,

        Education_Goal: studentData.educationGoal
    };

    console.log("Career prediction data:", payload);

    /*
     * SHOW LOADING STATE
     */

    const button = document.getElementById("continueButton");

    const originalButtonText = button
        ? button.innerHTML
        : "";

    if (button) {
        button.disabled = true;
        button.innerHTML = "Analyzing your profile... ✦";
    }

    try {

        /*
         * CALL FLASK PREDICTION API
         */

        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(payload)
        });

        /*
         * READ RESPONSE
         */

        const result = await response.json();

        console.log("Prediction result:", result);

        if (!response.ok) {
            throw new Error(
                result.error || "Career prediction failed."
            );
        }

        /*
         * EXTRACT PREDICTED CAREER
         */

        const predictedCareer =
            result.predicted_career ||
            result.prediction ||
            result.career;

        if (
            typeof predictedCareer !== "string" ||
            !predictedCareer.trim()
        ) {
            console.error(
                "The API did not return a recognized career field:",
                result
            );

            throw new Error(
                "The prediction response does not contain a career name. Check the Flask /predict response."
            );
        }

        /*
         * SAVE STUDENT PROFILE
         */

        sessionStorage.setItem(
            "careerProfile",
            JSON.stringify(studentData)
        );

        /*
         * SAVE PREDICTION RESPONSE
         */

        sessionStorage.setItem(
            "careerPrediction",
            JSON.stringify(result)
        );

        /*
         * SAVE CAREER NAME
         */

        sessionStorage.setItem(
            "recommendedCareer",
            predictedCareer
        );

        console.log(
            "Opening roadmap for:",
            predictedCareer
        );

        /*
         * NAVIGATE TO CAREER ROADMAP
         */

        window.location.href =
            "/roadmap?career=" +
            encodeURIComponent(predictedCareer);

    } catch (error) {

        console.error("Career prediction error:", error);

        alert(
            error.message ||
            "Something went wrong while generating your career recommendation."
        );

        /*
         * RESTORE THE BUTTON IF PREDICTION FAILS
         */

        if (button) {
            button.disabled = false;
            button.innerHTML = originalButtonText;
        }
    }
}


/* ==========================================
   GENERATE CAREER ROADMAP
========================================== */

function generateCareerRoadmap(careerName) {

    if (!careerName) {

        alert(
            "Please generate a career recommendation first."
        );

        return;
    }

    sessionStorage.setItem(
        "recommendedCareer",
        careerName
    );

    // Use the careerName parameter passed to this function.
    window.location.href =
        "/roadmap?career=" +
        encodeURIComponent(careerName);
}


/* ==========================================
   INITIALIZE QUESTIONNAIRE
========================================== */

showStep(1);