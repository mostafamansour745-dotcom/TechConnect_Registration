using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Serve index.html and static files from wwwroot folder
app.UseDefaultFiles();
app.UseStaticFiles();

// Available sessions - single source of truth
var availableSessions = new[]
{
    "Building Modern Web APIs",
    "Introduction to Cloud Computing",
    "Clean Code and Best Practices"
};

// POST /api/registrations
app.MapPost("/api/registrations", (RegistrationRequest request) =>
{
    // ---- Server-side Validation ----

    var errors = new List<string>();

    if (string.IsNullOrWhiteSpace(request.Name))
        errors.Add("Name is required.");

    if (string.IsNullOrWhiteSpace(request.Email) || !request.Email.Contains("@"))
        errors.Add("A valid email is required.");

    if (string.IsNullOrWhiteSpace(request.Phone))
        errors.Add("Phone is required.");

    if (request.Gender != "male" && request.Gender != "female")
        errors.Add("Gender must be 'male' or 'female'.");

    if (!availableSessions.Contains(request.Session))
        errors.Add("Please select a valid session.");

    if (errors.Count > 0)
        return Results.BadRequest(new { success = false, errors });

    // ---- Create Registration ----

    var registrationId = $"REG-{Random.Shared.Next(100000, 999999)}";
    var createdAt      = DateTime.UtcNow;

    var registration = new
    {
        RegistrationId = registrationId,
        Name           = request.Name,
        Email          = request.Email,
        Phone          = request.Phone,
        Gender         = request.Gender,
        Session        = request.Session,
        CreatedAt      = createdAt
    };

    // ---- Log to Console as JSON ----

    var json = JsonSerializer.Serialize(registration, new JsonSerializerOptions
    {
        WriteIndented = true
    });

    Console.WriteLine("\n=== New Registration ===");
    Console.WriteLine(json);
    Console.WriteLine("========================\n");

    // ---- Return Success Response ----

    return Results.Ok(new
    {
        success        = true,
        message        = "Registration submitted successfully.",
        registrationId = registrationId
    });
});

app.Run();

// ---- DTO: defines the shape of the incoming request ----
record RegistrationRequest(
    string Name,
    string Email,
    string Phone,
    string Gender,
    string Session
);
