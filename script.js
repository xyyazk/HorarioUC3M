const firstOriginal = ["Alg", "Comp", "Alg", "Comp"];
const secondOriginal = ["Prog", "Calc", "Prog", "Calc"];
const thirdOriginal = ["", "Visu", "", "Visu"];

const list_int_mon = [
    [7,9],[21,9],[5,10],[19,10],[16,11],[30,11]
];

const list_int_wed = [
    [16,9],[30,9],[14,10],[28,10],[11,11],[25,11],[9,12]
];

const list_no_alg_prog = [
    [5,10],[6,10],[7,10],[8,10],[9,10],[11,10],[12,10],[13,10],[14,10],[15,10],[16,10],[17,10],[18,10],
    [27,10],[28,10],[29,10],[30,10],[31,10],[1,11],[2,11],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11],
    [1,12],[2,12],[3,12],[4,12],[5,12],[6,12],[7,12],[8,12],[9,12],[10,12]
];

const list_tues = [
    [2,12],[3,12],[4,12],[5,12],[6,12],[7,12],[8,12],[9,12],[10,12]
];

function contiene(lista,dia,mes){
    return lista.some(fecha => fecha[0]===dia && fecha[1]===mes);
}

function perteneceSemana(lista, dia, mes, esMiercoles = false){

    const año = 2026;
    const fechaSeleccionada = new Date(año, mes - 1, dia);

    for(const fecha of lista){

        let inicio = new Date(año, fecha[1] - 1, fecha[0]);

        // Si la fecha de referencia es un miércoles,
        // retrocedemos al lunes de esa misma semana.
        if(esMiercoles){
            inicio.setDate(inicio.getDate() - 2);
        }

        const fin = new Date(inicio);
        fin.setDate(inicio.getDate() + 6);

        if(fechaSeleccionada >= inicio && fechaSeleccionada <= fin){
            return true;
        }

    }

    return false;
}

function calendario(dia, mes){

    let first = [...firstOriginal];
    let second = [...secondOriginal];
    let third = [...thirdOriginal];

    if(perteneceSemana(list_int_mon, dia, mes, false)){

        third[0] = "Intro";

        if(contiene(list_no_alg_prog, dia, mes)){

            first[0] = "";
            second[0] = "";

            if(contiene(list_tues, dia, mes)){

                first[1] = "";
                second[1] = "";
                third[1] = "";

            }

        }

    }

    else if(perteneceSemana(list_int_wed, dia, mes, true)){

        third[2] = "Intro";

        if(contiene(list_no_alg_prog, dia, mes)){

            first[0] = "";
            second[0] = "";

            if(contiene(list_tues, dia, mes)){

                first[1] = "";
                second[1] = "";
                third[1] = "";

            }

        }

    }

    return [first, second, third];

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


document.getElementById("fecha").addEventListener("change", mostrarHorario);

document.getElementById("hoy").addEventListener("click",()=>{

    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth()+1).padStart(2,"0");
    const dia = String(hoy.getDate()).padStart(2,"0");

    const fecha = `${año}-${mes}-${dia}`;

    document.getElementById("fecha").value = fecha;

    mostrarHorario();

});

window.onload = () => {

    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    const fecha = `${año}-${mes}-${dia}`;

    document.getElementById("fecha").value = fecha;

    mostrarHorario();

};