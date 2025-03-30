document.addEventListener("DOMContentLoaded", function () {
    chrome.action.openPopup();
    const resultDiv = document.getElementById("result");

    // Retrieve stored summary from Chrome's local storage
    chrome.storage.local.get("aiDigestResult", function (data) {
        if (data.aiDigestResult) {
            resultDiv.innerText = data.aiDigestResult;
        } else {
            resultDiv.innerText = "No summary available.";
        }
    });
});
