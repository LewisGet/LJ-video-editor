var ljVideo = {

};

ljVideo.open = function (file) {
    var url = URL.createObjectURL(file);

    window.displayVideoUrl.src = url;
    window.displayVideo.load();

    // for android
    window.displayVideo.play();

    ljUi.quickKeyOn();
};

ljVideo.soundLoad = function (url) {
    var wavesurfer = WaveSurfer.create({
        container: '#soundBar',
        waveColor: 'violet',
        progressColor: 'purple'
    });

    wavesurfer.load(url);
};

ljVideo.stop = function () {
    window.displayVideo.pause();
};

ljVideo.play = function () {
    window.displayVideo.play();
};

ljVideo.isPlaying = function () {
    return ! (window.displayVideo.paused);
};

ljVideo.getTotalTime = function () {
    return window.displayVideo.duration;
};

ljVideo.setTime = function (time) {
    window.displayVideo.currentTime = time;

    ljVideoEditor.flushTime();
};

ljVideo.jumpTime = function (value) {
    var time = ljVideo.getTime() + value;

    ljVideo.setTime(time);
};

ljVideo.getTime = function () {
    return window.displayVideo.currentTime;
};

ljVideo.isRead = function () {
    return (window.displayVideo.readyState == 4) && (ljVideo.getTotalTime() != 0)
};

ljVideo.afterVideoInit = function () {
    if (! ljVideo.isRead())
    {
        setTimeout("ljVideo.afterVideoInit()", 100);

        return false;
    }

    ljUi.initOnTimeUpdateEvent();
    ljUi.displaySize();
    ljUi.controllerTimeSize();
    ljTime.init();

    return true;
};
