import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';

const host = '0.0.0.0'; //todas as placas de rede
const port = 3000; //porta se refere a um programa no host
const app = express();

app.use(express.urlencoded({extended: true}));

/* app.get('/', (requisicao, resposta)=>  {
    resposta.write('<h1><i>Bem-vindo ao site.<i><h1>')
    resposta.end();
})

app.get('/index.html', (requisicao, resposta)=>  {
    resposta.write('<h1><i>Bem-vindo ao index.html.<i><h1>')
    resposta.end();
}) */

app.use(session({
    secret:'m1projetoadschave',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 15
    }
}))

app.post('./login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario && senha && usuario === 'lucastgfp' && senha === '123'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/cadastroCliente.html');
    }
    else{
        resposta.redirect('/login.html');
    }
})

app.use(express.static(path.join(process.cwd(), 'publico')));
app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));
app.listen(port, host, ()=>{
    console.log(`Servidor em execução - https://${host}:${port}`);
})