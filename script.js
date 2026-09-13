// ---- Validation Helpers ----

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  if (input) input.classList.add("invalid");
  document.getElementById(errorId).classList.add("visible");
}

function clearFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  if (input) input.classList.remove("invalid");
  document.getElementById(errorId).classList.remove("visible");
}

function validateForm() {
  let isValid = true;

  // Name
  const name = document.getElementById("name").value.trim();
  if (!name) {
    showFieldError("name", "nameError");
    isValid = false;
  } else {
    clearFieldError("name", "nameError");
  }

  // Email
  const email = document.getElementById("email").value.trim();
  if (!isValidEmail(email)) {
    showFieldError("email", "emailError");
    isValid = false;
  } else {
    clearFieldError("email", "emailError");
  }

  // Phone
  const phone = document.getElementById("phone").value.trim();
  if (!phone) {
    showFieldError("phone", "phoneError");
    isValid = false;
  } else {
    clearFieldError("phone", "phoneError");
  }

  // Gender
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    document.getElementById("genderError").classList.add("visible");
    isValid = false;
  } else {
    document.getElementById("genderError").classList.remove("visible");
  }

  // Session
  const session = document.getElementById("session").value;
  if (!session) {
    showFieldError("session", "sessionError");
    isValid = false;
  } else {
    clearFieldError("session", "sessionError");
  }

  return isValid;
}

// ---- UI State Helpers ----

function setLoading(isLoading) {
  const btn    = document.getElementById("submitBtn");
  const text   = document.getElementById("btnText");
  const loader = document.getElementById("btnLoader");

  btn.disabled = isLoading;
  text.textContent = isLoading ? "Registering..." : "Register Now";
  loader.classList.toggle("hidden", !isLoading);
}

function showSuccess(registrationId) {
  document.getElementById("successMsg").classList.remove("hidden");
  document.getElementById("errorMsg").classList.add("hidden");
  document.getElementById("registrationId").textContent = `Your ID: ${registrationId}`;
}

function showError(message) {
  document.getElementById("errorMsg").classList.remove("hidden");
  document.getElementById("successMsg").classList.add("hidden");
  document.getElementById("errorText").textContent = message;
}

function hideAlerts() {
  document.getElementById("successMsg").classList.add("hidden");
  document.getElementById("errorMsg").classList.add("hidden");
}

// ---- Form Submit ----

document.getElementById("registrationForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  hideAlerts();

  // Client-side validation first
  if (!validateForm()) return;

  // Collect form data
  const formData = {
    name:    document.getElementById("name").value.trim(),
    email:   document.getElementById("email").value.trim(),
    phone:   document.getElementById("phone").value.trim(),
    gender:  document.querySelector('input[name="gender"]:checked').value,
    session: document.getElementById("session").value
  };

  setLoading(true);

  try {
    // Send POST request to the C# API
    const response = await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showSuccess(data.registrationId);
      document.getElementById("registrationForm").reset();
    } else {
      // Backend returned validation errors
      const errorMessage = data.errors ? data.errors.join(" ") : "Something went wrong.";
      showError(errorMessage);
    }

  } catch (error) {
    // Network error or server is down
    showError("Could not connect to the server. Please try again.");
  } finally {
    setLoading(false);
  }
});
