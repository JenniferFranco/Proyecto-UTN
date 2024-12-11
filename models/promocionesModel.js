var pool = require ('./bd');

//listar promociones
async function getPromociones() {
    var query = 'select * from promociones';
    var rows = await pool.query(query);
    return rows;
}

//borrar item de la lista
async function deletePromocionesById(id) {
    var query = 'delete from promociones where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}


module.exports = {getPromociones, deletePromocionesById};