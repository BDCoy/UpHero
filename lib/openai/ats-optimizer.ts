import { openai } from "./config";

export async function generateATSRecommendations(
  cvContent: string,
  jobDescription: string
): Promise<any> {
  try {
    if (!cvContent.trim()) {
      throw new Error("CV content cannot be empty.");
    }

    const prompt = `
    ### ATS Resume Optimizer
    
    Enhance CV compatibility with Applicant Tracking Systems (ATS) by identifying keyword gaps and optimizing content **based on the job description**.
    
    #### **Input:**
    - **CV Content:**  
  
      ${cvContent}
   
    - **Job Description:**  
    
      ${jobDescription}
    
    
    #### **Instructions:**
    1. **Analyze the CV Content**  
       - Extract all relevant keywords, skills, and industry terms used in the CV.
       - Identify key competencies, experience, and phrasing within the CV.
    
    2. **Extract & Compare Keywords (CV vs Job Description)**  
       - **Identify present keywords**: Extract keywords, phrases, and terminology found in both the **CV** and **job description**.  
       - **Identify missing keywords**: Extract critical terms **from the job description** that are **absent** from the CV.  
       - Categorize all extracted terms into:
         - **Industry-specific terms**  
         - **Technical skills**  
         - **Soft skills**  
    
    3. **Evaluate ATS Compatibility**  
       - Compute an **ATS Score** (0-100) based on:
         - **Keyword match percentage** (missing vs present)
         - **Formatting compliance** (bullet points, structure, section order)
         - **Content optimization** (action verbs, keyword repetition, readability)
       - Highlight missing critical elements that impact ATS ranking.
    
    4. **Provide Actionable Recommendations**  
       - Suggest improvements in **format, structure, phrasing, and keyword usage** based on the job description.  
       - Identify **skill gaps** and categorize their level of importance.  
       - Ensure all recommendations follow **British English conventions**.
    
    #### **Output Format (Valid JSON)**
    \`\`\`json
    {
      "score": number,
      "missingKeywords": ["string"],
      "foundKeywords": ["string"],
      "recommendations": ["string"],
      "skillGaps": [
        {
          "skill": "string",
          "importance": "high" | "medium" | "low",
          "context": "string"
        }
      ],
      "industryTerms": ["string"],
      "technicalSkills": ["string"],
      "softSkills": ["string"],
      "formatIssues": ["string"],
      "improvementSuggestions": ["string"]
    }
    \`\`\`
    
    Now generate a structured JSON response based on the provided **CV content** and **job description**, ensuring the **missing keywords are derived from the job description**.
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an ATS optimization expert. Your role is to analyze CVs and provide recommendations to enhance ATS compatibility. Ensure that your suggestions are clear, actionable, and relevant to improving job application success rates.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("Failed to generate ATS recommendations.");
    }

    const parsedResponse = JSON.parse(response);

    return parsedResponse;
  } catch (error) {
    console.error("Error generating ATS recommendations:", error);
    if (error instanceof Error) {
      throw new Error(
        `Failed to generate ATS recommendations: ${error.message}`
      );
    }
    throw new Error(
      "An unexpected error occurred while generating ATS recommendations."
    );
  }
}
