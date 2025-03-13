import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OpenAI API key is required');
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
});

export async function analyzeUpworkProfile(
  currentHeadline: string,
  currentDescription: string,
  fullName: string
): Promise<any> {
  try {

const prompt = `
You are a professional AI assistant designed to optimize Upwork profiles. I will provide you with two inputs:

1. **Professional Headline**: A profession or job title (e.g., Full Stack Developer, Project Manager).
   ${currentHeadline}
   
2. **Profile Description**: A detailed description of the services or expertise, as it appears in the Upwork profile.
   ${currentDescription}

3. **Full Name**: Person full name ${fullName}

Based on these inputs, please return a JSON with the following structure:

{
  "score": number (0-100),
  "optimizedHeadline": "string (compelling, keyword-rich headline under 70 chars)",
  "optimizedDescription": "string (sales-driven, engaging description with emojis, focused on client needs, results, and pain points)",
  "recommendations": [
    "string (specific improvement suggestions)"
  ] ,
  "keywordSuggestions": [
    "string (relevant keywords to include)"
  ],
  "skillHighlights": [
    "string (key skills to emphasize)"
  ]
}

The **recommendations** must include at least 10 recommendations.

The **optimizedDescription** must follow this template:

🌟 **Are you struggling to scale your business and manage complex digital operations effectively?**  
🚀 **Feeling overwhelmed by development challenges that don't align with your vision?**

I specialize in delivering **tailored web development solutions** that are **secure, scalable, and user-friendly**. Whether you need **front-end** or **back-end** expertise, I ensure that your operations are streamlined for **efficiency** and optimized to **boost your bottom line**.

🌱 **My clients consistently see impressive results:**  
💬 "I highly recommend [Your Name] for web development projects. They exceeded our expectations and delivered on time!"  
💬 "Working with [Your Name] was a game-changer. The attention to detail and quality of work were outstanding."

🔎 **If you’re thinking about:**  
- **Building a scalable web application that grows with your business.**  
- **Integrating front-end and back-end seamlessly for smooth user experiences.**  
- **Creating a digital solution that adds real business value, not just functionality.**  
- **Reducing complexity by managing fewer developers for your projects.**

🎯 **Facing challenges like:**  
- Unsure about how to scale your digital products effectively?  
- Concerned about security and scalability issues in your web applications?  
- Struggling to unite front-end and back-end requirements under one cohesive strategy?

💡 **I turn these challenges into growth opportunities.** From concept to launch, I focus on **creating secure, efficient, and scalable web applications** that solve real problems and drive measurable results.

🌐 **Expertise in:** [Key Skills/Technologies]  
🎨 **Proficient in UI/UX design** with [Tools/Frameworks] to deliver a sleek and engaging user experience.  
📈 **Proven track record** of delivering projects on time and exceeding client expectations.

🛠 **Technical Expertise Includes:**  
- ✅ [Relevant Technologies/Frameworks]  
- ✅ [Tools for Optimization and Integration]  
- ✅ [Cloud Services/Hosting Platforms]  
- ✅ [Any Other Key Skills]  
- ✅ [API Integrations and Specialized Skills]

With over [Years of Experience] in [Relevant Domain], I’ve successfully completed numerous projects that combine cutting-edge technology with seamless, user-centric design.

✅ [Number of Projects/Years of Experience]  
✅ [Specific Achievements or Recognition]  
✅ [Exceeding Client Expectations, Metrics, etc.]

🚀 **Ready to elevate your digital presence?**

Click the 'Invite to Job' button, send me a message, and let’s discuss how we can bring your digital vision to life!
`;



    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert in Upwork profile optimization with extensive knowledge of what makes profiles successful and attracts high-quality clients."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("Failed to generate profile analysis.");
    }

    return JSON.parse(response);
  } catch (error) {
    console.error("Error analyzing profile:", error);
    throw error;
  }
}

export async function createCoverLetter(
  profileText: string,
  jobDescription: string,
  selectedTone: string,
  companyName: string,
  hiringManager: string
): Promise<any> {
  try {
    if (!profileText.trim() || !jobDescription.trim()) {
      throw new Error(
        "Both profile text and job description are required to generate a cover letter."
      );
    }

    const prompt = `
    You are a professional cover letter generator specializing in crafting compelling, tailored applications. Your task is to generate a highly personalized cover letter based on the provided candidate profile and job description, ensuring alignment with the job requirements while maintaining the selected tone.
    
    ### Candidate Profile:
    ${profileText}
    
    ### Job Description:
    ${jobDescription}
    
    ### Cover Letter Details:
    - **Tone:** ${selectedTone}
    - **Company Name:** ${companyName}
    - **Hiring Manager Name:** ${hiringManager}
    
    ### Formatting Requirements:
    Provide the cover letter in a structured JSON format:
    
    {
      "header": {
        "name": "string" (based on personal data),
        "title": "string" (based on personal data),
        "contact": {
          "address": "string" (based on personal data),
          "cityStateZip": "string" (based on personal data),
          "phone": "string" (based on personal data),
          "email": "string" (based on personal data),
          "linkedin": "string" (based on personal data)
        }
      },
      "content": {
        "recipient": {
          "name": "${hiringManager}",
          "company": "${companyName}"
        },
        "subject": "string",
        "greeting": "string",
        "paragraphs": [
          "string",
          "string",
          "string"
        ],
        "closing": {
          "salutation": "string" (based on personal data),
          "name": "string" (based on personal data),
          "phone": "string" (based on personal data),
          "email": "string" (based on personal data),
          "linkedin": "string" (based on personal data)
        }
      }
    }
    
    ### Cover Letter Guidelines:
    1. **Conciseness:** Keep the cover letter under 200 words.
    2. **Customization:** Highlight key skills and experiences from the candidate profile that match the job description.
    3. **Personalization:** Explicitly reference the job title and company name.
    4. **Tone Adherence:** Ensure the tone matches the specified selection:
       - **Informal:** Friendly and engaging.
       - **Semi-Casual:** Warm and slightly professional.
       - **Neutral:** Balanced and professional.
       - **Semi-Formal:** Respectful and business-oriented.
       - **Formal:** Highly polished and structured.
    5. **Profile Data Integration:** Use only the candidate's actual contact details. **If a field is missing, do not include it in the JSON output.**
    6. **Grammar & Readability:** Ensure clarity, impact, and professionalism while aligning with industry expectations.
    
    The final output should be professional, structured, and customized to ensure the cover letter is engaging and relevant to the job description.
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert in crafting professional, tailored cover letters in various tones. Your task is to generate concise, engaging, and well-structured cover letters that align with the job description and candidate's profile. Ensure each version maintains clarity, impact, and an appropriate level of professionalism while adhering to the specified tone.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("Failed to generate cover letter.");
    }

    const parsedResponse = JSON.parse(response);

    return parsedResponse;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate cover letter: ${error.message}`);
    }
    throw new Error(
      "An unexpected error occurred while generating the cover letter."
    );
  }
}

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

export { openai };