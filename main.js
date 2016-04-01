var ljVideoEditor = {

};

ljVideoEditor.getNowTime = function () {
    return window.videoDisplay.currentTime;
};

ljVideoEditor.setNowTime = function (val) {
    return window.videoDisplay.currentTime += val;
};

ljVideoEditor.isPlaying = function () {
    return ! (window.videoDisplay.paused);
};

ljVideoEditor.play = function () {
    window.videoDisplay.play();
};

ljVideoEditor.stop = function () {
    window.videoDisplay.pause();
};

ljVideoEditor.openVideo = function () {
    var localUrl = URL.createObjectURL(window.openUrl.files[0]);

    document.title = localUrl;

    window.videoUrl.src = localUrl;
    window.videoDisplay.load();
    window.videoDisplay.play();

    // close open panel
    window.openPanel.style.display = "none";

    // open main panel
    window.mainPanel.style.display = "";


    // set video max height
    videoDisplay.height = window.innerHeight / 2;
};

ljVideoEditor.updateTimeController = function () {
    // console time
    window.timeStatus.innerHTML = ljVideoEditor.getNowTime();

    var texts = window.texts.getElementsByClassName("text");

    for (var i = 0; i < texts.length; i++)
    {
        ljVideoEditor.textDisplay(texts[i]);
    }
};

ljVideoEditor.textDisplay = function (text) {
    text.style.display = "none";

    var startTime = text.getAttribute("data-start");
    var endTime = text.getAttribute("data-end");

    // 如果現在還沒超過結束時間，而且現在播放時間超過起始時間
    if (ljVideoEditor.getNowTime() < endTime && ljVideoEditor.getNowTime() > startTime)
    {
        text.style.display = "";
    }
};

ljVideoEditor.back = function (val) {
    ljVideoEditor.stop();
    ljVideoEditor.setNowTime(val * -1);
};

ljVideoEditor.jump = function (val) {
    ljVideoEditor.stop();
    ljVideoEditor.setNowTime(val);
};

ljVideoEditor.videoClick = function () {
    if (ljVideoEditor.isPlaying())
    {
        ljVideoEditor.stop();
    }
    else
    {
        ljVideoEditor.play();
    }
};

ljVideoEditor.createNewText = function (defaultText)
{
    var text = document.createElement("div");

    if (defaultText)
    {
        text.innerHTML = defaultText;
    }

    text.setAttribute("data-start", ljVideoEditor.getNowTime());
    text.setAttribute("data-end", ljVideoEditor.getNowTime() + 2.0);
    text.setAttribute("contenteditable", "plaintext-only");

    text = ljVideoEditor.textTimeCrecker(text);

    text.className = "text";

    window.texts.appendChild(text);
};

ljVideoEditor.textTimeCrecker = function (text) {

    var texts = window.texts.getElementsByClassName("text");

    for (var i = 0; i < texts.length; i++)
    {
        var checkText = texts[i];
        var checkStart = checkText.getAttribute("data-start");
        var checkEnd = checkText.getAttribute("data-end");

        if (
            // 如果發現字幕開始時間 在 要新增字幕的結束範圍內
            checkStart < text.getAttribute("data-end")
                &&
            // 而且比對字幕要在 這份字幕後
            checkStart > text.getAttribute("data-start")
           )
        {
            // 將結束時間給予他開始的時間
            text.setAttribute("data-end", checkStart);
        }

        if (
            // 如果這組字幕 結束時間 比現在要新增的字幕要多時
            checkEnd > text.getAttribute("data-start")
                &&
            // 而且比對字幕必須是 在這份字幕之前
            checkStart < text.getAttribute("data-start")
           )
        {
            checkText.setAttribute("data-end", text.getAttribute("data-start"));
        }
    }

    return text;
};
