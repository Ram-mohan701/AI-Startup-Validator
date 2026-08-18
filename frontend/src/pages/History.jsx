import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard";
import "./History.css";


function History() {
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getHistory();
                setHistory(response.data.ideas);
                console.log(response.data.ideas);

            } catch (error) {
                console.error(error);
            }
        };
        fetchHistory();
    }, []);

    const handleDelete = (id) => {
        setHistory((prevHistory) =>
            prevHistory.filter((item) => item._id !== id)
        );
    };

    //for counting all ideas
    const totalIdeas = history.length;
    const totalScore = history.reduce((sum, item) => {
        return sum + parseFloat(item.analysis.viabilityScore);
    }, 0);

    const averageScore = totalIdeas > 0 ? (totalScore / totalIdeas).toFixed(1) : 0;

    const highestScore = history.length > 0 ? Math.max(...history.map((item) => parseFloat(item.analysis.viabilityScore))) : 0;

    return (
        <>
            <Navbar />

            <div className="container">
                <h1>Analysis History</h1>
                

                <div className="stats-container">

                    <div className="stat-card">
                        <h3>Total Ideas</h3>
                        <p>{totalIdeas}</p>
                    </div>

                    <div className="stat-card"> 
                        <h3>Average Score</h3>
                        <p>{averageScore}</p>
                    </div>

                    <div className="stat-card">
                        <h3>Highest Score</h3>
                        <p>{highestScore}</p>
                    </div>


                </div>

                <input
                    type="text"
                    placeholder="Search Startup..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {history
                    .filter((item) =>
                        item.startupName.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((item) => (
                        <HistoryCard
                            key={item._id}
                            item={item}
                            onDelete={handleDelete}
                        />
                    ))}
            </div>
        </>
    );
}

export default History;