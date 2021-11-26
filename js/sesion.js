const haySesion = JSON.parse(localStorage.haySesionActiva)

if(!haySesion){
    location.href = '../index.html'
}