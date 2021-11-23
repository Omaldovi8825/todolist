
class Pendiente {
    constructor() {
        this.inNuevoPendiente = document.querySelector('#nuevoPendiente')
        this.inFechaVencimiento = document.querySelector('#fechaVencimiento')
        this.tablaPendientes = document.querySelector('#tbodyPendientes')
    }

    agregar(){

        if(this.inNuevoPendiente.value === ''){
            //this.inNuevoPendiente.style.border = '1px solid red'
            return false
        }
        
        const rowTablaPendientes = document.createElement('tr')
        const numeroRow = this.obtenerRowsActualesTablaPendientes() + 1
        const fecha = this.inFechaVencimiento.value != '' ? this.inFechaVencimiento.value : 'N.A.' 
        
        rowTablaPendientes.innerHTML = `
            <td>${numeroRow}</td>
            <td>${this.inNuevoPendiente.value}</td>
            <td>${fecha}</td>
            <td>
                <i class="fas fa-check" onclick="marcarPendienteCompletado(this)"></i>
            </td>
            <td>
                <i class="fas fa-trash-alt" onclick="eliminarPendiente(this)"></i>
            </td>
        `
        this.tablaPendientes.append(rowTablaPendientes)

        this.inNuevoPendiente.value = ''
        this.inFechaVencimiento.value = ''
    }

    eliminar(row){

        row.remove()

        const rowsTabla = this.tablaPendientes.children

        let counter = 1
        for( let rowActual of rowsTabla){
            const [tdNumero] = rowActual.children
            tdNumero.textContent = counter
            counter++
        }
    }

    obtenerRowsActualesTablaPendientes(){
        const numeroRowsActuales = this.tablaPendientes.children.length
        return numeroRowsActuales
    }
}

//se crea instancia
const nuevoPendiente = new Pendiente

function agregarPendiente(){
    nuevoPendiente.agregar()
}

function marcarPendienteCompletado(){
    console.log('completado')
}

function eliminarPendiente(trash){
    const row = trash.parentElement.parentElement
    nuevoPendiente.eliminar(row)
}