var ljVideoEditor = {
    fps: 30
};

ljVideoEditor.flushTime = function () {
    var time = ljVideo.getTime();

    ljDisplay.flushTime(time);
    ljUi.flushTime(time);
};

ljVideoEditor.onTimeUpdate = function () {
    if (ljVideo.isPlaying())
    {
        ljVideoEditor.flushTime();
    }
};

ljVideoEditor.init = function () {
    ljDisplay.init();
    ljUi.init();
};
