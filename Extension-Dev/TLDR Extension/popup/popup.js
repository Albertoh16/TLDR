document.addEventListener("DOMContentLoaded", function () {
    chrome.action.openPopup();
    const resultDiv = document.getElementById("result");
    document.getElementById("loadicon").style.display="block"; // Makes the HTML content appear.

    // Retrieve stored summary from Chrome's local storage
    chrome.storage.local.get("aiDigestResult", function (data) {
        if (data.aiDigestResult) {
            resultDiv.innerText = data.aiDigestResult;
        } else {
            resultDiv.innerText = "No summary available.";
        }
        document.getElementById("loadicon").style.display="none"; // Hides the HTML content.
    });
});
