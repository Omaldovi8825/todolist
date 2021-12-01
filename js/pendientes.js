
class Pendiente {

    static agregar(nombre, descripcion, fecha, prioridad){
    }

    eliminar(){

    }

    static crearCard(nombre, descripcion, fecha, prioridad){
        const contenedor = document.createElement('div')
        contenedor.classList.add('general_card_contenedor')
        contenedor.innerHTML = `
            <div class="general_card">
                <h4>${nombre}</h4>
                <p>${descripcion}</p>
                <div>
                    <div class="bolita_prioridad"></div>
                    <p>${fecha}</p>
                </div>
            </div>
        `
        const contenedor_tarjetas = document.querySelector('#contenedorTarjetas')
        contenedor_tarjetas.appendChild(contenedor)

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

    Pendiente.crearCard(nombre, descripcion, fecha, prioridad)
}

