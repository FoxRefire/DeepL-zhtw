Pointer = 'div.space-x-1\\.5:nth-child(3) > div:nth-child(1)';
Lang = 'section.flex > div:nth-child(2) d-textarea';
Output = 'd-textarea.last\\:grow > div:nth-child(1)';
Switch = '.zh_switch > label:nth-child(1) > input:nth-child(1)'

chrome.storage.local.get("locals", (conf) => {
    if(typeof conf.locals == 'undefined') chrome.storage.local.set({'locals': 'tw'}, null);
    converter = OpenCC.Converter({ from: 'cn', to: conf.locals });
});

function setDefaultValue(){
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["isEnabled", "selection", "locals"], (conf) => {
            if(typeof conf.isEnabled == 'undefined') chrome.storage.local.set({'isEnabled': true}, null);
            if(typeof conf.selection == 'undefined') chrome.storage.local.set({'selection': 'hant'}, null);
            if(typeof conf.locals == 'undefined') chrome.storage.local.set({'locals': 'tw'}, null);
            resolve()
        });
    });
}

function waitElement(){
    return new Promise((resolve, reject) => {
        const w = setInterval(() => {
            if(document.querySelector(Pointer)){
                resolve();
                clearInterval(w);
            }
        }, 300);
    });
}

function addElement(){
    target=document.querySelector(Pointer);
    target.insertAdjacentHTML('afterend','<div class="zh_switch"><label><input type="checkbox"><br>簡/繁</label></div>');
    chrome.storage.local.get(["selection", "lastSelection"], (conf) => {
        if(conf.selection == 'hans') {
            document.querySelector(Switch).checked = false;
        } else if(conf.selection == 'hant') {
            document.querySelector(Switch).checked = true;
        } else if(conf.selection == 'remember' && typeof conf.lastSelection != 'undefined') {
            document.querySelector(Switch).checked = conf.lastSelection;
        }
    });
}

function switchStatus(){
    chrome.storage.local.set({'lastSelection': document.querySelector(Switch).checked}, null);

    if(document.querySelector(Lang) && document.querySelector(Lang).getAttribute('lang') == 'zh-CN'){
        document.querySelector('.zh_switch').style.display = '';
    } else {
        document.querySelector('.zh_switch').style.display = 'none';
    }
}

convertedResult = '';
function convert(){
    domOutput = document.querySelector(Output)
    if(convertedResult != domOutput.innerHTML && document.querySelector(Switch).checked){
        domOutput.innerHTML = converter(domOutput.innerHTML)
        convertedResult = domOutput.innerHTML;
    }
}


chrome.storage.local.get("isEnabled", async (conf) => {
    await setDefaultValue();
    if(conf.isEnabled) {
        await waitElement();
        addElement()
        setInterval(switchStatus,500);
        setInterval(convert,500);
    }
});

