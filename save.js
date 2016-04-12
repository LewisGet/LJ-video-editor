var ljSave = {
    storageIndex: 0,
    storagePrefix: "ljv_"
};

ljSave.save = function () {
    ljSave.preSave();

    var save = window.project.innerHTML;

    ljSave.storageIndex++;
    window.localStorage.setItem(ljSave.storagePrefix + "index", ljSave.storageIndex);

    window.localStorage.setItem(ljSave.storagePrefix + ljSave.storageIndex.toString(), save);

    ljSave.postSave();
};

ljSave.postSave = function () {

    // overwrite old save
    if (ljSave.storageIndex > 30)
    {
        ljSave.storageIndex = 0;
    }
};

ljSave.preSave = function () {
    var index = window.localStorage.getItem(ljSave.storagePrefix + "index");

    if (index)
    {
        ljSave.storageIndex = index;
    }
};

ljSave.getLastSave = function () {
    ljSave.preSave();

    return window.localStorage.getItem(ljSave.storagePrefix + ljSave.storageIndex.toString());
};
