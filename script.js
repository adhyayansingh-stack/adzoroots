document.getElementById("leadForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const payload = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/.netlify/functions/saveLead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    alert(data.message);
    this.reset();
  } catch (err) {
    alert("Something went wrong");
    console.error(err);
  }
});
