var ljDisplay = {
    prefix: "ds-"
};

ljDisplay.createBlocks = function (id) {
    var block = document.createElement("div");

    block.id = ljDisplay.prefix + id;
    block.className = "blocks";

    window.displayBlocks.appendChild(block);
};

ljDisplay.flushTime = function (time) {
    var blocks = window.displayBlocks.getElementsByClassName("blocks");

    for (var i = 0; i < blocks.length; i++)
    {
        ljDisplay.textDisplay(blocks[i]);
    }
};

ljDisplay.textDisplay = function (blocks) {
    blocks.style.display = "none";

    var id = ljInput.getBlockId(blocks.id);
    var s = ljInput.getBlockStart(id);
    var e = ljInput.getBlockEnd(id);
    var n = ljVideo.getTime();

    // 如果現在還沒超過結束時間，而且現在播放時間超過起始時間
    if (n < e && n > s)
    {
        blocks.style.display = "";
    }
};

ljDisplay.init = function () {

};

