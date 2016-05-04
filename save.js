var ljSave = {
    storageIndex: 0,
    storagePrefix: "ljv_"
};

ljSave.save = function () {
    ljSave.preSave();

    var save = window.project.innerHTML;

    ljSave.storageIndex += 1;
    window.localStorage.setItem(ljSave.storagePrefix + ljSave.storageIndex.toString(), save);

    ljSave.postSave();
};

ljSave.postSave = function () {

    // overwrite old save
    if (ljSave.storageIndex > 10)
    {
        ljSave.storageIndex = 0;
    }

    window.localStorage.setItem(ljSave.storagePrefix + "index", ljSave.storageIndex);
};

ljSave.preSave = function () {
    var index = window.localStorage.getItem(ljSave.storagePrefix + "index");

    if (index)
    {
        ljSave.storageIndex = parseInt(index);
    }
};

ljSave.getLastSave = function () {
    ljSave.preSave();

    return window.localStorage.getItem(ljSave.storagePrefix + ljSave.storageIndex.toString());
};

ljSave.downloadLastSave = function () {
    ljSave.save();

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var blob = new Blob([window.project.innerHTML], {type: "plain/text"});
    var url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "lj-editor-save.txt";
    a.click();
    window.URL.revokeObjectURL(url);

    a.parentElement().removeChild(a);
};

ljSave.clearErrorSave = function () {
    for (var i = 11; i < 9999; i++)
    {
        window.localStorage.removeItem(ljSave.storagePrefix + i);
    }
};
