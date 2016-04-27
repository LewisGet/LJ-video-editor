var ljLoad = {

};

ljLoad.load = function () {
    var tmp = ljLoad.preLoad();

    var datas = tmp.getElementsByTagName("b");

    var styles = ljInput.getAllInput();
    styles.push("oneSecShack");

    for (var i = 0; i < datas.length; i++)
    {
        ljInput.createBlocks();

        var data = datas[i];
        var id = ljInput.select;

        data = ljInput.domTextFix(data);

        ljInput.setBlockContent(id, data.innerText);
        ljInput.setBlockStart(id, data.getAttribute("s"));
        ljInput.setBlockEnd(id, data.getAttribute("e"));

        for (var si = 0; si < styles.length; si++)
        {
            var style = styles[si];
            var styleData = ljInput.getDomStyle(data, style);

            if (styleData)
            {
                ljInput.setBlockStyle(id, style, styleData);
            }
        }
    }

    ljLoad.postLoad(tmp);
};

ljLoad.preLoad = function () {
    var tmp = document.createElement("div");

    tmp.id = "loadSave";
    tmp.innerHTML = window.loader.value;

    document.body.appendChild(tmp);

    return tmp;
};

ljLoad.postLoad = function (tmp) {
    tmp.parentElement.removeChild(tmp);

    window.loader.value = "";
};


