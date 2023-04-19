const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM carros', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (placa) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM carros WHERE placa = ?', [placa], (error, results) => {
                if (error) { rejeitado(error); return; }

                //Se retornar mais de um pega o primeiro
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserir: (marca, modelo, placa, status_, dono, whatsapp) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO carros (marca, modelo, placa, status_, dono, whatsapp) VALUES (?,?,?,?,?,?)',
                [marca, modelo, placa, status_, dono, whatsapp], (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results.insertId);
                }
            );
        });
    },

    alterar: (id, marca, modelo, placa, status_, dono, whatsapp) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE carros SET marca = ?, modelo = ?, placa = ?, status_ = ?, dono = ?, whatsapp = ? WHERE id = ?',
                [marca, modelo, placa, status_, dono, whatsapp, id], (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },


    excluir: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query("DELETE FROM carros WHERE id = ?", [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};