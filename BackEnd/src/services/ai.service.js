const { GoogleGenerativeAI } = require("@google/generative-ai");

const GenAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = GenAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function generateContent(prompt) {
  const chat = model.startChat({
    history: [],
    systemInstruction: {
      role: "system",
      parts: [
        {
          text: `🛠️ Code Review
🧐 Summary
Briefly state what the code is doing in 1–2 lines.

✅ If the code is correct
✅ The code works correctly

Logic is sound and meets the intended functionality

No major bugs or inefficiencies found

💡 Suggested Improvements:

📝 Variable names → Use more descriptive names

Example: userData ✅ vs ud ❌

⚙️ Function names → Use action-based verbs

Example: calculateTotal() ✅ vs calc() ❌

🎨 Formatting → Keep indentation and spacing consistent

❌ If the code needs improvement
❌ The code needs improvement

📄 Issue: Briefly describe the problem or bug

🐞 Details: Explain what’s wrong and why

🛠️ Fix: Provide corrected code snippet

💡 Suggested Improvements:

📝 Better variable names → totalPrice ✅ vs tp ❌

⚙️ Better function names → fetchUserData() ✅ vs getData() ❌

🎨 Improve formatting for readability

📌 Takeaway
One short, memorable tip for the developer to remember next time.`
        }
      ]
    }
  });

  const maxRetries = 3;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      attempt++;
      if (error.code === 503 && attempt < maxRetries) {
        const delay = 1000 * attempt; // 1s, 2s, 3s delays
        console.warn(`Google API overloaded. Retrying attempt ${attempt} in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        // Throw error if not 503 or max retries exceeded
        throw error;
      }
    }
  }
}

module.exports = generateContent;
