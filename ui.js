var ljUi = {
    prefix: "ui-",
    topOffset: 0,
    leftOffset: 0
};

var ljQuickCode = {
    l: {
        float: "left",
        x: 58,
        y: 58,
        s: 58,
        diff: 30,
        sizeDiff: 20
    }
};

ljUi.openVideo = function () {
    ljVideo.open(window.openUrl.files[0]);
    ljUi.closeOpenPanel();

    ljVideo.afterVideoInit();
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
    var h = window.innerHeight - window.controllerTime.offsetTop;

    if (h > 80)
    {
        window.controllerTime.style.height = h.toString() + "px";
    }
};

ljUi.openModifyPanel = function () {
    window.inputSelect = ljInput.select;
    window.inputContent.value = ljInput.getBlockContent(ljInput.select);

    var styleModifies = ljInput.getAllInput();

    for (var i = 0; i < styleModifies.length; i++)
    {
        var key = styleModifies[i];

        if (key == "Content") { continue; }

        window['input' + key].value = ljInput.getBlockStyle(ljInput.select, key);
    }

    window.inputPanel.style.display = "";
};

ljUi.setStart = function () {
    var s = ljVideo.getTime();
    var e = ljInput.getBlockEnd(ljInput.select);

    if (s < e)
    {
        ljInput.setBlockStart(ljInput.select, s);
    }
};

ljUi.setEnd = function () {
    var s = ljInput.getBlockStart(ljInput.select);
    var e = ljVideo.getTime();

    if (s < e)
    {
        ljInput.setBlockEnd(ljInput.select, e);
    }
};

ljUi.closeModifyPanel = function () {
    window.inputPanel.style.display = "none";
};

ljUi.quickModifySetup = function (quickCode) {

    if (quickCode[0] == "l")
    {
        window.inputX.value = ljQuickCode.l.x + (parseInt(quickCode[1]) * ljQuickCode.l.diff);
        window.inputY.value = (ljQuickCode.l.y + (parseInt(quickCode[1]) * ljQuickCode.l.diff)) * -1;
        window.inputFloat.value = ljQuickCode.l.float;
        window.inputSize.value = (ljQuickCode.l.s + (parseInt(quickCode[1]) * ljQuickCode.l.sizeDiff)).toString() + "px";
    }
};

ljUi.updateBlocks = function () {
    ljInput.updateBlocks();

    ljUi.closeModifyPanel();
};

ljUi.openSrtPanel = function () {
    window.srtPanel.style.display = "";
};

ljUi.closeSrtPanel = function () {
    window.srtPanel.style.display = "none";
};

ljUi.updateProject = function () {
    ljSrtInput.init(window.srtInput.value);

    ljUi.closeSrtPanel();
};

ljUi.createBlocks = function () {
    ljInput.createBlocks();

    ljUi.openModifyPanel();
};

ljUi.init = function () {
    ljUi.closeModifyPanel();
    ljUi.closeSrtPanel();
};