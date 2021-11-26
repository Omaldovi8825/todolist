localStorage.haySesionActiva = false
localStorage.id_usuario = 0

db.transaction( tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (nombre, password)')
})

class Login {

    static revisarUsuarioExiste(nombre){
        return new Promise( (resolve, reject) => {

            const query = 'SELECT rowid, nombre, password FROM usuarios WHERE nombre=?'

            db.transaction( tx => {
                tx.executeSql( query, [nombre], ( tx, results ) => {
                    if(results.rows.length == 0){
                        resolve(false)
                    } else {
                        resolve(results.rows[0])
                    }
                })
            })
        })
    }

    static revisarSiCoincideContrasenaUsuario(contrasenaUsuario, contrasenaInput){
        return contrasenaUsuario === contrasenaInput
    }
}

async function hacerLogin(ev){
    ev.preventDefault()
    const [inputUsuario, inputContrasena ] = ev.target

    const usuario =  await Login.revisarUsuarioExiste(inputUsuario.value)
    const contrasenaConcide = Login.revisarSiCoincideContrasenaUsuario(usuario.password, inputContrasena.value)

    if(usuario && contrasenaConcide){
        localStorage.haySesionActiva = 'true'
        localStorage.id_usuario = usuario.rowid
        location.href = './paginas/menu.html'
    } else {
        alert('los datos son incorrectos')
    }   
}