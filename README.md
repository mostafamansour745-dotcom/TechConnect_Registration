# TechConnect 2025 — Registration Form

A simple registration form for a virtual event, built with ASP.NET Core (Backend) and HTML/CSS/JavaScript (Frontend).

---

## Features

- Registration form with full client-side validation
- ASP.NET Core Minimal API handles POST requests
- Server-side validation on all fields
- Logs each registration as JSON in the server console
- Returns a unique Registration ID on success
- Clean error messages for invalid input
- Responsive design for mobile and desktop

---

## Technologies

- **Backend:** C#, ASP.NET Core 8, Minimal API
- **Frontend:** HTML, CSS, Vanilla JavaScript

---

## Project Structure

```
TechConnectRegistration/
│
├── Program.cs                  ← Backend: API endpoint + validation + logging
├── TechConnectRegistration.csproj
├── README.md
│
└── wwwroot/
    ├── index.html              ← Registration form
    ├── style.css               ← Styling
    └── script.js               ← Client-side validation + fetch request
```

---

## How to Run Locally

**Requirements:** .NET 8 SDK — https://dotnet.microsoft.com/download

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/TechConnectRegistration.git
cd TechConnectRegistration

# 2. Run the project
dotnet run

# 3. Open your browser
# http://localhost:5000
```

---

## API Endpoint

### POST /api/registrations

**Request Body:**
```json
{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "phone": "+20 10 1234 5678",
  "gender": "male",
  "session": "Building Modern Web APIs"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Registration submitted successfully.",
  "registrationId": "REG-482910"
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "errors": ["A valid email is required.", "Please select a valid session."]
}
```

---

## How the Backend Processes a Registration

1. Receives the POST request at `/api/registrations`
2. Runs server-side validation on all fields
3. Returns 400 with error list if validation fails
4. Generates a unique Registration ID (`REG-XXXXXX`)
5. Logs the full registration as formatted JSON in the console
6. Returns 200 with success message and Registration ID

---

## Available Sessions

- Building Modern Web APIs
- Introduction to Cloud Computing
- Clean Code and Best Practices

---

## Deployment

ASP.NET Core apps are not directly supported on Vercel (which runs Node.js).

**Free hosting options for ASP.NET Core:**
- **Railway** — https://railway.app (recommended, supports .NET)
- **Render** — https://render.com (supports .NET)
- **Azure App Service** — free tier available

If deployment is not possible, the project runs fully local with `dotnet run` and can be demonstrated live during the interview.
