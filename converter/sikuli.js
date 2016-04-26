var ljSikuli = {
    layout: [
        // no 0 layout
        0,

        0,
        0,
        0,
        0,

        0,
        0,
        0,
        0
    ]
};

ljSikuli.secToTimeArray = function (time) {
    var t = time.toString().split(".");

    var min = parseInt(parseInt(t[0]) / 60);
    var sec = parseInt(t[0]) - (min * 60);

    var per = 0;

    if (t[1])
    {
        per = parseFloat("0." + (t[1].toString())[0]);
        per = per * 30;
    }

    min = ljSikuli.numberToTextTime(min);
    sec = ljSikuli.numberToTextTime(sec);
    per = ljSikuli.numberToTextTime(per);

    return "[\"" + min + "\",\"" + sec + "\",\"" + per + "\"]";
};

ljSikuli.numberToTextTime = function (val) {
    if (val.toString().length < 2)
    {
        if (val == 0)
        {
            return "00";
        }

        return "0" + val.toString();
    }

    return val.toString();
};

ljSikuli.getLayout = function (block) {

    var s = ljInput.getDomStart(block);
    var e = ljInput.getDomEnd(block);

    for (var layout = 1; layout < 9; layout++)
    {
        if (ljSikuli.layout[layout] < s)
        {
            ljSikuli.layout[layout] = parseFloat(e);

            return layout;
        }
    }

    return 1;
};

ljSikuli.getAllBlock = function () {
    return window.project.children;
};

ljSikuli.getFontSize = function (block) {
    var size = parseInt(ljInput.getDomStyle(block, "size"));

    return parseInt((size / 88) * 18);
};

ljSikuli.converter = function () {
    ljSikuli.preConverter();

    var blocks = ljSikuli.getAllBlock();

    for (var i = 0; i < blocks.length; i++)
    {
        var line = "create(";
        var block = blocks[i];
        var s = ljInput.getDomStart(block);
        var e = ljInput.getDomEnd(block);
        var color = ljInput.getDomStyle(block, "color");

        e = parseFloat(e) - parseFloat(s);

        s = ljSikuli.secToTimeArray(s);
        e = ljSikuli.secToTimeArray(e);

        if (color == "#0080ff") { color = "blue" } else { color = "main" }

        //create("中文", ["00", "00", "17"], ["00", "02", "15"], 1, "main", "16")

        line += "\"" + block.innerText + "\", ";
        line += s + ", ";
        line += e + ", ";
        line += ljSikuli.getLayout(block).toString() + ", ";
        line += "\"" + color + "\", ";
        line += "\"" + ljSikuli.getFontSize(block) + "\")\n";

        window.output.value += line;
    }

    ljSikuli.postConverter();
};

ljSikuli.preConverter = function () {
    window.project.innerHTML = window.input.value;
    window.output.value = "";

    var list = window.project;
    var items = list.childNodes;
    var itemsArr = [];
    for (var i in items) {
        if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsArr.push(items[i]);
        }
    }

    itemsArr.sort(function(a, b) {
        a = parseFloat(ljInput.getDomStart(a));
        b = parseFloat(ljInput.getDomStart(b));

        return a == b
            ? 0
            : (a > b ? 1 : -1);
    });

    for (i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
    }
};

ljSikuli.postConverter = function () {
    window.project.innerHTML = "";
};
