const CarroService = require('../services/CarroService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };

        let carros = await CarroService.buscarTodos();

        for (let i in carros) {
            json.result.push({
                id: carros[i].id,
                marca: carros[i].marca,
                modelo: carros[i].modelo,
                placa: carros[i].placa,
                status_: carros[i].status_,
                dono: carros[i].dono,
                whatsapp: carros[i].whatsapp
            });

        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        let placa = req.params.placa;
        let carro = await CarroService.buscarUm(placa);

        //se tiver carro ele joga no json
        if (carro) {
            json.result = carro;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };
        
        let marca = req.body.marca;
        let modelo = req.body.modelo;
        let placa = req.body.placa;
        let status_ = req.body.status_;
        let dono = req.body.dono;
        let whatsapp = req.body.whatsapp;
        
        console.log("inserir " + marca, modelo, placa, status_, dono, whatsapp);

        //se tiver todos os dados
        if (status_ && dono) {
            let CarroId = await CarroService.inserir(marca, modelo, placa, status_, dono, whatsapp);
            json.result = {
                id: CarroId,
                marca,
                modelo,
                placa,
                status_,
                dono,
                whatsapp
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };

        //pega o id por params
        let id = req.params.id;
        let marca = req.body.marca;
        let modelo = req.body.modelo;
        let placa = req.body.placa;
        let status_ = req.body.status_;
        let dono = req.body.dono;
        let whatsapp = req.body.whatsapp;

        console.log("alterar " + id, marca, modelo, placa, status_, dono, whatsapp);

        //se tiver todos os dados
        if (id && marca && modelo && placa && status_ && dono && whatsapp) {
            await CarroService.alterar(id, marca, modelo, placa, status_, dono, whatsapp);
            json.result = {
                id,
                marca,
                modelo,
                placa,
                status_,
                dono,
                whatsapp
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', result: {} };

        //pega o id por paramentro da url
        await CarroService.excluir(req.params.id);

        res.json(json);

    },
}