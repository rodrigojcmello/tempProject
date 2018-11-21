import fileSaver from 'file-saver';

export const baixarJSON = (objeto, nome) => {
    console.log('DEBUG', DEBUG);
    if (DEBUG) {
        let blob = new Blob([JSON.stringify(objeto)], {type: 'text/plain;charset=utf-8'});
        fileSaver.saveAs(blob, `${nome}.json`);
    }
};

