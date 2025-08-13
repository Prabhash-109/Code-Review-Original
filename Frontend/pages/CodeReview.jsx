import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./CodeReview.css";


function CodeReview() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

useEffect(() => {
  if (token) {
    navigate('/');
  }
}, [token, navigate]);

  const [code, setCode] = useState(`Paste your code here...`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });

      let aiReviewText;

      if (typeof response.data === "string") {
        aiReviewText = response.data;
      } else if (response.data && typeof response.data.result === "string") {
        aiReviewText = response.data.result;
      } else {
        aiReviewText = JSON.stringify(response.data, null, 2);
      }

      setReview(aiReviewText);

      const reviewEntry = {
      code,
      result: aiReviewText,
      summary: aiReviewText.split("\n").slice(0, 1).join(" "), 
      timestamp: new Date().toISOString(),
    };


      const existingHistory = JSON.parse(localStorage.getItem("codeReviewHistory")) || [];
      existingHistory.unshift(reviewEntry);
      localStorage.setItem("codeReviewHistory", JSON.stringify(existingHistory));

    } catch (err) {
      console.error("❌ Error while getting review:", err);
      setReview("❌ Failed to fetch review. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              className="code-editor"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%",
                borderRadius: "5px",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>

        <div className="right">
          {loading ? (
            <div className="loader-container">
              <img src="/assets/Ecxd.gif" alt="Analyzing..." className="loader-gif" />
              <p className="loader-text">Analyzing...</p>
            </div>
          ) : (
            <div className="markdown-output">
              {typeof review === "string" && review.trim() !== "" ? (
                <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
              ) : (
                <p>📝 No review generated yet. Click "Review" after pasting code.</p>
              )}
            </div>
          )}
        </div>
      </main>   
    </>
  );
}

export default CodeReview;
