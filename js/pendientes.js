
class Pendiente {

    static agregar(nombre, descripcion, fecha, prioridad){
        
    }

    eliminar(){

    }
}


function marcarPendienteCompletado(){
    console.log('completado')
}

function eliminarPendiente(){
}

function toggleModalrPendiente(modal, mode){
    modal.style.bottom = mode == 'close' ? '-350px' : '0'
    if(mode === 'close'){
        for(let input of modal.elements){
            input.value = ''
        }

    }
}

function agregarPendiente(ev){
    ev.preventDefault()    
    const [nombreInput, descripcionInput, fechaInput, prioridadSelect ] = ev.target.elements
    const nombre = nombreInput.value
    const descripcion = descripcionInput.value
    const fecha = fechaInput.value
    const prioridad = prioridadSelect.value

    Pendiente.agregar(nombre, descripcion, fecha, prioridad)
}

