// const analyzeIdea = (req, res) => {

//     const { startupName, idea, industry } = req.body;

//     if (!startupName || !idea || !industry) {
//         return res.status(400).json({
//             success: false,
//             message: "All fields are required"
//         });
//     }

//     res.json({
//         success: true,
//         startupName,
//         idea,
//         industry
//     });

// };

// module.exports = {
//     analyzeIdea
// };



const model = require("../services/geminiService");
const Idea = require('../models/Idea')

const analyzeIdea = async (req, res) => {
    try {

        console.log("USER FROM TOKEN:",req.user);

        const { startupName, idea, industry } = req.body;
        // Only for checking of req.body
        // console.log(req.body);


        if (!startupName || !idea || !industry) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        //Gemini apni merzi se essay likh raha hai
        // const prompt = `
        // Analyze this startup idea.
        // Startup Name: ${startupName}
        // Industry: ${industry}
        // Idea: ${idea}
        // `;

        //Now hume Promt Engineering karni padegi ye prompt enginnering to kar di par abhi ye json mai nhi de raha hai

        // const prompt = `
        // You are an AI Startup Business Analyst.

        // Analyze the following startup idea.

        // Startup Name: ${startupName}
        // Industry: ${industry}
        // Idea: ${idea}

        // Return the response in this exact format.

        // SWOT Analysis

        // Strengths:
        // -...

        // Weaknesses:
        // -...

        // Opportunities:
        // -...

        // Threats:
        // -...

        // Market Size:
        // ...

        // Top 3 Competitors:
        // 1.
        // 2.
        // 3.

        // Viability Score:
        // Give score out of 10.

        // Business Brief:
        // Write a short business summary in 5-6 lines.

        // Keep the response simple and easy to understand.
        // `

        //Json banane ke liya 
        const prompt = `
            You are an AI Startup Business Analyst.

            Analyze the startup idea below and return ONLY a valid JSON object.

            Do NOT use markdown.
            Do NOT use code blocks.
            Do NOT write anything outside JSON.

            Startup Name: ${startupName}
            Industry: ${industry}
            Idea: ${idea}

            Return JSON in this exact format:

            {
             "swot": {
             "strengths": [],
             "weaknesses": [],
             "opportunities": [],
             "threats": []
            },
            "marketSize": "",
            "competitors": [],
            "viabilityScore": "",
            "businessBrief": ""
            }
        `;

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        //CONVERT THE RESPONSE IN JSON FORMAT AND SAVE INTO MONGODB
        const analysis = JSON.parse(response);

        const newIdea = new Idea({
            user: req.user.userId,
            startupName,
            idea,
            industry,
            analysis
        });
        await newIdea.save();
        res.json({
            success: true,
            message: "Analysis saved successfully",
            analysis
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong.."
        })
    }
}

module.exports = {
    analyzeIdea
}