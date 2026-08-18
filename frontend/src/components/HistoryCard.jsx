import { useState } from "react";
import "./HistoryCard.css";
import { deleteIdea } from "../services/api";

const getScoreClass = (score) => {
    const value = parseFloat(score);

    if (value >= 8) return "high-score";
    if (value >= 6) return "medium-score"
    return "low-score"
}

function HistoryCard({ item, onDelete }) {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div className="history-card">
            <h3>{item.startupName}</h3>

            <p><strong>Industry:</strong>{item.industry}</p>

            <p>
                <strong>Viability:</strong>

                <span className={`score-badge ${getScoreClass(item.analysis.viabilityScore)}`}>
                    {item.analysis.viabilityScore}
                </span>
            </p>

            <p className="history-date">
                📅 Analyzed On:{" "}
                {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>

            <div className="history-buttons">
                <button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Hide Details" : "View Details"}
                </button>
                <button onClick={async () => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this startup?");

                    if (!confirmDelete) return;

                    try {
                        await deleteIdea(item._id);
                        onDelete(item._id);
                    } catch (error) {
                        console.error(error);
                    }

                }}>Delete</button>
            </div>

            {showDetails && (
                <div className="history-details">
                    <h4>Business Brief</h4>
                    <p>{item.analysis.businessBrief}</p>

                    <h4>Market Size</h4>
                    <p>{item.analysis.marketSize}</p>

                    <h4>Competitors</h4>
                    <ul>
                        {item.analysis.competitors.map((competitor, index) => (
                            <li key={index}>{competitor}</li>
                        ))}
                    </ul>

                    <h4>Strengths</h4>
                    <ul>
                        {item.analysis.swot.strengths.map((strength, index) => (
                            <li key={index}>{strength}</li>
                        ))}
                    </ul>

                    <h4>Weaknesses</h4>
                    <ul>
                        {item.analysis.swot.weaknesses.map((weakness, index) => (
                            <li key={index}>{weakness}</li>
                        ))}
                    </ul>

                    <h4>Opportunities</h4>
                    <ul>
                        {item.analysis.swot.opportunities.map((opportunity, index) => (
                            <li key={index}>{opportunity}</li>
                        ))}
                    </ul>

                    <h4>Threats</h4>
                    <ul>
                        {item.analysis.swot.threats.map((threat, index) => (
                            <li key={index}>{threat}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );


}

export default HistoryCard;