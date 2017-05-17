var ljInput = {
    blocks: 0,
    prefix: "id-",
    unSelect: 0,
    lastSelect: 0,
    select: 0
};

var ljDefaultStyleValue = {
    size: "88px",
    color: "#fff",
    strokeColor: "#000",
    float: "center",
    fullX: 1920,
    fullY: 1080,
    x: 1920 / 2,
    y: 1080 - 130
};

ljInput.createBlocks = function () {
    var block = document.createElement("b");
    var id = ljInput.blocks;

    block.id = ljInput.prefix + ljInput.blocks;

    window.project.appendChild(block);
    ljInput.blocks++;

    ljTime.createBlocks(id);
    ljDisplay.createBlocks(id);

    ljInput.setBlockStart(id, ljVideo.getTime());
    ljInput.setBlockEnd(id, ljVideo.getTime() + 2.5);

    ljUi.selectTimeBlockDefaultMod(id);
};

ljInput.selectBlock = function (id) {
    ljInput.unSelect = ljInput.lastSelect;
    ljInput.lastSelect = ljInput.select;
    ljInput.select = id;
};

ljInput.getBlockId = function (id) {
    return parseInt((id.split("-"))[1]);
};

ljInput.getBlock = function (id) {
    return document.getElementById(ljInput.prefix + id);
};

ljInput.setBlockStart = function (id, value) {
    var data = document.getElementById(ljInput.prefix + id);
    var time = document.getElementById(ljTime.prefix + id);

    data.setAttribute("s", value);
    time.setAttribute("s", value);

    ljTime.afterSetBlockStart(time, value);
};

ljInput.getBlockStart = function (id) {
    var data = document.getElementById(ljInput.prefix + id);

    return ljInput.getDomStart(data);
};

ljInput.getDomStart = function (dom) {
    return dom.getAttribute("s");
};

ljInput.setBlockEnd = function (id, value) {
    var data = document.getElementById(ljInput.prefix + id);
    var time = document.getElementById(ljTime.prefix + id);

    data.setAttribute("e", value);
    time.setAttribute("e", value);

    ljTime.afterSetBlockEnd(time, value);
};

ljInput.getBlockEnd = function (id) {
    var data = document.getElementById(ljInput.prefix + id);

    return ljInput.getDomEnd(data);
};

ljInput.getDomEnd = function (dom) {
    return dom.getAttribute("e");
};

ljInput.setBlockContent = function (id, value) {
    var data = document.getElementById(ljInput.prefix + id);

    data.innerText = value;

    ljTime.modifiesBlocks(id, {text: value});
};

ljInput.setBlockStyle = function (id, style, value) {
    var data = document.getElementById(ljInput.prefix + id);

    if (value !== undefined)
    {
        if (style.toLocaleString() == "x" && parseInt(value) < 0)
        {
            value = ljDefaultStyleValue.fullX + parseInt(value);
        }

        if (style.toLocaleString() == "y" && parseInt(value) < 0)
        {
            value = ljDefaultStyleValue.fullY + parseInt(value);
        }

        data.setAttribute("data-" + style.toLowerCase(), value);


        if (value == "")
        {
            data.removeAttribute("data-" + style.toLowerCase());
        }

        if (style.toLocaleString() == "color")
        {
            ljTime.modifiesBlocks(id, {color: value});
        }
    }
};

ljInput.getDomContent = function (dom) {
    return dom.innerText;
};

ljInput.getBlockContent = function (id) {
    var data = document.getElementById(ljInput.prefix + id);

    return ljInput.getDomContent(data);
};

ljInput.getDomStyle = function (dom, style) {
    style = style.toLowerCase();

    var returnValue = dom.getAttribute("data-" + style);

    if (returnValue)
    {
        return returnValue;
    }

    return ljDefaultStyleValue[style];
};

ljInput.getBlockStyle = function (id, style) {
    var data = document.getElementById(ljInput.prefix + id);

    return ljInput.getDomStyle(data, style);
};

ljInput.getAllInput = function () {
    var inputs = window.inputPanel.getElementsByTagName("input");
    var selects = window.inputPanel.getElementsByTagName("select");
    var names = [];

    for (var i = 0; i < inputs.length; i++)
    {
        if (inputs[i].id == "inputQuickCode")
        {
            continue;
        }

        names.push(inputs[i].id.replace("input", ""));
    }

    for (var i = 0; i < selects.length; i++)
    {
        names.push(selects[i].id.replace("input", ""));
    }

    return names;
};

ljInput.updateBlocks = function () {
    var new_content = window.inputContent.value;

    ljInput.setBlockContent(ljInput.select, new_content);

    var styleModifies = ljInput.getAllInput();

    for (var i = 0; i < styleModifies.length; i++)
    {
        var key = styleModifies[i];

        if (key == "Content") { continue; }

        ljInput.setBlockStyle(ljInput.select, key.toLowerCase(), window['input' + key].value);
    }
};

ljInput.removeDom = function (dom) {
    var id = ljInput.getBlockId(dom.id);

    return ljInput.removeBlock(id);
};

ljInput.removeBlock = function (id) {
    var projectDom = ljInput.getBlock(id);
    var timeDom    = ljTime.getBlock(id);

    window.project.removeChild(projectDom);
    window.controllerTime.removeChild(timeDom);
};

ljInput.firstBigChr = function (s) {
    return s.toUpperCase().charAt(0) + s.substring(1);
};

ljInput.domTextFix = function (dom) {

    dom.innerText = pangu.spacing(dom.innerText);

    dom.innerText = dom.innerText.replace(",", "，");
    dom.innerText = dom.innerText.replace("!", "！");
    dom.innerText = dom.innerText.replace("?", "？");
    dom.innerText = dom.innerText.replace("ㄟ", "欸");
    dom.innerText = dom.innerText.replace("ㄚ", "啊");
    dom.innerText = dom.innerText.replace("丫", "啊");
    dom.innerText = dom.innerText.replace("幹", "看");
    dom.innerText = dom.innerText.replace("淦", "看");
    dom.innerText = dom.innerText.replace("屁阿", "屁啦");
    dom.innerText = dom.innerText.replace("屁啊", "屁啦");
    dom.innerText = dom.innerText.replace("，！", "，");
    dom.innerText = dom.innerText.replace("！！！", "！");
    dom.innerText = dom.innerText.replace("！！", "！");
    dom.innerText = dom.innerText.replace("？！", "！");
    dom.innerText = dom.innerText.replace("！？", "！");
    dom.innerText = dom.innerText.replace(" ，", "，");
    dom.innerText = dom.innerText.replace("， ", "，");
    dom.innerText = dom.innerText.replace(" ！", "！");
    dom.innerText = dom.innerText.replace("！ ", "！");
    dom.innerText = dom.innerText.replace(" ？", "？");
    dom.innerText = dom.innerText.replace("？ ", "？");

    // 挑出不該出現在文字中的符號
    var textTmp = dom.innerText.split("");

    for (var i = 0; i < (textTmp.length - 1); i++)
    {
        if (
            textTmp[i] == "！" ||
            textTmp[i] == "？"
        )
        {
            textTmp[i] = "，";
        }
    }

    dom.innerText = textTmp.join("");

    dom.innerText = dom.innerText.replace("，，，", "，");
    dom.innerText = dom.innerText.replace("，，", "，");

    var lastWord = dom.innerText[dom.innerText.length - 1];

    if (
        lastWord != "？" &&
        lastWord != "！" &&
        lastWord != "。" &&
        lastWord != "，" &&
        lastWord != "."  &&
        lastWord != " "
    )
    {
        dom.innerText += "！";
    }

    return dom;
};
