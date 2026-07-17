const firstOriginal = ["Alg", "Comp", "Alg", "Comp"];
const secondOriginal = ["Prog", "Calc", "Prog", "Calc"];
const thirdOriginal = ["", "Visu", "", "Visu"];

const list_int_mon = [
    [1,9],[8,9],[15,9],[22,9],[29,9],[6,10],[13,10],[20,10],[27,10],[3,11],[10,11],[17,11],[24,11],[1,12],[15,12]
];

const list_int_wed = [
    [3,9],[10,9],[17,9],[24,9],[1,10],[8,10],[15,10],[22,10],[29,10],[5,11],[12,11],[19,11],[26,11],[3,12],[17,12]
];

const list_no_alg_prog = [
    [20,11],[15,12]
];

const list_tues = [
    [2,9],[9,9],[16,9],[23,9],[30,9],[7,10],[14,10],[21,10],[28,10],[4,11],[11,11],[18,11],[25,11],[2,12],[16,12]
];

function contiene(lista,dia,mes){
    return lista.some(fecha => fecha[0]===dia && fecha[1]===mes);
}

function calendario(dia,mes){

    let first = [...firstOriginal];
    let second = [...secondOriginal];
    let third = [...thirdOriginal];

    if(contiene(list_int_mon,dia,mes)){
        third[0] = "Intro";
    }

    else if(contiene(list_int_wed,dia,mes)){
        third[2] = "Intro";
    }

    if(contiene(list_no_alg_prog,dia,mes)){
        first[2] = "";
        second[2] = "";
    }

    if(contiene(list_tues,dia,mes)){
        first[1] = "";
        second[1] = "";
        third[1] = "";
    }

    return [first,second,third];

}

function crearEtiqueta(nombre){

    if(nombre==="") return "";

    let clase = "";

    switch(nombre){

        case "Alg":
            clase="alg";
            break;

        case "Comp":
            clase="comp";
            break;

        case "Prog":
            clase="prog";
            break;

        case "Calc":
            clase="calc";
            break;

        case "Visu":
            clase="visu";
            break;

        case "Intro":
            clase="comp";
            break;

    }

    return `<span class="materia ${clase}">${nombre}</span>`;

}

function mostrarHorario(){

    const fecha = document.getElementById("fecha").value;

    if(fecha===""){
        alert("Selecciona una fecha.");
        return;
    }

    localStorage.setItem("ultimaFecha",fecha);

    const partes = fecha.split("-");

    const dia = parseInt(partes[2]);
    const mes = parseInt(partes[1]);

    const tabla = calendario(dia,mes);

    for(let fila=0;fila<3;fila++){

        const tr = document.getElementById("fila"+(fila+1));

        for(let col=0;col<4;col++){

            const td = tr.children[col];

            td.innerHTML = crearEtiqueta(tabla[fila][col]);

        }

    }

}

document.getElementById("boton").addEventListener("click",mostrarHorario);

document.getElementById("hoy").addEventListener("click",()=>{

    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth()+1).padStart(2,"0");
    const dia = String(hoy.getDate()).padStart(2,"0");

    const fecha = `${año}-${mes}-${dia}`;

    document.getElementById("fecha").value = fecha;

    mostrarHorario();

});

window.onload = ()=>{

    const ultimaFecha = localStorage.getItem("ultimaFecha");

    if(ultimaFecha){

        document.getElementById("fecha").value = ultimaFecha;
        mostrarHorario();

    }

};