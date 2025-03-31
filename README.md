# AI Article Summarizer

This project consists of a **Flask-based AI server** that summarizes articles and a **Chrome extension** that fetches and sends article content to the server for summarization.

## Prerequisites
- **Python 3.13.1**
- **Google Chrome**
- **Node.js & npm** (if modifying the extension, but not required for running it)

## Setting Up the Flask Server

1. **Navigate to the project folder:**
   ```sh
   cd AI-Server
   ```

2. **Create a virtual environment:**
   ```sh
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On **Windows (Command Prompt)**:
     ```sh
     venv\Scripts\activate
     ```
   - On **Mac/Linux**:
     ```sh
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

5. **Run the server:**
   ```sh
   python bart_server.py
   ```

6. **Wait for the model to download and initialize.** Once the server is running, you will see an output indicating it is listening on `http://0.0.0.0:5000/`.

### Verify the Server is Running
You can test if the server is up by visiting this URL in your browser:
   ```
   http://localhost:5000/
   ```
You should see a response:
   ```json
   {"message": "Server is running!"}
   ```

---
## Setting Up the Chrome Extension

1. **Open Chrome and go to the Extensions page:**
   - Open Chrome and enter the following in the address bar:
     ```
     chrome://extensions/
     ```

2. **Enable Developer Mode:**
   - Toggle the switch at the top right labeled "Developer mode" to ON.

3. **Load the unpacked extension:**
   - Click **Load unpacked**.
   - Select the folder containing the extension files (usually `chrome-extension/`).

4. **The extension should now appear in your extensions list.**

---
## How to Use the Chrome Extension

1. **Go to any webpage that contains an article.**
2. **Right-click on a link to an article.**
3. **Select "Summarize Article" from the context menu.**
4. **Wait about 30 seconds for the summarization to process.**
5. **Check the extension popup for the summary!**

---
## Troubleshooting

- **If the extension doesn’t work:**
  - Ensure the Flask server is running (`python bart_server.py`).
  - Refresh the extension (chrome://extensions/ → click "Reload").
  - Check the browser console (`F12` → Console) for any errors.
  - Open `chrome://inspect/#extensions` and check logs.

- **If the model takes too long to respond:**
  - The first run may take time due to model initialization.
  - Ensure your device has sufficient RAM.

---
## Future Improvements
- Add GPU support for faster inference.
- Improve UI for the extension.
- Support additional summarization models.

---
**License:** MIT
