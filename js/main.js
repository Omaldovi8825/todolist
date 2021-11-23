// import { Pendiente } from './modules/Pendiente.js'
class Login {
    static revisarUsuarioExiste(inputUsuario){
        const usuarios = JSON.parse(localStorage.usuarios)
        const usuario = usuarios.find( usuarioActual => usuarioActual.nombre === inputUsuario )
        return usuario ? usuario : false
    }

    static revisarSiCoincideContrasenaUsuario(contrasenaUsuario, contrasenaInput){
        return contrasenaUsuario === contrasenaInput
    }
}

function hacerLogin(ev){
    ev.preventDefault()
    const [inputUsuario, inputContrasena ] = ev.target

    const usuario = Login.revisarUsuarioExiste(inputUsuario.value)
    const contrasenaConcide = Login.revisarSiCoincideContrasenaUsuario(usuario.password, inputContrasena.value)

    if(usuario && contrasenaConcide){
        localStorage.haySesionActiva = 'true'
        location.href = './paginas/menu.html'
    } else {
        alert('los datos son incorrectos')
    }
    
}