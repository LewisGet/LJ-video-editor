var ljBash = {
    select: []
};

ljBash.list = function (quickCodeModifies) {
    var startNumber = 1;

    ljBash.each(function(id) {
        ljUi.selectTimeBlockDefaultMod(id);

        ljUi.toDefault(quickCodeModifies(startNumber));
        ljUi.setEnd();

        startNumber++;
    });
};

ljBash.leftList = function () {
    ljBash.list(function(doNumber) {
        return "l" + doNumber.toString();
    });
};

ljBash.rightList = function () {
    ljBash.list(function(doNumber) {
        return "r" + doNumber.toString();
    });
};

ljBash.big = function () {
    ljBash.list(function(doNumber) {
        return "b" + doNumber.toString();
    });

    ljBash.loop(function(list, i) {
        if (i < 1)
        {
            return true;
        }

        lastBlockEndTime = ljInput.getBlockStart(list[i]);

        ljInput.setBlockStart(list[i - 1], lastBlockEndTime);
    });
};

ljBash.shackAllOn = function () {
    ljBash.each(function(id) {
        var amAttr = ljUi.getAmButtonConfig(window.amOneSecShack);

        ljInput.setBlockStyle(id, amAttr, 1);
    });
};

ljBash.shackAllOff = function () {
    ljBash.each(function(id) {
        var amAttr = ljUi.getAmButtonConfig(window.amOneSecShack);

        ljInput.setBlockStyle(id, amAttr, 0);
    });
};

ljBash.loop = function (excute) {
    // 用開始時間來排序
    ljBash.select.sort(function(a, b) {
        a = parseFloat(ljInput.getBlockStart(a));
        b = parseFloat(ljInput.getBlockStart(b));

        return a == b
            ? 0
            : (a > b ? 1 : -1);
    });

    for (var i = 0; i < ljBash.select.length; i++)
    {
        excute(ljBash.select, i);
    }
};

ljBash.each = function (excute) {
    ljBash.loop(function (list, i) {
        excute(list[i]);
    });
};

ljBash.clearSelect = function () {
    ljBash.each(function(id) {
        ljUi.selectTimeBlockBashOff(id);
    });

    ljBash.select = [];
};
