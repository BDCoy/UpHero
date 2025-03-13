import { openai } from './config';

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

🔎 **If you're thinking about:**  
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

With over [Years of Experience] in [Relevant Domain], I've successfully completed numerous projects that combine cutting-edge technology with seamless, user-centric design.

✅ [Number of Projects/Years of Experience]  
✅ [Specific Achievements or Recognition]  
✅ [Exceeding Client Expectations, Metrics, etc.]

🚀 **Ready to elevate your digital presence?**

Click the 'Invite to Job' button, send me a message, and let's discuss how we can bring your digital vision to life!
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