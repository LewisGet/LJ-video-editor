var ljInput = {
    blocks: 0,
    prefix: "id-",
    lastSelect: 0,
    select: 0
};

var ljDefaultStyleValue = {
    Size: "88px",
    Color: "#fff",
    StrokeColor: "#000",
    Float: "center",
    fullX: 1920,
    fullY: 1080,
    X: 1920 / 2,
    Y: 1080 - 130
};

ljInput.createBlocks = function () {
    var block = document.createElement("b");
    var id = ljInput.blocks;

    ljInput.selectBlock(id);
    block.id = ljInput.prefix + ljInput.blocks;

    window.project.appendChild(block);
    ljInput.blocks++;

    ljTime.createBlocks(id);
    ljDisplay.createBlocks(id);

    ljInput.setBlockStart(id, ljVideo.getTime());
    ljInput.setBlockEnd(id, ljVideo.getTime() + 2.5);
};

ljInput.selectBlock = function (id) {
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
};

ljInput.setBlockStyle = function (id, style, value) {
    var data = document.getElementById(ljInput.prefix + id);

    if (value !== undefined && ljDefaultStyleValue[style] != value)
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
    var returnValue = dom.getAttribute("data-" + style.toLowerCase());

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
    ljInput.setBlockContent(ljInput.select, window.inputContent.value);

    var styleModifies = ljInput.getAllInput();

    for (var i = 0; i < styleModifies.length; i++)
    {
        var key = styleModifies[i];

        if (key == "Content") { continue; }

        ljInput.setBlockStyle(ljInput.select, key.toLowerCase(), window['input' + key].value);
    }
};

ljInput.firstBigChr = function (s) {
    return s.toUpperCase().charAt(0) + s.substring(1);
};
