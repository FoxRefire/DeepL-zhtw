function setEnabled(){
    document.getElementById('enabledText').style.display = '';
    document.getElementById('disabledText').style.display = 'none';
    document.getElementById('disableButtonText').style.display = '';
    document.getElementById('EnableButtonText').style.display = 'none';
    chrome.storage.local.set({'isEnabled': true}, ()=>{});
}
function setDisabled(){
    document.getElementById('enabledText').style.display = 'none';
    document.getElementById('disabledText').style.display = '';
    document.getElementById('disableButtonText').style.display = 'none';
    document.getElementById('EnableButtonText').style.display = '';
    chrome.storage.local.set({'isEnabled': false}, ()=>{});
}

//init
chrome.storage.local.get(["isEnabled", "selection", "locals"], (conf) => {
    if(typeof conf.isEnabled == 'undefined') chrome.storage.local.set({'isEnabled': true}, ()=>{});
    if(typeof conf.selection == 'undefined') chrome.storage.local.set({'selection': 'hant'}, ()=>{});
    if(typeof conf.locals == 'undefined') chrome.storage.local.set({'locals': 'tw'}, ()=>{});

    conf.isEnabled ? setEnabled() : setDisabled();
    document.getElementById('selection').value = conf.selection
    document.getElementById('locals').value = conf.locals

});

document.getElementById('isEnabled').addEventListener('click', () => {
    chrome.storage.local.get("isEnabled", (conf) => {
        if(conf.isEnabled) {
            setDisabled();
        } else {
            setEnabled();
        }
    });
});

document.getElementById('selection').addEventListener('change', () => {
    chrome.storage.local.set({
        'selection': document.getElementById('selection').value
    }, ()=>{});
});

document.getElementById('locals').addEventListener('change', () => {
    chrome.storage.local.set({
        'locals': document.getElementById('locals').value
    }, ()=>{});
});
