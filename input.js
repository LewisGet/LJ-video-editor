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
    X: 1920 / 2,
    Y: 1080 - 58 - 58
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

ljInput.setBlockStart = function (id, value) {
    var data = document.getElementById(ljInput.prefix + id);
    var time = document.getElementById(ljTime.prefix + id);

    data.setAttribute("s", value);
    time.setAttribute("s", value);

    ljTime.afterSetBlockStart(time, value);
};

ljInput.getBlockStart = function (id) {
    var data = document.getElementById(ljInput.prefix + id);

    return data.getAttribute("s");
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

    return data.getAttribute("e");
};

ljInput.setBlockContent = function (id, value) {
    var data = document.getElementById(ljInput.prefix + id);

    data.innerText = value;
};

ljInput.setBlockStyle = function (id, style, value) {
    var data = document.getElementById(ljInput.prefix + id);

    if (value && (! ljDefaultStyleValue[style] == value))
    {
        data.setAttribute(style, value);
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
    var returnValue = dom.getAttribute(style);

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
    var names = [];

    for (var i = 0; i < inputs.length; i++)
    {
        names.push(inputs[i].id.replace("input", ""));
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

        ljInput.setBlockStyle(ljInput.select, key, window['input' + key].value);
    }
};

ljInput.firstBigChr = function (s) {
    return s.toUpperCase().charAt(0) + s.substring(1);
};
