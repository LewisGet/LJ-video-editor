var ljTime = {
    prefix: "t-",
};

ljTime.createBlocks = function (id) {
    var block = document.createElement("div");

    block.id = ljTime.prefix + id;
    block.style.background = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

    window.controllerTime.appendChild(block);
};

ljTime.videoTimeBlock = function () {
    window.controllerTimeTotal.style.width = (window.innerWidth + parseInt(ljVideo.getTotalTime() * 100)).toString() + "px";
};

ljTime.init = function () {
    ljTime.videoTimeBlock();
};