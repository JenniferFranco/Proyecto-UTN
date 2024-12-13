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

//agregar item de la lista 
async function insertPromocion(obj) {
    try{
        var query = 'insert into promociones set ?'
        var rows = await pool.query(query, [obj])
        return  rows;
    } catch(error){
        console.log (error);
        throw error;
    }
}

//trae los datos para modificar un solo item
async function getPromocionById(id) {
    var query = 'select * from promociones where id=?';
    var rows = await pool.query(query, [id]);   
    return rows[0]; 
};

//modificar un solo item
async function modificarPromocionById(obj, id) {
    try{
        var query = 'update promociones set ? where id=?';
        var rows = await pool.query (query, [obj, id]);
        return rows;
    } catch(error) {
        throw error;
    }
}

module.exports = {getPromociones, deletePromocionesById, insertPromocion, getPromocionById, modificarPromocionById};