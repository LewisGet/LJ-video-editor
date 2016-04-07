var ljUi = {
    prefix: "ui-",
    topOffset: 0,
    leftOffset: 0
};

ljUi.openVideo = function () {
    ljVideo.open(window.openUrl.files[0]);
    ljUi.closeOpenPanel();

    ljVideo.afterVideoInit();
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
    window.displayBlocks.style.top = window.displayVideo.scrollTop.toString() + "px";
    ljUi.topOffset = window.displayVideo.scrollTop.toString();

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

ljUi.openModifyPanel = function () {
    window.inputSelect = ljInput.select;
    window.inputContent.value = ljInput.getBlockContent(ljInput.select);

    var styleModifies = ['color', 'left', 'right', 'top', 'bottom'];

    for (var i = 0; i < styleModifies.length; i++)
    {
        var key = styleModifies[i];

        window['input' + ljInput.firstBigChr(key)].value = ljInput.getBlockStyle(ljInput.select, key);
    }

    window.inputPanel.style.display = "";
};

ljUi.closeModifyPanel = function () {
    window.inputPanel.style.display = "none";
};

ljUi.updateBlocks = function () {
    ljInput.updateBlocks();

    ljUi.closeModifyPanel();
};

ljUi.createBlocks = function () {
    ljInput.createBlocks();

    ljUi.openModifyPanel();
};

ljUi.init = function () {
    ljUi.closeModifyPanel();
};