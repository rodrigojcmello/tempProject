const hostname = window.location.hostname;
//let domínio = 'http://localhost:5555';
let domínio = 'http://172.30.100.30:5555';
switch (hostname) {
    case 'studio-homologacao.harpia.net.br':
        domínio = 'https://api-studio-homologacao.harpia.net.br';
        break;
    case 'studio-preproducao.harpia.net.br':
        domínio = 'https://api-studio-preproducao.harpia.net.br';
        break;
    case 'studio.harpia.net.br':
        domínio = 'https://api-studio.harpia.net.br';
        break;
}

export default domínio;