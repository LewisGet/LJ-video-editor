var ljTime = {
    prefix: "t-",
};

var ljColor = [
    "#d609d3",
    "#d609d3",
    "#770dee",
    "#7ee764",
    "#de920c",
    "#b9f4fe",
    "#b52b62",
    "#99b1a7",
    "#a4bc2e",
    "#a4bc2e"
];

ljTime.getBlock = function (id) {
    return document.getElementById(ljTime.prefix + id.toString());
};

ljTime.createBlocks = function (id) {
    var block = document.createElement("div");

    block.id = ljTime.prefix + id;
    block.style.background = ljColor[parseInt(Math.random() * 10)];

    block.onclick = function () {
        var id = ljInput.getBlockId(this.id);

        ljUi.selectTimeBlock(id, ljInput.select, ljInput.lastSelect);
    };

    window.controllerTime.appendChild(block);
};

ljTime.afterSetBlockStart = function (dom, value) {
    dom.style.left = (value * 100).toString() + "px";

    ljTime.afterSetBlockEnd(dom, ljInput.getDomEnd(dom));
};

ljTime.afterSetBlockEnd = function (dom, value) {
    dom.style.width = ((value * 100) - parseInt(dom.style.left.replace("px"))).toString() + "px";
};

ljTime.videoTimeBlock = function () {
    window.controllerTimeTotal.style.width = (window.innerWidth + parseInt(ljVideo.getTotalTime() * 100)).toString() + "px";
    window.controllerTimeTotalBar.style.width = (ljVideo.getTotalTime() * 100).toString() + "px";
};

ljTime.init = function () {
    ljTime.videoTimeBlock();
};