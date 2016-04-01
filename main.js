var ljVideoEditor = {
    mod: "full",
    blockId: 0
};

ljVideoEditor.text = {
    select: undefined,
    displayId: "tid-",
};

ljVideoEditor.text.getTextDom = function (id) {
    return document.getElementById(ljVideoEditor.text.displayId + id.toString());
};

ljVideoEditor.text.getIntId = function (text) {
    return parseInt((text.split("-"))[1]);
};

ljVideoEditor.text.getStartTime = function (id) {
    return ljVideoEditor.text.getTextDom(id).getAttribute("data-start");
};

ljVideoEditor.text.getEndTime = function (id) {
    return ljVideoEditor.text.getTextDom(id).getAttribute("data-end");
};

ljVideoEditor.text.setStartTime = function (id, val) {
    return ljVideoEditor.text.getTextDom(id).setAttribute("data-start", val);
};

ljVideoEditor.text.setEndTime = function (id, val) {
    return ljVideoEditor.text.getTextDom(id).setAttribute("data-end", val);
};

ljVideoEditor.getMod = function () {
    var mod = decodeURIComponent(location.search.replace("?", ""));

    if (mod)
    {
        ljVideoEditor.mod = mod;
    }

    if (! ljVideoEditor.isFullMod())
    {
        var advanceds = document.getElementsByClassName("advanced");

        for (var i = 0; i < advanceds.length; i++)
        {
            advanceds[i].style.display = "none";
        }
    }
};

ljVideoEditor.isFullMod = function () {
    return ljVideoEditor.mod == "full";
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

    ljVideoEditor.setVideoDisplaySize();
};

ljVideoEditor.setVideoDisplaySize = function () {
    window.videoDisplay.width = window.innerWidth;

    // set video max height
    if (ljVideoEditor.isFullMod())
    {
        window.videoDisplay.height = window.innerHeight - 100;
    }
    else
    {
        window.videoDisplay.height = window.innerHeight / 3;
    }
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

    var tid = ljVideoEditor.text.getIntId(text.id);
    var startTime = ljVideoEditor.text.getStartTime(tid);
    var endTime = ljVideoEditor.text.getEndTime(tid);

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

    var id = (ljVideoEditor.blockId).toString();
    text.id = ljVideoEditor.text.displayId + id;
    text.className = "text";

    // 先登記才能使用 get set function
    window.texts.appendChild(text);
    ljVideoEditor.blockId++;

    ljVideoEditor.text.setStartTime(id, ljVideoEditor.getNowTime());
    ljVideoEditor.text.setEndTime(id, ljVideoEditor.getNowTime() + 2.0);
    text.setAttribute("contenteditable", "plaintext-only");

    text = ljVideoEditor.textTimeCrecker(text);
    text.focus();
};

ljVideoEditor.textTimeCrecker = function (text) {

    var texts = window.texts.getElementsByClassName("text");

    for (var i = 0; i < texts.length; i++)
    {
        var checkText = texts[i];
        var tid = ljVideoEditor.text.getIntId(text.id);
        var cid = ljVideoEditor.text.getIntId(checkText.id);
        var checkStart = ljVideoEditor.text.getStartTime(cid);
        var checkEnd = ljVideoEditor.text.getEndTime(cid);
        var textStart = ljVideoEditor.text.getStartTime(tid);
        var textEnd = ljVideoEditor.text.getEndTime(tid);

        // 自比不需要比對自己。
        if (cid == tid)
        {
            continue;
        }

        if (
            // 如果發現字幕開始時間 在 要新增字幕的結束範圍內
            checkStart < textEnd
                &&
            // 而且比對字幕要在 這份字幕後
            checkStart > textStart
           )
        {
            // 將結束時間給予他開始的時間
            ljVideoEditor.text.setEndTime(tid, checkStart);
        }

        if (
            // 如果這組字幕 結束時間 比現在要新增的字幕要多時
            checkEnd > textStart
                &&
            // 而且比對字幕必須是 在這份字幕之前
            checkStart < textStart
           )
        {
            ljVideoEditor.text.setEndTime(cid, textStart);
        }
    }

    return text;
};

ljVideoEditor.copyLast = function () {
    var last = document.querySelector(".text:last-child");
    var text = "";

    if (last)
    {
        text = document.querySelector(".text:last-child").innerHTML;
    }

    ljVideoEditor.createNewText(text);
};

ljVideoEditor.init = function () {
    ljVideoEditor.getMod();
};

