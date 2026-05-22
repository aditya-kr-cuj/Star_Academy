const enrollmentFormUrl = "https://forms.gle/t7oCHNZKW5ewT1hp7";

function openEnrollmentForm() {
    window.open(enrollmentFormUrl, "_blank", "noopener,noreferrer");
}

function bindEnrollmentCTAs() {
    const enrollTargets = document.querySelectorAll("#openForm, .enroll-btn, [data-enroll-now]");

    enrollTargets.forEach(function(target) {
        // Never hijack real form submission controls.
        if (target.closest("form")) return;
        if (target.tagName === "BUTTON" && target.type === "submit") return;

        target.addEventListener("click", function(event) {
            event.preventDefault();
            openEnrollmentForm();
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".current-year").forEach(function(yearElement) {
        yearElement.textContent = new Date().getFullYear();
    });

    bindEnrollmentCTAs();
});

window.openEnrollmentForm = openEnrollmentForm;
