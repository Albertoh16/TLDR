chrome.runtime.onInstalled.addListener(() => 
{
    chrome.contextMenus.create(
    {
        id: "ArtSum",
        title: "Summarize Article",
        contexts: ["link"]
    });
});