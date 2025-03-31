/* 
This script is only called when the popup is actually opened, meaning we need to figure out a way for us to
refresh the html to reflect the text on the extension. 

1. We need to make the loading bar present only if there isn't an aiDigestResult.
2. we need to refresh the html to show the summarization.

What's going to happen is that the extension will open, and since the AI digest takes a minute, it will display "no summary available" 
until we manually refresh it ourselves since that's when DOM content is ever loaded.
*/

document.addEventListener("DOMContentLoaded", function () {
    // chrome.action.openPopup();
    const resultDiv = document.getElementById("result");
    
    // Retrieve stored summary from Chrome's local storage
    chrome.storage.local.get("aiDigestResult", function (data) {
        if (data.aiDigestResult) {
            resultDiv.innerText = data.aiDigestResult;
        } else {
            resultDiv.innerText = "No summary available.";
        }
        
        // document.getElementById("loadIcon").style.display="none"; // Makes the HTML content appear.
    });
});