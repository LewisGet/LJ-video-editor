var ljVideo = {

};

ljVideo.open = function (file) {
    var url = URL.createObjectURL(file);

    window.displayVideoUrl.src = url;
    window.displayVideo.load();
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

