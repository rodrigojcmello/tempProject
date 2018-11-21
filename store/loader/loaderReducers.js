let s = {
    ativo: false,
    contador: 0
};

const loader = (state = s, action) => {
    console.log('%%% LOADER');
    switch (action.type) {

        case 'EDITAR_LOADER':
            return {
                ...state,
                ativo: action.ativo
            };

        default:
            return state;

    }
};

export default loader;