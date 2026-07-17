const boton = document.getElementById("boton");

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

    return lista.some(fecha =>
        fecha[0] === dia && fecha[1] === mes
    );

}

function calendario(dia,mes){

    let first = ["Alg","Comp","Alg","Comp"];

    let second = ["Prog","Calc","Prog","Calc"];

    let third = ["","Visu","","Visu"];

    if(contiene(list_int_mon,dia,mes)){

        third[0] = "Intro";

        if(contiene(list_no_alg_prog,dia,mes)){

            first[0] = "";
            second[0] = "";

            if(contiene(list_tues,dia,mes)){

                first[1] = "";
                second[1] = "";
                third[1] = "";

            }

        }

    }

    else if(contiene(list_int_wed,dia,mes)){

        third[2] = "Intro";

        if(contiene(list_no_alg_prog,dia,mes)){

            first[0] = "";
            second[0] = "";

            if(contiene(list_tues,dia,mes)){

                first[1] = "";
                second[1] = "";
                third[1] = "";

            }

        }

    }

    return [first,second,third];

}

boton.onclick = function(){

    const dia = Number(document.getElementById("dia").value);
    const mes = Number(document.getElementById("mes").value);

    if(!dia || !mes){

        alert("Introduce un día y un mes.");

        return;

    }

    const tabla = calendario(dia,mes);

    const fila1 = document.querySelectorAll("#fila1 td");
    const fila2 = document.querySelectorAll("#fila2 td");
    const fila3 = document.querySelectorAll("#fila3 td");

    for(let i=0;i<4;i++){

        fila1[i].textContent = tabla[0][i];
        fila2[i].textContent = tabla[1][i];
        fila3[i].textContent = tabla[2][i];

    }

}

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("sw.js");

}