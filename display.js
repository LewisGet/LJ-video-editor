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
        var x = ljInput.getDomStyle(block, "X");
        var y = ljInput.getDomStyle(block, "Y");

        if (ljInput.getBlockStyle(id, "oneSecShack") == 1)
        {
            var xy = ljDisplay.oneSecShack(n, s, e, x, y);
            x = xy[0];
            y = xy[1];
        }

        var fontSize = ljInput.getDomStyle(block, "Size");
        var float = ljInput.getDomStyle(block, "Float");
        var color = ljInput.getDomStyle(block, "Color");
        var strokeColor = ljInput.getDomStyle(block, "StrokeColor");

        ctx.font = fontSize + " 微軟正黑體";
        ctx.textAlign = float;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 8;
        ctx.strokeText(text, x, y);
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }
};

ljDisplay.oneSecShack = function (n, s, e, x, y) {

    if (s < (n - 1))
    {
        // over 1 sec
        return [x, y];
    }

    var diff = 5;
    var t = parseFloat(n - s);

    if (t > 0.95) { return [x - diff, y - diff]; }
    if (t > 0.9) { return [x, y - diff]; }
    if (t > 0.85) { return [x + diff, y + diff]; }
    if (t > 0.8) { return [x, y + diff]; }
    if (t > 0.75) { return [x - diff, y - diff]; }
    if (t > 0.7) { return [x - diff, y]; }
    if (t > 0.65) { return [x + diff, y + diff]; }
    if (t > 0.6) { return [x + diff, y]; }
    if (t > 0.55) { return [x - diff, y - diff]; }
    if (t > 0.5) { return [x, y - diff]; }
    if (t > 0.45) { return [x - diff, y + diff]; }
    if (t > 0.4) { return [x, y + diff]; }
    if (t > 0.35) { return [x - diff, y + diff]; }
    if (t > 0.3) { return [x - diff, y]; }
    if (t > 0.25) { return [x - diff, y + diff]; }
    if (t > 0.2) { return [x + diff, y]; }
    if (t > 0.15) { return [x - diff, y + diff]; }
    if (t > 0.1) { return [x + diff, y + diff]; }
    if (t > 0.05) { return [x - diff, y - diff]; }
    if (t > 0) { return [x - diff, y + diff]; }

    return [x, y];
};

ljDisplay.seBig = function () {

};

ljDisplay.lastBlockEndToStart = function () {

};

ljDisplay.init = function () {

};

