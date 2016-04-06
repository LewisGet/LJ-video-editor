var ljInput = {
    blocks: 0,
    prefix: "id-",
    select: 0
};

ljInput.createBlocks = function () {
    var block = document.createElement("b");
    var id = ljInput.blocks;

    ljInput.select = id;
    block.id = ljInput.prefix + ljInput.blocks;

    window.project.appendChild(block);
    ljInput.blocks++;

    ljTime.createBlocks(id);
    ljDisplay.createBlocks(id);

    ljInput.setBlockStart(id, ljVideo.getTime());
    ljInput.setBlockEnd(id, ljVideo.getTime() + 2.5);
};

ljInput.getBlockId = function (id) {
    return parseInt((id.split("-"))[1]);
};

ljInput.setBlockStart = function (id, value) {
    var data = document.getElementById(ljInput.prefix + id);
    var display = document.getElementById(ljDisplay.prefix + id);
    var time = document.getElementById(ljTime.prefix + id);

    data.setAttribute("s", value);
    display.setAttribute("s", value);
    time.setAttribute("s", value);

    ljTime.afterSetBlockStart(time, value);
};

ljInput.getBlockStart = function (id) {
    var data = document.getElementById(ljInput.prefix + id);

    return data.getAttribute("s");
};

ljInput.setBlockEnd = function (id, value) {
    var data = document.getElementById(ljInput.prefix + id);
    var display = document.getElementById(ljDisplay.prefix + id);
    var time = document.getElementById(ljTime.prefix + id);

    data.setAttribute("e", value);
    display.setAttribute("e", value);
    time.setAttribute("e", value);

    ljTime.afterSetBlockEnd(time, value);
};

ljInput.getBlockEnd = function (id) {
    var data = document.getElementById(ljInput.prefix + id);

    return data.getAttribute("e");
};

ljInput.setBlockContent = function (id, value) {
    var data = document.getElementById(ljInput.prefix + id);
    var display = document.getElementById(ljDisplay.prefix + id);

    data.innerText = value;
    display.innerText = value;
};

ljInput.setBlockStyle = function (id, style, value) {
    var data = document.getElementById(ljInput.prefix + id);
    var display = document.getElementById(ljDisplay.prefix + id);

    data.style[style] = value;
    display.style[style] = value;
};

ljInput.getBlockContent = function (id) {
    var data = document.getElementById(ljInput.prefix + id);

    return data.innerText;
};

ljInput.getBlockStyle = function (id, style) {
    var data = document.getElementById(ljInput.prefix + id);

    return data.style[style];
};

ljInput.updateBlocks = function () {
    ljInput.setBlockContent(ljInput.select, window.inputContent.value);

    ljInput.setBlockStyle(ljInput.select, "color", window.inputColor.value)
};
