document.getElementById("leadForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  const res = await fetch("/.netlify/functions/saveLead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message")
    })
  });

  const data = await res.json();
  alert(data.message || "Thank you! We’ll contact you soon.");
  this.reset();
});
