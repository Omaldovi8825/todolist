// if(!localStorage.usuarios) {
//     localStorage.usuarios = JSON.stringify([])    
// }

const caracteresMinimosPassword = 5
const caracterRaro = '!'
const caracteresMinimosUsuario = 5

class RegistroUsuario {
    constructor(){

    }

    revisarUsuariosRegistrados(){
        const usuariosJson = JSON.parse(localStorage.usuarios)
        return usuariosJson.length > 0 
    }

    // registrarNuevoUsuario( nombre, password ){
    //     const nuevoUsuario = { nombre, password }
    //     const usuariosJson = JSON.parse(localStorage.usuarios)

    //     const nuevaListaUsuarios = [
    //         ...usuariosJson,
    //         nuevoUsuario
    //     ]

    //     localStorage.usuarios = JSON.stringify(nuevaListaUsuarios)
    // }

    static registrarNuevoUsuario(nombre, password){
        const query = 'INSERT INTO usuarios (nombre, password) VALUES (?, ?)'
        const values = [ nombre, password ]

        db.transaction( tx => {
            tx.executeSql(query, values, () => location.href = '../index.html')
        })
    }

    // static revisarSiExisteUsuario(inputUsuario){
    //     const usuariosJson = JSON.parse(localStorage.usuarios)
    //     const usuario = usuariosJson.find( usuarioActual => usuarioActual.nombre === inputUsuario.value)
    //     return usuario ? true : false
    // }

    static revisarSiExisteUsuario(nombre){
        const query = 'SELECT nombre FROM usuarios WHERE nombre=? LIMIT 1'
        const values = [nombre]

        return new Promise( (resolve, reject) => {
            db.transaction( tx => {
                tx.executeSql( query, values, ( tx, results ) => {
                        resolve( results.rows.length == 1 )
                    }
                )
            })
        })
    }

    static revisarSiNombreDeUsuarioEsValido(nombreUsuario){
        return nombreUsuario.length >= caracteresMinimosUsuario
    }

    static revisarSiContrasenasCoinciden(contrasena, contrasenaRepetida){
        return contrasena === contrasenaRepetida
    }

    static revisarSiContrasenaEsValida(contrasena, largoContrasena){
        return contrasena.length >= largoContrasena && contrasena.includes(caracterRaro)
    }
}

async function registrarNuevoUsuario(ev){
    ev.preventDefault()
    const [inputUsuario, inputContrasena, inputContrasenaRepetir] = ev.target
    const usuarioExiste = await RegistroUsuario.revisarSiExisteUsuario(inputUsuario.value)
    const contrasenasCoinciden = RegistroUsuario.revisarSiContrasenasCoinciden(inputContrasena.value, inputContrasenaRepetir.value)
    const contrasenaEsValida = RegistroUsuario.revisarSiContrasenaEsValida(inputContrasena.value, caracteresMinimosPassword)
    const nombreUsuarioValido = RegistroUsuario.revisarSiNombreDeUsuarioEsValido(inputUsuario.value)

    if(usuarioExiste){
        alert('el usuario ya existe')
    } else if(!nombreUsuarioValido){
        alert(`el nombre de usuario debe contener al menos ${caracteresMinimosUsuario} caracteres`)
    } else if(!contrasenasCoinciden){
        alert('las contraseñas no coinciden')
    } else if(!contrasenaEsValida){
        alert(`contraseña debe incluir al menos ${caracteresMinimosPassword} caracteres y un ${caracterRaro}`)
    } else {
        RegistroUsuario.registrarNuevoUsuario(inputUsuario.value, inputContrasena.value)
    }
}