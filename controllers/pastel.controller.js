import { query } from '../db/index.js';

export const getAllPasteis = async (request, reply) => {
    const result = await query('SELECT * FROM pasteis');
    reply.send({
        message: 'Retornou todos os pastéis!',
        qtd: result.rowCount,
        data: result.rows,
    });
};

export const getPastelById = async (request, reply) => {
    const { id } = request.params;
    const result = await query('SELECT * FROM pasteis WHERE id = $1', [id]);

    if (result.rowCount === 0) {
        return reply.status(404).send({ message: `O pastel de id: ${id} não existe` });
    }

    reply.send({
        message: `Retornou o pastel com o id: ${id}`,
        data: result.rows[0],
    });
};

export const createPastel = async (request, reply) => {
    const { nome, valor, tamanho, viagem, imagem } = request.body;

    const result = await query(
        `INSERT INTO pasteis (nome, valor, tamanho, viagem, imagem) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nome, valor, tamanho, viagem, imagem]
    );

    reply.status(201).send({
        message: 'Pastel adicionado com sucesso!',
        data: result.rows[0],
    });
};

export const updatePastel = async (request, reply) => {
    const { id } = request.params;
    const { nome, valor, tamanho, viagem, imagem } = request.body;

    const result = await query(
        `UPDATE pasteis SET nome = $1, valor = $2, tamanho = $3, viagem = $4, imagem = $5 
        WHERE id = $6 RETURNING *`,
        [nome, valor, tamanho, viagem, imagem, id]
    );

    if (result.rowCount === 0) {
        return reply.status(404).send({ message: `O pastel de id: ${id} não existe` });
    }

    reply.send({
        message: `Pastel de id: ${id} atualizado com sucesso!`,
        data: result.rows[0],
    });
};

export const deletePastel = async (request, reply) => {
    const { id } = request.params;

    const result = await query('DELETE FROM pasteis WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
        return reply.status(404).send({ message: `O pastel de id: ${id} não existe` });
    }

    reply.send({
        message: `Pastel de id: ${id} removido com sucesso!`,
        data: result.rows[0],
    });
};
