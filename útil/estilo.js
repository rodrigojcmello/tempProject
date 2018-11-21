export const obterEstilo = (className, estilo) => {
    if (typeof className == 'string') {
        return estilo[className];
    } else if (typeof className == 'object') {
        return className.map(classe => estilo[classe]).join(' ');
    } else {
        return null;
    }
};