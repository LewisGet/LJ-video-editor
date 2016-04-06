var ljVideoEditor = {

};

ljVideoEditor.flushTime = function () {
    var time = ljVideo.getTime();

    ljDisplay.flushTime(time);
    ljUi.flushTime(time);
};

ljVideoEditor.init = function () {
    ljDisplay.init();
    ljUi.init();
};
