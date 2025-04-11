const mysql = require('mysql2/promise');


async function conectarBD() 
{
if(global.conexao && global.conexao.state !=='disconected')
    {
        return global.conexao;
    }    

const conexao = mysql.createConnection(
    {
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : '',
        database : 'echoflow'
    }
);

// guarda a nova conexao no objeto GLOBAL
global.conexao = conexao;

// retorna a conexao criada
return global.conexao;
}

async function buscarUsuario(usuario) 
{
    const conexao = await conectarBD();
    const sql = "select * from usuarios where usuemail=? and ususenha=?;";
    const [usuarioEncontrado]= 
    await conexao.query(sql, [usuario.email, usuario.senha]);

    if (usuarioEncontrado && usuarioEncontrado.length > 0)
    {
        return usuarioEncontrado[0];
    }
    else
    {
        return{};
    }
}



module.exports = {buscarUsuario}
