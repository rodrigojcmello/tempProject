import domínio from './domínio.js';
import store from 'store';
import createHistory from 'history/createHashHistory';
import swal from 'sweetalert';
import { reduxStore } from '../store/store';
import { editarLoader } from '../store/loader/loaderActions';
import {baixarJSON} from './baixarJSON';

let history;
history = createHistory();

const chamadaAPI = (método, endpoint, callback, dados, autenticação, loaderImediato) => {
    let status;
    let tempoEspera = loaderImediato ? 0 : 1500;

    let timeoutLoader = setTimeout(() => {
        reduxStore.dispatch(editarLoader(true));
    }, tempoEspera);

    let tempoAntes = +new Date();

    window.loaderContador++;

    fetch(`${domínio}${endpoint}`, {
        method: método,
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${store.get('usuário.token')}`
        },
        ...(dados ? { body: autenticação ? dados : JSON.stringify(dados) } : {})
    })
        .then((resposta) => {
            status = resposta.status;
            return Promise.resolve(resposta);
        })
        .then(resposta => resposta.json())
        .then((resposta) => {
            clearTimeout(timeoutLoader);
            window.loaderContador--;
            if (window.loaderContador == 0) {
                let atraso = 0;
                let tempoDepois = +new Date();
                let duração = tempoDepois - tempoAntes;
                let tempoMínimo = 1500;
                if (duração < (tempoEspera + tempoMínimo)) {
                    atraso = (tempoEspera + tempoMínimo) - duração;
                }
                setTimeout(() => {
                    reduxStore.dispatch(editarLoader(false));
                }, atraso);
            }

            if (resposta.error_description) {
                swal('Ops...', resposta.error_description, 'error');
            } else if (autenticação) {
                console.info(`${endpoint} -> resposta`, resposta);
                callback(resposta);
            } else if (status >= 200 && status < 300 && resposta.Sucesso) {
                console.info(`${endpoint} -> Sucesso`, resposta.Sucesso);
                console.info(`${endpoint} -> Mensagem`, resposta.Mensagem);
                console.info(`${endpoint} -> Dados`, resposta.ObjetoDeRetorno);
                // if ((toString(resposta.Mensagem) || '').length > 50) {
                    baixarJSON(resposta.Mensagem, 'retornoProcessarAnalise');
                // }
                callback(resposta.ObjetoDeRetorno);
            } else if (!resposta.Sucesso && resposta.Mensagem) {
                swal('Ops...', resposta.Mensagem, 'error');
            } else if (status == 401) {
                swal('Ops...', 'Sua sessão expirou', 'error').then(() => {
                    history.push('/sair');
                });
            }

        })
        .catch((erro) => {
            console.log(`erro ${endpoint}`, erro);
        });

};

export default chamadaAPI;