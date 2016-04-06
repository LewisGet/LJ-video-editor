var ljTime = {
    prefix: "t-",
};

ljTime.createTimeBlock = function () {
};

ljTime.videoTimeBlock = function () {
    window.controllerTimeTotal.style.width = (window.innerWidth + parseInt(ljVideo.getTotalTime() * 100)).toString() + "px";
};

ljTime.init = function () {
    if (! ljVideo.isRead())
    {
        setTimeout("ljTime.init()", 100);

        return false;
    }

    ljTime.videoTimeBlock();

    return true;
};