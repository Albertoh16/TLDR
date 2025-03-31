from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

MAX_CHARS_FINAL_SUMMARY = 3100

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

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"message": "Server is running!"}), 200


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


    try:
        # Step 1: Summarize each chunk separately
        # Split text into manageable chunks
        text_chunks = chunk_text(text, max_chars=3000)
        chunk_summaries = []
        total_chars = 0  # Running counter for final summary input size
        print("Amount of chunks: ", len(text_chunks))
        for index, chunk in enumerate(text_chunks):
            print(f"Summarizing Chunk {index+1}")
            summary = summarizer(chunk, max_length=200, min_length=50, do_sample=False)
            chunk_length = len(summary[0]["summary_text"])

            # Ensure we don’t exceed the final summary limit
            if total_chars + chunk_length > MAX_CHARS_FINAL_SUMMARY:
                print(f"Final Summary limit exceeded: {MAX_CHARS_FINAL_SUMMARY}. Final Summary length: {total_chars}")
                break

            chunk_summaries.append(summary[0]["summary_text"])
            total_chars += chunk_length  # Update running total
            print(f"Adding chunk. Total Char length is {total_chars}")

        # Step 2: Generate a final summary from all chunk summaries
        combined_text = " ".join(chunk_summaries)
        print("Combined Text Summaries: ", len(combined_text))
        final_summary = summarizer(combined_text, max_length=500, min_length=200, do_sample=False)[0]["summary_text"]

        return jsonify({"response": final_summary})
    except Exception as e:
        print(f"Error processing text: {str(e)}")
        return jsonify({"error": "Failed to generate summary"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
