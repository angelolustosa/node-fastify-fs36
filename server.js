// 1 - Importando o Fastify
import Fastify from 'fastify'
import { pasteis } from './db/db.pasteis.js';

// 1.1 - Instanciando o objeto fastify o qual poderemos acessar os métodos http
const fastify = Fastify({
    logger: true
});

//2 - Declarando a rota
fastify.get('/', (request, reply) => {
    return { message: 'Oi! chamado a partir da raiz!' }
});

fastify.post('/pastel', (request, reply) => {
    const pastel = request.body;

    // Verifica se o pastel com o mesmo id já existe
    const existe = pasteis.find(p => p.id === pastel.id);

    if (existe) {
        return reply.status(409).send({
            message: `O pastel de id: ${pastel.id} já existe`
        });
    }

    // Adiciona o novo pastel ao array
    pasteis.push(pastel);

    // Retorna todos os pastéis e a quantidade
    return {
        message: 'Pastel adicionado com sucesso!',
        qtd: pasteis.length,
        data: pasteis,

    };
});

fastify.get('/pasteis', (request, reply) => {
    return {
        message: 'Retornou todos os pastéis!',
        qtd: pasteis.length,
        data: pasteis,
    }
});

fastify.get('/pastel/:id', (request, reply) => {
    //console.log('Request', request.params.id);
    const id = parseInt(request.params.id);
    const produtosBd = pasteis.find(p => p.id === id);

    if(!produtosBd) {
        return reply.status(404).send({
            message: `O pastel de id: ${id} não existe`
        });
    }

    return {
        message: produtosBd ? `Retornou o pastel com o id: ${id}` : `Não encontrado pastel com o id: ${id}`,
        qtd: produtosBd ? 1 : 0,
        data: produtosBd || null,
    }
});

// PUT - Atualiza completamente um pastel existente (substituindo todos os dados)
fastify.put('/pastel/:id', (request, reply) => {
    const id = parseInt(request.params.id);
    const pastelAtualizado = request.body;

    // Encontra o pastel com o ID fornecido
    const index = pasteis.findIndex(p => p.id === id);

    if (index === -1) {
        return reply.status(404).send({
            message: `O pastel de id: ${id} não existe para ser atualizado`
        });
    }

    // Substitui o pastel encontrado pelo novo pastel
    pasteis[index] = pastelAtualizado;

    return {
        message: `Pastel de id: ${id} atualizado com sucesso!`,
        data: pastelAtualizado,
        qtd: pasteis.length,
    };
});

// PATCH - Atualiza parcialmente um pastel existente (somente os campos fornecidos)
fastify.patch('/pastel/:id', (request, reply) => {
    const id = parseInt(request.params.id);
    const dadosParciais = request.body;

    // Encontra o pastel com o ID fornecido
    const index = pasteis.findIndex(p => p.id === id);

    if (index === -1) {
        return reply.status(404).send({
            message: `O pastel de id: ${id} não existe para ser atualizado`
        });
    }

    // Atualiza parcialmente o pastel
    pasteis[index] = { ...pasteis[index], ...dadosParciais };

    return {
        message: `Pastel de id: ${id} atualizado parcialmente com sucesso!`,
        data: pasteis[index],
        qtd: pasteis.length,
    };
});


/* fastify.delete('/pastel/:id', (request, reply) => {
    const id = parseInt(request.params.id);

    const indicePastel = pasteis.findIndex(p => p.id === id);

    if(indicePastel) {
        pasteis.splice(indicePastel, 1)
        return reply.status(204).send({ message: `Pastel de id: ${id} deletado com sucesso!` });
    } else {
        return reply.status(404).send({ message: `O pastel de id: ${id} não existe para ser deletado`});
    }
}) */

// DELETE - Remove um pastel com o id fornecido
fastify.delete('/pastel/:id', (request, reply) => {
    const id = parseInt(request.params.id);

    // Encontra o índice do pastel com o ID fornecido
    const index = pasteis.findIndex(p => p.id === id);

    if (index === -1) {
        return reply.status(404).send({
            message: `O pastel de id: ${id} não existe para ser removido`
        });
    }

    // Remove o pastel do array
    pasteis.splice(index, 1);

    return {
        message: `Pastel de id: ${id} removido com sucesso!`,
        qtd: pasteis.length,
        data: pasteis,
    };
});

// 3 - Iniciando o servidor
fastify.listen({ port: 3000 });


/* 4 - Executando o server.js para perceber as mudanças usar a flag --watch
 node --watch -- server.js */


//const { nome, valor, tamanho, viagem, imagem } = request.body;