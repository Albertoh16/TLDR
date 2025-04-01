chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    myPopupFunction(message.action);
    sendResponse({ success: true });
});

function myPopupFunction(summ) {
    document.getElementById("loadIcon").style.display="none";
    document.getElementById("result").innerText = summ;
}