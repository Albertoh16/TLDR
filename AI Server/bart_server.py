from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load BART model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    text = data.get("prompt", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Generate summary
    summary = summarizer(text, max_length=150, min_length=30, do_sample=False)
    
    return jsonify({"response": summary[0]["summary_text"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
