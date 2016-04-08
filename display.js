var ljDisplay = {
    prefix: "ds-"
};

ljDisplay.createBlocks = function (id) {
    return true;
};

ljDisplay.flushTime = function (time) {
    var ctx = window.displayBlocks.getContext('2d');
    ctx.clearRect(0, 0, window.displayBlocks.width, window.displayBlocks.height);

    var blocks = window.project.getElementsByTagName("b");

    for (var i = 0; i < blocks.length; i++)
    {
        var block = blocks[i];

        ljDisplay.textDisplay(block);
    }
};

ljDisplay.textDisplay = function (block) {
    var id = ljInput.getBlockId(block.id);
    var s = ljInput.getBlockStart(id);
    var e = ljInput.getBlockEnd(id);
    var n = ljVideo.getTime();
    var ctx = window.displayBlocks.getContext('2d');
    var text = block.innerText;

    // 如果現在還沒超過結束時間，而且現在播放時間超過起始時間
    if (n < e && n > s)
    {
        ctx.font = "28px 微軟正黑體";
        ctx.textAlign="center";
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 8;
        ctx.strokeText(text, 1920 / 2, 1080 - 18 - 30);
        ctx.fillStyle = 'white';
        ctx.fillText(text, 1920 / 2, 1080 - 18 - 30);
    }
};

ljDisplay.init = function () {

};

