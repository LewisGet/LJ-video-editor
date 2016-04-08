var ljInput = {
    blocks: 0,
    prefix: "id-",
    lastSelect: 0,
    select: 0
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

    if (value)
    {
        data.setAttribute(style, value);
    }
};

ljInput.getBlockContent = function (id) {
    var data = document.getElementById(ljInput.prefix + id);

    return data.innerText;
};

ljInput.getBlockStyle = function (id, style) {
    var data = document.getElementById(ljInput.prefix + id);

    return data.getAttribute(style);
};

ljInput.updateBlocks = function () {
    ljInput.setBlockContent(ljInput.select, window.inputContent.value);

    var styleModifies = ['color', 'left', 'right', 'top', 'bottom'];

    for (var i = 0; i < styleModifies.length; i++)
    {
        var key = styleModifies[i];

        ljInput.setBlockStyle(ljInput.select, key, window['input' + ljInput.firstBigChr(key)].value);
    }
};

ljInput.firstBigChr = function (s) {
    return s.toUpperCase().charAt(0) + s.substring(1);
};
