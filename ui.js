var ljUi = {
    prefix: "ui-",
    topOffset: 0,
    leftOffset: 0,
    quickKey: false
};

var ljQuickCode = {
    l: {
        float: "left",
        x: 58,
        y: 58,
        s: 58,
        c: "#ff8040",
        diff: 30,
        sizeDiff: 20
    },
    r: {
        float: "right",
        x: 58,
        y: 58,
        s: 58,
        c: "#0080ff",
        diff: 30,
        sizeDiff: 20
    },
    m: {
        float: "center",
        x: 1920 / 2,
        y: 30,
        size: 88,
        diff: 100
    },
    // 放大
    b: {
        s: 88,
        sizeDiff: 10
    },

    // 縮小
    i: {
        s: 88,
        sizeDiff: -10
    },

    // 依照情況放大縮小
    sb: {},
    si: {}
};

ljUi.canQuickKey = function () {
    return ljUi.quickKey;
};

ljUi.quickKeyOn = function () {
    ljUi.quickKey = true;
};

ljUi.quickKeyOff = function () {
    ljUi.quickKey = false;
};

ljUi.quickKeyExcute = function (e) {
    if (! ljUi.canQuickKey())
    {
        if ("Escape" == e.code)
        {
            ljUi.closeModifyPanel();
        }

        if ("Enter" == e.code && ljUi.isModifyPanelOpen())
        {
            ljUi.updateBlocks();
        }

        return true;
    }

    if ("KeyB" == e.code)
    {
        ljUi.videoClick();
    }

    if ("KeyN" == e.code)
    {
        ljUi.createBlocks();
    }

    if ("KeyM" == e.code)
    {
        ljUi.openModifyPanel();
    }

    if ("KeyE" == e.code)
    {
        ljUi.setEnd();
    }

    if ("KeyH" == e.code)
    {
        ljUi.soundPanelDown();
    }

    if ("KeyJ" == e.code)
    {
        ljUi.soundPanelUp();
    }

    if ("KeyS" == e.code)
    {
        ljUi.downloadLastSave();
    }

    if ("KeyL" == e.code)
    {
        ljUi.toDefault('m21');
    }

    if ("KeyK" == e.code)
    {
        ljUi.toDefault('m12');
    }

    return true;
};

ljUi.openVideo = function () {
    ljVideo.open(window.openUrl.files[0]);
    ljUi.closeOpenPanel();

    ljVideo.afterVideoInit();
};

ljUi.selectTimeBlock  = function (selectId) {
    if (ljUi.bashPanelStatus())
    {
        ljUi.selectTimeBlockBashMod(selectId);
    }
    else
    {
        ljUi.selectTimeBlockDefaultMod(selectId);
    }
};

ljUi.selectTimeBlockBashOn = function (selectId) {
    var timeBar = document.getElementById(ljTime.prefix + selectId.toString());

    if (null !== timeBar) timeBar.style.opacity = "0.3";
};

ljUi.selectTimeBlockBashOff = function (selectId) {
    var timeBar = document.getElementById(ljTime.prefix + selectId.toString());

    if (null !== timeBar) timeBar.style.opacity = "";
};

ljUi.selectTimeBlockBashMod = function (selectId) {
    if (ljBash.select.includes(selectId))
    {
        return true;
    }

    ljBash.select.push(selectId);

    ljUi.selectTimeBlockBashOn(selectId);

    window.bashPanel.title = ljBash.select.toString();

    return true;
};

ljUi.selectTimeBlockDefaultMod = function (selectId) {
    var select = document.getElementById(ljTime.prefix + selectId.toString());
    var last   = document.getElementById(ljTime.prefix + ljInput.select.toString());
    var cancel = document.getElementById(ljTime.prefix + ljInput.lastSelect.toString());

    if (null !== cancel) cancel.style.border = "";
    if (null !== last)   last.style.border   = "3px dashed #000";
    if (null !== select) select.style.border = "3px solid #000";

    ljInput.selectBlock(selectId);
};

ljUi.selectLastBlock = function () {
    var dom = document.getElementById(ljTime.prefix + ljInput.lastSelect.toString());

    dom.click();
};

