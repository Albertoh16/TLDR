// import cheerio from "cheerio"; // Works after Webpack bundles it
import * as cheerio from "cheerio";

chrome.runtime.onInstalled.addListener(() => 
{
    chrome.contextMenus.create(
    {
        id: "SummarizeLink",
        title: "Summarize Article",
        contexts: ["link"]
    });
});


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "SummarizeLink" && info.linkUrl) {
        console.log("Fetching content from:", info.linkUrl);
        try {
            // Fetch webpage content
            const response = await fetch(info.linkUrl);
            const html = await response.text();

            // Extract meaningful content from the HTML
            const extractedText = extractTextFromHTML(html);
            console.log("Extracted text:", extractedText);

            // if (extractedText) {
            //     // Send extracted text to AI
            //     const aiResponse = await fetch("http://localhost:11434/api/generate", {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({
            //             model: "mistral",
            //             prompt: `Summarize the following article:\n\n${extractedText}`,
            //             stream: false
            //         })
            //     });

            //     const data = await aiResponse.json();
            //     const summary = data.response;
            //     console.log("AI Summary:", summary);

            //     // Store the summary & notify user
            //     chrome.storage.local.set({ aiDigestResult: summary });
            //     chrome.action.openPopup();
            // }
        } catch (error) {
            console.error("Error summarizing link:", error);
            if (error.response) {
                console.error("Response Error:", error.response);
            }
            if (error.request) {
                console.error("Request Error:", error.request);
            }
        }
    }
});

// Function to extract readable text from raw HTML
function extractTextFromHTML(html) {
    const $ = cheerio.load(html);
    
    // Extract all text from the body tag
    return $("body").text().trim();
}