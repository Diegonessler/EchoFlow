var express = require('express');
var router = express.Router();

//
// rotas GET
//

/* GET home page. */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { titulo: 'EchoFlow - Login' });
});

/* POST para login */
router.post('/login', async function(req, res, next) {
  const email = req.body.text;    // Alterado de 'email' para 'text' para corresponder ao input
  const senha = req.body.password; // Alterado de 'senha' para 'password' para corresponder ao input

  const usuario = await global.banco.buscarUsuario({email, senha});

  if (usuario.usucodigo) {
    // cria um registro de seção de uso utilizando o objeto GLOBAL
    global.usucodigo = usuario.usucodigo;
    global.usuemail = usuario.usuemail;
    
    // redireciona o usuario diretamente para a rota GET /browse
    res.redirect('/browse');
  } else {
    res.redirect('/'); // Volta para a página de login se falhar
  }
});

/* GET browse page */
router.get('/browse', function(req, res, next) {
  res.render('browse');
});



module.exports = router;