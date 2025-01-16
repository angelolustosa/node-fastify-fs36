import { 
    getAllPasteis, 
    getPastelById, 
    createPastel, 
    updatePastel, 
    deletePastel 
} from '../controllers/pastel.controller.js';

export const pastelRoutes = (fastify, options, done) => {
    fastify.get('/pasteis', getAllPasteis);
    fastify.get('/pastel/:id', getPastelById);
    fastify.post('/pastel', createPastel);
    fastify.put('/pastel/:id', updatePastel);
    fastify.delete('/pastel/:id', deletePastel);

    done();
};
