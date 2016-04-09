var ljTime = {
    prefix: "t-",
};

ljTime.createBlocks = function (id) {
    var block = document.createElement("div");

    block.id = ljTime.prefix + id;
    block.style.background = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    block.onclick = function () {
        ljInput.selectBlock(ljInput.getBlockId(this.id));
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