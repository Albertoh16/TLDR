from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load BART model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def chunk_text(text, max_chars=3000):
    """Splits text into smaller chunks while keeping word boundaries."""
    chunks = []
    while len(text) > max_chars:
        split_index = text[:max_chars].rfind(" ")  # Find nearest space to avoid cutting words
        if split_index == -1:
            split_index = max_chars  # Hard cut if no space found
        chunks.append(text[:split_index])
        text = text[split_index:].strip()
    chunks.append(text)  # Add remaining text
    return chunks

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    text = data.get("prompt", "").strip()
    print(text) 

    if not text:
        return jsonify({"error": "No valid text provided"}), 400

    # Truncate text to a maximum of 1024 tokens (approx. 4000 characters) BACK UP SOLUTION
    # max_input_length = 4000  # Adjust based on testing
    # text = text[:max_input_length]


    # ISSUE IS LAST CHUNK HAS LIKELY HAS NO RELEVANCE AND IS SUMMARIZED AND STICHED.
    try:
        # Split text into manageable chunks
        text_chunks = chunk_text(text, max_chars=3000)
        summaries = []

        for chunk in text_chunks:
            summary = summarizer(chunk, max_length=200, min_length=50, do_sample=False)
            summaries.append(summary[0]["summary_text"])

        # Combine all chunk summaries into a final summary
        final_summary = " ".join(summaries)

        return jsonify({"response": final_summary})
    except Exception as e:
        print(f"Error processing text: {str(e)}")
        return jsonify({"error": "Failed to generate summary"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
