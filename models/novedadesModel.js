var pool = require ('./bd');

//listar novedades
async function getNovedades() {
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;
}

//borrar item de la lista
async function deleteNovedadesById(id) {
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}


module.exports = {getNovedades, deleteNovedadesById};