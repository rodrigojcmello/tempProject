let s = {
    exibirBotao: false
};

export const barraSuperior = (state = s, action) => {
    console.log('JJ ', state)
    switch (action.type) {
        case 'MOSTRAR_EXIBIR_BOTAO':
            return {
                ...state,
                exibirBotao: action.payload
            }
        default:
            return state;
    }
}

export default barraSuperior;