if(!localStorage.usuarios) {
    localStorage.usuarios = JSON.stringify([])    
}

const caracteresMinimosPassword = 8
const caracterRaro = '3'
const caracteresMinimosUsuario = 5
const caracterRaroUsuario = '#'

class RegistroUsuario {
    // constructor(){
    //     this.inputUsuario = 
    // }
    revisarUsuariosRegistrados(){
        const usuariosJson = JSON.parse(localStorage.usuarios)
        return usuariosJson.length > 0 
    }

    registrarNuevoUsuario( nombre, password ){
        const nuevoUsuario = { nombre, password }
        const usuariosJson = JSON.parse(localStorage.usuarios)

        const nuevaListaUsuarios = [
            ...usuariosJson,
            nuevoUsuario
        ]

        localStorage.usuarios = JSON.stringify(nuevaListaUsuarios)
    }

    revisarSiExisteUsuario(inputUsuario){
        const usuariosJson = JSON.parse(localStorage.usuarios)
        const usuario = usuariosJson.find( usuarioActual => usuarioActual.nombre === inputUsuario.value)
        return usuario ? true : false
    }

    revisarSiNombreDeUsuarioEsValido(nombreUsuario){
        return nombreUsuario.length >= caracteresMinimosUsuario && nombreUsuario.includes(caracterRaroUsuario)
    }

    revisarSiContrasenasCoinciden(inputContrasena, inputContrasenaRepetir){
        return inputContrasena.value === inputContrasenaRepetir.value
    }

    revisarSiContrasenaEsValida(contrasena, largoContrasena){
        return contrasena.length >= largoContrasena && contrasena.includes(caracterRaro)
    }
}

const registro = new RegistroUsuario

function registrarNuevoUsuario(ev){
    ev.preventDefault()
    const [inputUsuario, inputContrasena, inputContrasenaRepetir] = ev.target
    const usuarioExiste = registro.revisarSiExisteUsuario(inputUsuario)
    const contrasenasCoinciden = registro.revisarSiContrasenasCoinciden(inputContrasena, inputContrasenaRepetir)
    const contrasenaEsValida = registro.revisarSiContrasenaEsValida(inputContrasena.value, caracteresMinimosPassword)
    const nombreUsuarioValido = registro.revisarSiNombreDeUsuarioEsValido(inputUsuario.value)

    if(usuarioExiste){
        alert('el usuario ya existe')
    } else if(!nombreUsuarioValido){
        alert(`el nombre de usuario debe contener al menos ${caracteresMinimosUsuario} caracteres y un ${caracterRaroUsuario}`)
    } else if(!contrasenasCoinciden){
        alert('las contraseñas no coinciden')
    } else if(!contrasenaEsValida){
        alert(`contraseña debe incluir al menos ${caracteresMinimosPassword} caracteres y un ${caracterRaro}`)
    } else {
        registro.registrarNuevoUsuario(inputUsuario.value, inputContrasena.value)
        location.href = '../index.html'
    }
}