
class cardPendienteGeneral extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }

    static get observedAttributes(){
        return ['titulo', 'descripcion', 'fecha']
    }

    attributeChangedCallback(attr, oldVal, newVal){
        if(attr === 'titulo') this.titulo = newVal
        if(attr === 'descripcion') this.descripcion = newVal
        if(attr === 'fecha') this.fecha = newVal
    }

    // handleEvent(event){
    //     const caller = event.target.id
    //     switch(caller){
    //         case 'envio':
    //             this.abrirModalEvento()
    //             break
    //         default:
    //             console.log('algo va mal')
    //     }
    // }

    // abrirModalEvento(){
    //     console.log('holi')
    // }

    getTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
                <div class="general_card">
                    <p>No. 1</p>
                    <h4>Pagar la luz</h4>
                    <p>hacer pago en línea</p>
                    <div>
                        <div class="bolita_prioridad"></div>
                        <p>12/12/2021</p>
                    </div>
                </div>
            ${this.getStyles()}
        `
        return template;
      }

    getStyles() {
        return `
            <style>
                :host {
                    --primary-background: #5a6cb2;
                    width: 50%;
                    padding: 5px;
                }
                
                .general_card {
                    border: 1px solid black;

                }

            </style>
        `
      }

    connectedCallback(){
        this.shadowRoot.append(this.getTemplate().content.cloneNode(true))
        // this.shadowRoot.querySelector('button').addEventListener('click', this)
    }
}

customElements.define("pendiente-general", cardPendienteGeneral)