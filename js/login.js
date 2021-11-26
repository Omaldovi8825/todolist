localStorage.haySesionActiva = false
if(!localStorage.usuarios){
    localStorage.usuarios = JSON.stringify([])
}

class Login {

    static revisarUsuarioExiste(nombre){
        const usuarios = JSON.parse(localStorage.usuarios)
        const usuario = usuarios.find (usuarioActual => usuarioActual.nombre === nombre)
        return usuario
    }

    static revisarContrasenaUsuario(contrasenaUsuario, contrasenaInput){
        return contrasenaUsuario === contrasenaInput
    }
}

function hacerLogin(ev){
    ev.preventDefault()
    const [inputUsuario, inputContrasena ] = ev.target

    const usuario = Login.revisarUsuarioExiste(inputUsuario.value)
    
    if(usuario){
        const contrasenaConcide = Login.revisarContrasenaUsuario(usuario.password, inputContrasena.value)
        if(contrasenaConcide){
            localStorage.haySesionActiva = 'true'
            location.href = './paginas/menu.html'
        } else {
            alert('la contraseña es incorrecta')            
        }
    } else {
        alert('el usuario no existe')
    }   
}
