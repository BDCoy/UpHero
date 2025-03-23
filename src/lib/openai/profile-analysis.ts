import { te } from "date-fns/locale";
import { openai } from "./config";

// Define templates
const templates = [
  {
    template: `
    🌟 **Struggling to scale your business and manage complex digital operations effectively?**  
    🚀 **Feeling overwhelmed by [specific challenge relevant to the client’s business]?**

    I specialize in delivering **tailored [service type]** solutions that are **secure, scalable, and user-friendly**. Whether you need **front-end** or **back-end** expertise, I’ll ensure your operations are streamlined for **efficiency** and optimized to **boost your bottom line**.

    🌱 **My clients consistently achieve impressive results:**  
    💬 "I highly recommend [Full Name] for [service]. They exceeded our expectations and delivered on time!"  
    💬 "Working with [Full Name] was a game-changer. Their attention to detail and the quality of work were outstanding."

    🔎 **If you’re thinking about:**  
    - **Building a scalable [solution/service] that grows with your business**.  
    - **Seamlessly integrating front-end and back-end to create smooth user experiences**.  
    - **Creating digital solutions that add real business value, not just functionality**.

    🎯 **Facing challenges like:**  
    - Unsure how to scale your [digital products/services] effectively?  
    - Concerned about security and scalability in your [platform/solution]?  
    - Struggling to unite front-end and back-end development into one cohesive strategy?

    💡 **I turn these challenges into growth opportunities**. From concept to launch, I focus on delivering **secure, efficient, and scalable solutions** that solve real problems and drive measurable results.

    🌐 **Expertise in:** [Key Skills/Technologies]  
    🎨 **Proficient in UI/UX design** with [Tools/Frameworks] to deliver sleek and engaging user experiences.  
    📈 **Proven track record** of delivering projects on time and exceeding client expectations.

    🛠 **Technical Expertise Includes:**  
    - ✅ [Relevant Technologies/Frameworks]  
    - ✅ [Tools for Optimization and Integration]  
    - ✅ [Cloud Services/Hosting Platforms]  
    - ✅ [Any Other Key Skills]  
    - ✅ [API Integrations, Specialized Skills]

    With over [Years of Experience] in [Relevant Domain], I’ve successfully completed [Number] projects, blending cutting-edge technology with seamless user-centric design.

    ✅ [Specific Achievements/Recognition]  
    ✅ [Exceeding Client Expectations, Metrics, etc.]

    🚀 **Ready to elevate your digital presence?**  
    Click the 'Invite to Job' button, send me a message, and let’s discuss how we can bring your vision to life!
  `,
  },
  {
    template: `
    **🏆 Top [Profession] | Full [Service 1] and Setup | [Service 2] Expert**  
    **🥇 [Number] + [Completed Projects] | 🥇 [Number] + [Hours Worked]**  
    **🔥 Ranked in the Top [Percentage]% of [Profession/Expert] on [Platform Name]**

    ### 💼 About Me:  
    I am a dedicated [Profession] with [Number] years of experience in creating [Specific Services or Products]. My passion lies in helping clients scale their [Business Type] by creating impactful [profession-specific deliverables like websites, courses, etc.]. Whether you need [target client needs], I bring your ideas to life with creativity and precision. 🎨💡

    ### 💻 Services I Offer:  
    - 🚀 [Service 1 Description]  
    - 💡 [Service 2 Description]  
    - 🌟 [Service 3 Description]  
    - 🔧 [Service 4 Description]  
    - ⚡ [Service 5 Description]  
    - 🎯 [Service 6 Description]

    ### 🛠️ How I Work:  
    1. **💬 Consultation**: Start with a free [time duration] [type of call] to discuss your business goals and needs.  
    2. **📝 Planning**: I help you plan your [service type] and [other service/product structure].  
    3. **🎨 Design & Development**: I design and build your [service type], ensuring it's visually appealing and functional.  
    4. **⚙️ Setup**: I set up your [service/product content], including [details like modules, lessons, etc.].  
    5. **🧪 Testing**: I thoroughly test everything to ensure smooth functionality.  
    6. **🚀 Launch & Support**: I assist with the launch and provide ongoing support as needed.

    ### 🔑 Keywords:  
    [Keyword 1], [Keyword 2], [Keyword 3], [Keyword 4], [Keyword 5], [Keyword 6], [Keyword 7], [Keyword 8], [Keyword 9], [Keyword 10]
  `,
  },
  {
    template: `
    👋 **Hey, what's up? [Name] here, and thanks for stopping by!**  
        I firmly believe that **[your expertise] is the ambassador of your brand**, and it reflects and represents you. It helps you **visualize your market** and communicate your vision effectively. ✨

        ### 💼 My Top Skills:
        - 🖌️ **[Skill 1]**
        - 🔤 **[Skill 2]**
        - 📊 **[Skill 3]**
        - 📈 **[Skill 4]**
        - 🛠️ **[Skill 5]**
        - 💡 **[Skill 6]**
        - 🎨 **[Skill 7]**
        - 🔍 **[Skill 8]**
        - 💬 **[Skill 9]**

        ### 🎯 Services I Offer:
        - 📢 **[Service 1]**
        - 🏷️ **[Service 2]**
        - 👕 **[Service 3]**
        - 📝 **[Service 4]**
        - 📘 **[Service 5]**
        - 🖼️ **[Service 6]**
        - 📦 **[Service 7]**
        - 💻 **[Service 8]**
        - 🔗 **[Service 9]**

        ### 🌱 My Interests:
        - 🎨 **[Interest 1]**
        - ✍️ **[Interest 2]**
        - 🎤 **[Interest 3]**

        With more than **[X years]** of experience in **[field]**, I've helped individuals and organizations achieve their goals. 🚀👨‍💼

        ### 👨‍💻 My Transition into [Field]:
        I started as a **[Position 1]** and eventually transitioned to a **[Position 2]**. I have experience with:
        - 🖥️ **[Experience 1]**
        - 🖋️ **[Experience 2]**
        - 🔄 **[Experience 3]**

        ### 🌍 Best Practices for [Industry/Field]:
        1. ⚡ **[Best Practice 1]**  
          [Details about best practice 1]

        2. 📱 **[Best Practice 2]**  
          [Details about best practice 2]

        3. 🧩 **[Best Practice 3]**  
          [Details about best practice 3]

        4. 🛠️ **[Best Practice 4]**  
          [Details about best practice 4]

        5. ♿ **[Best Practice 5]**  
          [Details about best practice 5]

        6. 🔑 **[Best Practice 6]**  
          [Details about best practice 6]

        ### 🎉 Why I Do This:
        I am excited every day to wake up and do what I love! **[Your expertise]** is my passion, and I look forward to collaborating with you on your next project! 🙌✨  
        **I am at your service!** 💼💬

        ---
        ### 🔑 **Keywords:**
        [Keyword 1], [Keyword 2], [Keyword 3], [Keyword 4], [Keyword 5], [Keyword 6], [Keyword 7], [Keyword 8], [Keyword 9], [Keyword 10]
    `,
  },
  {
    template: `
    Do you need someone with a proven record of [profession] expertise?

    A little about me:

    ✅ [X] years of experience in [specific area of work].
    📈 [Number] successful projects completed in the last year.
    🌍 Served clients of all sizes, from [type of clients] to [type of clients], globally.
    💯 [X]% client satisfaction rate, with [X]% of clients returning.
    🔍 Deep understanding of [relevant skills or principles] through experience and extensive research.

    Here are some numbers to think about:

    📊 [Statistic related to profession or industry]
    📱 [Another relevant statistic]
    ⏱ [One more related number or fact]

    Source: [Reliable source name]

    Here are a few key points from my years of experience and research:

    🚀 [Key point related to profession]
    💡 [Another important point]
    📲 [Third important point]
    💬 [Additional insight]
    📈 [Tip or advice based on experience]

    Why should you work with me?

    ⚡ Anything you can think of, I can do in [tool/technology used]. From [task 1] to [task 2], I’ve got it all.
    🖥 No-nonsense modern & practical [user-centered designs | solutions].
    🏆 [Platform name] can vouch for me. Top-rated [freelancer/employee] with a [X]% job success score.
    ⏳ Experience lightning-fast turnaround times.
    🔧 End-to-end service. Get the best of both worlds with high-quality [designs/solutions] and flawless execution.

    Don’t be shy, send me a message and say hello! I’d love to hear more about your vision and get to know you!
        ---
        ### 🔑 **Keywords:**
        [Keyword 1], [Keyword 2], [Keyword 3], [Keyword 4], [Keyword 5], [Keyword 6], [Keyword 7], [Keyword 8], [Keyword 9], [Keyword 10]
  `,
  },
];

