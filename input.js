var ljInput = {
    blocks: 0,
    prefix: "id-"
};

ljInput.createBlocks = function () {
    var block = document.createElement("b");

    var id = ljInput.blocks;
    block.id = ljInput.prefix + ljInput.blocks;

    window.project.appendChild(block);
    ljInput.blocks++;

    ljTime.createBlocks(id);
    ljDisplay.createBlocks(id);
};

ljInput.getBlock = function (id) {

};

ljInput.setBlockStart = function (id, value) {

};

ljInput.getBlockStart = function (id) {

};

ljInput.setBlockEnd = function (id, value) {

};

ljInput.getBlockEnd = function (id) {

};

