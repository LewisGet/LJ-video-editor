var ljUi = {
    prefix: "ui-"
};

ljUi.openVideo = function () {
    ljVideo.open(window.openUrl.files[0]);
    ljUi.closeOpenPanel();

    ljTime.init();
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

ljUi.init = function () {

};