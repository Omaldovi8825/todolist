db.transaction( tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS generales (id_usuario, titulo, descripcion, fecha, prioridad)')
})