ljUi.initOnTimeUpdateEvent = function () {
    setInterval("ljVideoEditor.onTimeUpdate()", 1000 / ljVideoEditor.fps);
};

ljUi.closeOpenPanel = function () {
    window.openPanel.style.display = "none";
};

ljUi.scrolledTime = function () {
    var time = parseFloat(window.controllerTime.scrollLeft / 100);

    if (! ljVideo.isPlaying())
    {
        ljVideo.setTime(time);
    }
};

ljUi.flushTime = function (time) {
    // time display block
    window.timeDisplayPanel.innerText = time;

    // time bar
    window.controllerTime.scrollLeft = parseInt(time * 100);
};

ljUi.videoClick = function () {
    if (ljVideo.isPlaying())
    {
        ljVideo.stop();
    }
    else
    {
        ljVideo.play();
    }
};

ljUi.displaySize = function () {
    window.displayVideo.width = window.innerWidth;
    window.displayVideo.height = window.innerHeight / 2;
    window.displayBlocks.style.width = window.displayVideo.width.toString() + "px";
    window.displayBlocks.style.height = window.displayVideo.height.toString() + "px";
    window.displayBlocks.style.top = window.displayVideo.offsetTop.toString() + "px";
    ljUi.topOffset = window.displayVideo.offsetTop.toString();

    var zoomW = window.displayVideo.width / window.displayVideo.videoWidth;
    var zoomH = window.displayVideo.height / window.displayVideo.videoHeight;

    var doSize = function () {
        var nowSize = window.displayVideo.videoHeight * zoomW;

        window.displayVideo.height = nowSize;
        window.displayBlocks.style.height = nowSize.toString() + "px";
    };

    if (zoomW > zoomH)
    {
        doSize = function () {
            var nowSize = window.displayVideo.videoWidth * zoomH;

            ljUi.leftOffset = parseFloat((window.displayVideo.width - nowSize) / 2);

            window.displayBlocks.style.left = ljUi.leftOffset.toString() + "px";
            window.displayBlocks.style.width = nowSize.toString() + "px";
        };
    }

    doSize();
};

ljUi.controllerTimeSize = function () {
    var timePanelStart = window.controllerTime.offsetTop;
    var startTimeBar = document.getElementById("controllerTimeStartBar");
    var h = window.innerHeight - timePanelStart;

    startTimeBar.style.top = timePanelStart.toString() + "px";

    if (h > 80)
    {
        window.controllerTime.style.height = h.toString() + "px";
    }
};

ljUi.openModifyPanel = function () {
    ljUi.quickKeyOff();

    window.inputSelect = ljInput.select;
    window.inputContent.value = ljInput.getBlockContent(ljInput.select);

    var buttons = window.inputPanel.getElementsByClassName("amButton");

    for (var i = 0; i < buttons.length; i++)
    {
        ljUi.amButtonDisplay(buttons[i]);
    }

    var styleModifies = ljInput.getAllInput();

    for (var i = 0; i < styleModifies.length; i++)
    {
        var key = styleModifies[i];

        if (key == "Content") { continue; }

        var value = ljInput.getBlockStyle(ljInput.select, key);

        if (value == undefined)
        {
            value = "";
        }

        window['input' + key].value = value;
    }

    window.inputPanel.style.display = "";
};

ljUi.getLastContent = function () {
    window.inputContent.value = ljInput.getBlockContent(ljInput.lastSelect);
};

ljUi.setStart = function (s) {
    if (s == undefined)
    {
        s = ljVideo.getTime();
    }

    var e = ljInput.getBlockEnd(ljInput.select);

    if (s < e)
    {
        ljInput.setBlockStart(ljInput.select, s);
    }
};

ljUi.setEnd = function (e) {
    if (e == undefined)
    {
        e = ljVideo.getTime();
    }

    var s = ljInput.getBlockStart(ljInput.select);

    if (s < e)
    {
        ljInput.setBlockEnd(ljInput.select, e);
    }
};

ljUi.setSameWithLastStart = function () {
    var s = ljInput.getBlockStart(ljInput.lastSelect);

    ljUi.setStart(s);
};

