document.getElementById("leadForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const payload = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/.netlify/functions/saveLead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Thank you! We’ll contact you soon.");
      this.reset();
    } else {
      alert(data.message || "Server error. Please try again.");
    }

  } catch (err) {
    alert("Network error. Please try again.");
    console.error(err);
  }
});
