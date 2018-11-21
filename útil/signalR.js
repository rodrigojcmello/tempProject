import domínio from './domínio.js';
import store from 'store';
import swal from 'sweetalert';

let hub = $.hubConnection(domínio);
let proxy = hub.createHubProxy('analiseHub');
let sessaoHubProxy = hub.createHubProxy('sessaoHub');
const signalR = abrirAnalise => {
    let metodos = {
        //conecta no signalR
        connect: function() {
            if (!hub.id && store.get('usuário.token')) {
                hub.qs = {
                    'access_token': store.get('usuário.token')
                };
                hub.start();
            }
        },
        //desconecta do signalR 
        disconnect: function() {
            hub.stop();
        }
    };

    hub.disconnected(function() {
        setTimeout(function() {
            if (!hub.id && store.get('usuário.token')) {
                hub.qs = {
                    'access_token': store.get('usuário.token')
                };
                hub.start();
            }
        }, 5000);
    });

    proxy.on('abrirAnalise', function(idAnalise) {
        abrirAnalise(idAnalise);
    });

    sessaoHubProxy.on('mensagem', (rmtIdUsuario, rmtUsuario, rmtMensagem) => {
        swal({
            title: `Mensagem do usuário: ${rmtUsuario}`,
            text: `${rmtMensagem}`
        });
    });

    sessaoHubProxy.on('logoff', (rmtIdUsuario, rmtUsuario, rmtMensagem) => {
        swal({
            title: `O usuário ${rmtUsuario} está solicitando o seu logoff`,
            text: `${rmtMensagem}`
        }).then(() => {

        });
    });

    return metodos;
};

export default signalR;