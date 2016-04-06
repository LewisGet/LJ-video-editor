var ljUi = {
    prefix: "ui-"
};

ljUi.openVideo = function () {
    ljVideo.open(window.openUrl.files[0]);
    ljUi.closeOpenPanel();
};

ljUi.closeOpenPanel = function () {
    window.openPanel.style.display = "none";
};

ljUi.flushTime = function (time) {

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