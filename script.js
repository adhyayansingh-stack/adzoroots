document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("leadForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    // Convert form data to JSON
    const payload = Object.fromEntries(formData.entries());

    // TEMP: default type (later we’ll split exporter/buyer)
    payload.type = "general";

    try {
      const res = await fetch("/.netlify/functions/saveLead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Thank you! We’ll contact you soon.");
        this.reset();
      } else {
        alert(data.message || "❌ Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error("Network error:", error);
      alert("❌ Network error. Please try again later.");
    }
  });
});
