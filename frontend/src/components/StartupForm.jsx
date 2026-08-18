import { useState } from "react";
import "./StartupForm.css";
import { analyzeIdea } from "../services/api";
import ResultCard from "./ResultCard";

function StartupForm() {
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    idea: "",
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {

    e.preventDefault();
    //Purana error clear karega
    setError("");

    //Validation
    if (!formData.startupName.trim()) {
      setError("Please enter startup name.");
      return;
    }
    if (!formData.industry.trim()) {
      setError("Please enter industry.");
      return;
    }
    if (!formData.idea.trim()) {
      setError("Please enter startup idea.");
      return;
    }
    // Minimum 10 words validation
    const words = formData.idea.trim().split(/\s+/);

    if (words.length < 10) {
      setError("Startup idea must contain at least 10 words.");
      return;
    }
    // Random gibberish validation
    const uniqueWords = [...new Set(words)];

    if (uniqueWords.length < 5) {
      setError("Please enter a meaningful startup idea.");
      return;
    }


    //Loading start
    setLoading(true);


    try {
      const response = await analyzeIdea(formData);

      setResult(response.data.analysis);
    } catch (error) {
      console.log(error);
      setError("Failed to analyze startup. Please try again.");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">

      <h2>🚀 AI Startup Validator</h2>

      <p>
        Validate your startup idea with AI-powered market analysis.
      </p>

      <label>Startup Name</label>
      <input
        type="text"
        name="startupName"
        placeholder="Enter startup name"
        value={formData.startupName}
        onChange={handleChange}
      />

      <label>Industry</label>
      <input
        type="text"
        name="industry"
        placeholder="Enter industry"
        value={formData.industry}
        onChange={handleChange}
      />

      <label>Startup Idea</label>
      <textarea
        rows="6"
        name="idea"
        placeholder="Describe your startup idea..."
        value={formData.idea}
        onChange={handleChange}
      ></textarea>

      {/* ye line esliye hai jisse hum apna live update dekh skte hai startup name or industry idea ko change krke */}
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}


      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Startup"}
      </button>
      {error && <p className="error-message">{error}</p>}
      {result && <ResultCard result={result} />}
    </div>
  );
}

export default StartupForm;