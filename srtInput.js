var ljSrtInput = {

};

ljSrtInput.isNumber = function (value) {
    return /^\d+$/.test(value);
};

ljSrtInput.isNullString = function (value) {
    return (value == "" || value == undefined);
};

ljSrtInput.isLineIndex = function (datas, key) {
    var thisLine = ljSrtInput.isNumber(datas[key]);
    var lastLine = ljSrtInput.isNullString(datas[key - 1]);

    if (thisLine && lastLine)
    {
        return true;
    }

    return false;
};

ljSrtInput.stringToSec = function (string) {
    var t = string.split(':');
    t[2] = parseFloat(t[2].replace(",", "."));

    t = (parseInt(t[0]) * 60 * 60) + (parseInt(t[1]) * 60) + t[2];

    // javascript float math bug
    t = t.toString().split(".");

    if (t[1])
    {
        if (t[1].length > 2)
        {
            t[1] = t[1][0].toString() + t[1][1].toString() + t[1][2].toString();
        }

        t = t[0].toString() + "." + t[1].toString();
        t = parseFloat(t);
    }
    else
    {
        t = parseInt(t[0]);
    }

    return t;
};

ljSrtInput.isNotSetTime = function (object) {
    return (object.s == 0 || object.e == 0);
};

ljSrtInput.isSetTime = function (object) {
    return (object.s != 0 || object.e != 0);
};

ljSrtInput.srtToObject = function (srt) {
    var lines = srt.split("\n");
    var object = {
        id: undefined,
        s: 0,
        e: 0,
        content: ""
    };

    var createObjects = [];

    for (var i = 0; i < lines.length; i++)
    {
        // 如果這比是 id
        if (ljSrtInput.isLineIndex(lines, i))
        {
            if (object.id !== undefined && ljSrtInput.isSetTime(object) && object.content !== "")
            {
                createObjects.push(object);

                object = {
                    id: undefined,
                    s: 0,
                    e: 0,
                    content: ""
                };
            }

            object.id = parseInt(lines[i]);

            continue;
        }

        // 如果有 id , 沒有時間
        if (object.id !== undefined && ljSrtInput.isNotSetTime(object))
        {
            var time = lines[i].split(" --> ");
            object.s = ljSrtInput.stringToSec(time[0]);
            object.e = ljSrtInput.stringToSec(time[1]);

            continue;
        }

        if (object.id !== undefined && ljSrtInput.isSetTime(object))
        {
            // 如果內容有上一行，加入換行
            if (object.content !== "")
            {
                object.content += "\n";
            }

            object.content += lines[i];

            continue;
        }
    }

    return createObjects;
};

ljSrtInput.createObjects = function (objects) {
    for (var i = 0; i < objects.length; i++)
    {
        var object = objects[i];

        ljInput.createBlocks();
        ljInput.setBlockContent(ljInput.select, object.content);
        ljInput.setBlockStart(ljInput.select, object.s);
        ljInput.setBlockEnd(ljInput.select, object.e);
        ljUi.toDefault(window.srtQuickCode.value);
    }
};

ljSrtInput.init = function (srt) {
    var objects = ljSrtInput.srtToObject(srt);

    ljSrtInput.createObjects(objects);
};