ljUi.setSameWithLastEnd = function () {
    var e = ljInput.getBlockEnd(ljInput.lastSelect);

    ljUi.setEnd(e);
};

ljUi.getAmButtonConfig = function (dom) {
    return dom.getAttribute("data-am");
};

ljUi.amButtonDisplay = function (dom) {
    var status = ljInput.getBlockStyle(ljInput.select, ljUi.getAmButtonConfig(dom));

    if (parseInt(status) == 1)
    {
        dom.style.color = "#fff";
        dom.style.background = "#337ab7";
    }
    else
    {
        dom.style.color = "#000";
        dom.style.background = "";
    }
};

ljUi.amButtonClick = function (button) {
    var config = ljUi.getAmButtonConfig(button);

    if (1 == parseInt(ljInput.getBlockStyle(ljInput.select,config)))
    {
        ljInput.setBlockStyle(ljInput.select, config, 0);
    }
    else
    {
        ljInput.setBlockStyle(ljInput.select, config, 1);
    }

    ljUi.amButtonDisplay(button);
};

ljUi.moveTo = function (time) {
    time = parseFloat(time);

    var block = ljInput.getBlock(ljInput.select);

    var s = ljInput.getDomStart(block);
    var e = ljInput.getDomEnd(block);

    var total = parseFloat(e) - parseFloat(s);

    ljInput.setBlockStart(ljInput.select, time);
    ljInput.setBlockEnd(ljInput.select, time + total);
};

ljUi.moveToNow = function () {
    ljUi.moveTo(ljVideo.getTime());
};

ljUi.moveToLastEnd = function () {
    ljUi.moveTo(ljInput.getBlockEnd(ljInput.lastSelect));
};

ljUi.removeBlock = function () {
    var id = ljInput.select;

    ljInput.removeBlock(id);

    ljUi.selectTimeBlockDefaultMod(ljInput.lastSelect);
};

ljUi.nowTimeToMissInput = function () {
    var pex = "";

    if (window.inputMissWord.value)
    {
        pex = ",";
    }

    window.inputMissWord.value += pex + (ljVideo.getTime() - ljInput.getBlockStart(ljInput.select)).toString() + ":";
};

ljUi.isModifyPanelOpen = function () {
    if ("none" == window.inputPanel.style.display)
    {
        return false;
    }

    return true;
};

ljUi.closeModifyPanel = function () {
    window.inputPanel.style.display = "none";

    ljUi.quickKeyOn();
};

ljUi.quickModifySetup = function (quickCode) {
    quickCode = quickCode.toLowerCase();

    if (quickCode[0] == "l")
    {
        window.inputX.value = ljQuickCode.l.x + (parseInt(quickCode[1]) * ljQuickCode.l.diff);
        window.inputY.value = (ljQuickCode.l.y + (parseInt(quickCode[1]) * ljQuickCode.l.diff)) * -1;
        window.inputColor.value = ljQuickCode.l.c;
        window.inputFloat.value = ljQuickCode.l.float;
        window.inputSize.value = (ljQuickCode.l.s + (parseInt(quickCode[1]) * ljQuickCode.l.sizeDiff)).toString() + "px";
    }

    if (quickCode[0] == "r")
    {
        window.inputX.value = (ljQuickCode.r.x + (parseInt(quickCode[1]) * ljQuickCode.r.diff)) * -1;
        window.inputY.value = (ljQuickCode.r.y + (parseInt(quickCode[1]) * ljQuickCode.r.diff)) * -1;
        window.inputColor.value = ljQuickCode.r.c;
        window.inputFloat.value = ljQuickCode.r.float;
        window.inputSize.value = (ljQuickCode.r.s + (parseInt(quickCode[1]) * ljQuickCode.r.sizeDiff)).toString() + "px";
    }

    if (quickCode[0] == "m")
    {
        window.inputX.value = ljQuickCode.m.x;
        window.inputY.value = (ljQuickCode.m.y + (parseInt(quickCode[1]) * ljQuickCode.m.diff)) * -1;
        window.inputFloat.value = ljQuickCode.m.float;
        window.inputSize.value = ljQuickCode.m.size.toString() + "px";

        if (quickCode[2])
        {
            var color = parseInt(quickCode[2]);

            if (color == 1)
            {
                window.inputColor.value = ljQuickCode.l.c;
            }
            else if (color == 2)
            {
                window.inputColor.value = ljQuickCode.r.c;
            }
        }
    }

    if (quickCode[0] == "b")
    {
        window.inputSize.value = (ljQuickCode.b.s + (parseInt(quickCode[1]) * ljQuickCode.b.sizeDiff)).toString() + "px";
    }

    if (quickCode[0] == "i")
    {
        window.inputSize.value = (ljQuickCode.i.s + (parseInt(quickCode[1]) * ljQuickCode.i.sizeDiff)).toString() + "px";
    }

    if (quickCode[0] == "s")
    {
        if (quickCode[1] == "b")
        {
            window.inputSize.value = (parseInt(window.inputSize.value) + ljQuickCode.b.sizeDiff).toString() + "px";
        }
        else if (quickCode[1] == "i")
        {
            window.inputSize.value = (parseInt(window.inputSize.value) + ljQuickCode.i.sizeDiff).toString() + "px";
        }
    }
};

