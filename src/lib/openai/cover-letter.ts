import { openai } from './config';

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