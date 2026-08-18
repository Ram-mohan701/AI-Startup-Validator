import "./ResultCard.css";
function ResultCard({result}){
    return(
        <div className="result-card">
            <h2>Analysis Result</h2>

            <h3>Viability Score: {result.viabilityScore}</h3>

            <h3>Business Brief</h3>
            <p>{result.businessBrief}</p>

            <h3>Market Size</h3>
            <p>{result.marketSize}</p>

            <h3>Top Competitors</h3>
            <ul>
                {result.competitors.map((competitor,index)=>(
                    <li key={index}> {competitor}</li>
                ))}
            </ul>
        <div className="swot-grid">

            <div className="swot-box">
            <h3>Strengths</h3>
            <ul>
                {result.swot.strengths.map((strength,index)=>(
                    <li key={index}>{strength}</li>
                ))}
            </ul>
            </div>

            <div className="swot-box">
            <h3>Weaknesses</h3>
            <ul>
                {result.swot.weaknesses.map((weakness,index)=>(
                    <li key={index}>{weakness}</li>
                ))}
            </ul>
            </div>

            <div className="swot-box">
            <h3>Opportunities</h3>
            <ul>
                {result.swot.opportunities.map((opportunity,index)=>(
                    <li key={index}>{opportunity}</li>
                ))}
            </ul>
            </div>

            <div className="swot-box">
            <h3>Threats</h3>
            <ul>
                {result.swot.threats.map((threat,index)=>(
                    <li key={index}>{threat}</li>
                ))}
            </ul>
            </div>
        </div>


            {/* <pre>{JSON.stringify(result,null,2)}</pre> */}
        </div>
    )
}

export default ResultCard;