ljUi.updateBlocks = function () {
    ljInput.updateBlocks();

    ljUi.closeModifyPanel();

    ljSave.save();
};

ljUi.getLastSave = function () {
    window.loader.value = ljSave.getLastSave();
};

ljUi.downloadLastSave = function () {
    ljSave.save();

    ljSave.downloadLastSave();
};

ljUi.openSrtPanel = function () {
    window.srtPanel.style.display = "";

    ljUi.quickKeyOff();
};

ljUi.closeSrtPanel = function () {
    window.srtPanel.style.display = "none";

    ljUi.quickKeyOn();
};

ljUi.updateProject = function () {
    ljSrtInput.init(window.srtInput.value);

    ljUi.closeSrtPanel();
};

ljUi.createBlocks = function () {
    ljInput.createBlocks();

    ljUi.openModifyPanel();
};

ljUi.openSound = function () {
    ljSound.openSound(window.soundPanelFile.files[0]);

    ljUi.closeSoundPanel();
};

ljUi.openSoundPanel = function () {
    window.soundPanel.style.display = "";
};

ljUi.soundPanelDown = function () {
    window.soundBar.style.top = (parseInt(window.soundBar.style.top) + 50).toString() + "px";
};

ljUi.soundPanelUp = function () {
    if (parseInt(window.soundBar.style.top) != 0)
    {
        window.soundBar.style.top = (parseInt(window.soundBar.style.top) - 50).toString() + "px";
    }
};

ljUi.closeSoundPanel = function () {
    window.soundPanel.style.display = "none";
};

ljUi.displayToCam = function () {
    for (var i = 0; i < document.body.children.length; i++)
    {
        document.body.children[i].style.display = "none";
    }

    document.body.style.background = "#00FF00";

    document.body.appendChild(window.displayBlocks);

    window.displayBlocks.style = {};

    ljVideo.setTime(0);
};

ljUi.toDefault = function (quickCode) {
    ljUi.openModifyPanel();
    ljUi.quickModifySetup(quickCode);

    ljUi.updateBlocks();
};

ljUi.soundClick = function (e) {
    window.controllerTime.scrollLeft = e.offsetX;
};

ljUi.bashPanelStatus = function () {
    return ("on" == window.bashPanel.getAttribute("data-bash"));
};

ljUi.bashPanelOn = function () {
    window.bashPanel.setAttribute("data-bash", "on");

    window.bashOn.style.display = "";
    window.bashOff.style.display = "none";
};

ljUi.bashPanelOff = function () {
    window.bashPanel.setAttribute("data-bash", "off");

    ljBash.clearSelect();

    window.bashOn.style.display = "none";
    window.bashOff.style.display = "";
};

ljUi.init = function () {
    ljUi.closeModifyPanel();
    ljUi.closeSoundPanel();
    ljUi.closeSrtPanel();
};