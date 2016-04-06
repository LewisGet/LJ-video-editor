var ljVideoEditor = {

};

ljVideoEditor.flushTime = function () {
    var time = 0;

    ljDisplay.flushTime(time);
    ljUi.flushTime(time);
};

ljVideoEditor.init = function () {
    ljDisplay.init();
    ljUi.init();
};
