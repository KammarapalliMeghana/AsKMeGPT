import "dotenv/config";

const getAIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
You are AskMeGPT, a helpful AI assistant.

Rules:
1. Give concise and well-formatted answers.
2. For comparisons, always use markdown tables.
3. For code questions, provide:
   - explanation
   - code block
   - how to run
4. Use headings and bullet points.
5. Avoid generic responses like "I can help with that".
`,
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            temperature: 0.7,
            max_tokens: 1024,
        }),
    };

    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            options
        );

        const data = await response.json();

        if (!response.ok) {
            console.log(data);
            return "Error: " + data.error?.message;
        }

        return data.choices[0].message.content;
    } catch (err) {
        console.log(err);
        return "Something went wrong.";
    }
};

export default getAIResponse;