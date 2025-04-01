// Listens to a message sent by backend.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    myPopupFunction(message.action);
    sendResponse({ success: true });
});

// Makes the loading bar invisible and displays the summerized text
function myPopupFunction(summ) {
    document.getElementById("loadIcon").style.display="none";
    document.getElementById("result").innerText = summ;
}