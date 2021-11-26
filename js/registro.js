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

    static registrarNuevoUsuario( nombre, password ){
        const nuevoUsuario = { nombre, password }
        const usuariosJson = JSON.parse(localStorage.usuarios)

        const nuevaListaUsuarios = [
            ...usuariosJson,
            nuevoUsuario
        ]

        localStorage.usuarios = JSON.stringify(nuevaListaUsuarios)
    }

    static revisarSiExisteUsuario(inputUsuario){
        const usuariosJson = JSON.parse(localStorage.usuarios)
        const usuario = usuariosJson.find( usuarioActual => usuarioActual.nombre === inputUsuario.value)
        return usuario ? true : false
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

    static redireccionarALogin(){
        location.href = '../'
    }
}

function registrarNuevoUsuario(ev){
    ev.preventDefault()
    const [inputUsuario, inputContrasena, inputContrasenaRepetir] = ev.target
    const usuarioExiste = RegistroUsuario.revisarSiExisteUsuario(inputUsuario.value)
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
        RegistroUsuario.redireccionarALogin()
    }
}