interface UpworkProfileOptimization {
  score: number;
  optimizedHeadline: string;
  optimizedDescription: string;
  recommendations: string[];
  keywordSuggestions: string[];
  skillHighlights: string[];
}

export async function analyzeUpworkProfile(
  currentHeadline: string,
  currentDescription: string,
  fullName: string
): Promise<UpworkProfileOptimization> {
  try {
    // Randomly select a template
    const selectedTemplate =
      templates[Math.floor(Math.random() * templates.length)].template;

    const prompt = `
    You are an AI assistant designed to optimize Upwork profiles. I will provide two inputs:
    
    1. **Professional Headline**: A job title (e.g., Full Stack Developer, Project Manager).
       ${currentHeadline}
    
    2. **Profile Description**: A detailed description of the services or expertise, as it appears in the Upwork profile.
       ${currentDescription}
    
    3. **Full Name**: [Full Name of the person] - ${fullName}
    
    Please return a JSON with the following structure:
    
    {
      "score": number (0-100),
      "optimizedHeadline": "string (compelling, keyword-rich headline under 70 characters)",
      "optimizedDescription": "string (engaging, client-focused description with emojis, highlighting client pain points, needs, and results)",
      "recommendations": [
        "string (specific improvement suggestions)"
      ],
      "keywordSuggestions": [
        "string (relevant keywords to include)"
      ],
      "skillHighlights": [
        "string (key skills to emphasize)"
      ]
    }
    
    The **recommendations** must include at least 10 actionable suggestions.
    
    The **optimizedDescription** must follow this template:
    ${selectedTemplate}
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert in Upwork profile optimization with extensive knowledge of what makes profiles successful and attracts high-quality clients.",
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
      throw new Error("Failed to generate profile analysis.");
    }

    return JSON.parse(response);
  } catch (error) {
    console.error("Error analyzing profile:", error);
    throw error;
  }
}
