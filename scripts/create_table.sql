--Criar tabela pastel
CREATE TABLE pasteis (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    tamanho VARCHAR(50),
    viagem BOOLEAN,
    imagem TEXT
);

