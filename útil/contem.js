const contem = (valorProcurado, valorCompleto) => {
    return new RegExp(valorProcurado, 'i').test(valorCompleto);
};

export default contem;