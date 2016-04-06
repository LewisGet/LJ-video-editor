var ljDisplay = {
    prefix: "ds-"
};

ljDisplay.createBlocks = function (id) {
    var block = document.createElement("div");

    block.id = ljDisplay.prefix + id;

    window.displayBlocks.appendChild(block);
};

ljDisplay.flushTime = function (time) {

};

ljDisplay.init = function () {

};

