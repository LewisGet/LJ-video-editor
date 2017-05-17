var ljSound = {

};

ljSound.openSound = function (file) {
    var url = URL.createObjectURL(file);

    if (window.soundPanelFileIsPng.value == "false")
    {
        var wavesurfer = WaveSurfer.create({
            container: '#soundBarTmp',
            scrollParent: true
        });

        wavesurfer.load(url);

        wavesurfer.on('ready', function () {
            var canvas = ljSound.getCanvas();

            // clear cache
            ljSound.clearCache();

            canvas.onclick = ljUi.soundClick;

            window.soundBar.appendChild(canvas);
        });
    }
    else
    {
        var png = document.createElement("img");

        png.setAttribute("href", url);
        png.style.width = window.controllerTimeTotalBar.style.width;
        png.style.height = "50px";

        window.soundBar.appendChild(png);
    }
};

ljSound.getCanvas = function () {
    var canvas = window.soundBarTmp.children[0].children[0];

    // clear style
    canvas.style = {};
    canvas.style.width = window.controllerTimeTotalBar.style.width;
    canvas.style.height = "50px";

    return canvas;
};

ljSound.clearCache = function () {
    window.soundBarTmp.innerText = "";
};