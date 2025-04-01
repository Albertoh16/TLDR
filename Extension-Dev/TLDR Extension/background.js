// import cheerio from "cheerio"; // Works after Webpack bundles it
import * as cheerio from "cheerio";

//epic
chrome.runtime.onInstalled.addListener(() => 
{
    chrome.contextMenus.create(
    {
        id: "SummarizeLink",
        title: "Summarize Article",
        contexts: ["link"]
    });
});



chrome.contextMenus.onClicked.addListener(async (info, tab) => 
{
    // We open the popup when called.
    chrome.action.openPopup();

    if (info.menuItemId === "SummarizeLink" && info.linkUrl) 
    {
        console.log("Fetching content from:", info.linkUrl);
    }

    try 
    {    
        // Fetch webpage content
        const response = await fetch(info.linkUrl, { mode: "no-cors" });

        const html = await response.text();

        // Extract meaningful content from the HTML
        const extractedText = extractTextFromHTML(html);

        if (extractedText) 
        {

            console.log("Sending extracted text to API:", extractedText);

            // Send extracted text to AI
            const aiResponse = await fetch("http://localhost:5000/generate", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify
                ({
                    prompt: extractedText
                })
            });

            console.log("Recieved AI Response", aiResponse);

            const data = await aiResponse.json();
            const summary = data.response;

            console.log("AI Summary:", summary);

            chrome.runtime.sendMessage({ action: summary }, (response) => {});
        }
    } 

    catch (error) 
    {
        console.error("Error summarizing link:", error);
        if (error.response) {
            console.error("Response Error:", error.response);
        }
        if (error.request) {
            console.error("Request Error:", error.request);
        }
    }
});

// Function to extract readable text from raw HTML
function extractTextFromHTML(html) {
    const $ = cheerio.load(html);

    // Remove unwanted elements before extracting text
    $("script, style, noscript, iframe, svg, nav, footer, header, aside").remove();

    // Extract and return cleaned text
    return $("body").text().replace(/\s+/g, ' ').trim();
}