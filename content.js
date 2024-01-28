Pointer = 'div.space-x-1\\.5:nth-child(3) > div:nth-child(1)';
Lang = '#deepl-ui-tooltip-id-3 > span.Content--mycsA.text-white.dark\\:text-black.overflow-hidden > span';
Output = 'd-textarea.last\\:grow > div:nth-child(1)';
Switch = '.zh_switch > label:nth-child(1) > input:nth-child(1)'

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

function addElement(){
    target=document.querySelector(Pointer);
    if (typeof target != "null"){
    target.insertAdjacentHTML('afterend','<div class="zh_switch"><label><input type="checkbox"><br>簡/繁</label></div>');
    }
}

function showHideSw(){
    if(document.querySelector(Lang).getAttribute('dl-selected-lang') == 'zh'){
        document.querySelector('.zh_switch').style.display = '';
    } else {
        document.querySelector('.zh_switch').style.display = 'none';
    }
}
currentOutput = '';
function convert(){
    domOutput = document.querySelector(Output)
    if(currentOutput != domOutput.innerHTML && document.querySelector(Switch).checked){
        domOutput.innerHTML = converter(domOutput.innerHTML)
        currentOutput = domOutput.innerHTML;
    }
}

const waitElement = setInterval(() => {
    if(document.querySelector(Pointer)){
        addElement()
        setInterval(showHideSw,500);
        setInterval(convert,500);
        clearInterval(waitElement);
    }
}, 300);

