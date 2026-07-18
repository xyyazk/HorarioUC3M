// ===========================
// DATOS DEL HORARIO
// ===========================

const firstOriginal = ["Alg", "Comp", "Alg", "Comp"];
const secondOriginal = ["Prog", "Calc", "Prog", "Calc"];
const thirdOriginal = ["", "Visu", "", "Visu"];

// Semanas con Introducción el lunes
const listIntroMonday = [
    [7,9],
    [21,9],
    [5,10],
    [19,10],
    [16,11],
    [30,11]
];

// Semanas con Introducción el miércoles
const listIntroWednesday = [
    [16,9],
    [30,9],
    [14,10],
    [28,10],
    [11,11],
    [25,11],
    [9,12]
];

// Semanas donde desaparecen Alg y Prog del lunes
const listNoAlgProg = [
    [12,10],
    [26,10],
    [30,11]
];

// Semanas donde el martes no hay clase
const listNoTuesday = [
    [30,11]
];

// ===========================
// FUNCIONES AUXILIARES
// ===========================

// Devuelve true si la fecha pertenece a la semana que empieza
// en cualquiera de las fechas de la lista.
function perteneceSemana(lista, dia, mes, desplazamiento = 0){

    const fecha = new Date(2026, mes - 1, dia);

    for(const [d, m] of lista){

        const inicio = new Date(2026, m - 1, d);
        inicio.setDate(inicio.getDate() + desplazamiento);

        const fin = new Date(inicio);
        fin.setDate(fin.getDate() + 6);

        if(fecha >= inicio && fecha <= fin){
            return true;
        }

    }

    return false;

}

// Devuelve las tres filas del horario correspondientes
// a la semana seleccionada.
function obtenerHorario(dia, mes){

    const first = [...firstOriginal];
    const second = [...secondOriginal];
    const third = [...thirdOriginal];

    // Introducción el lunes
    if(perteneceSemana(listIntroMonday, dia, mes)){
        third[0] = "Intro";
    }

    // Introducción el miércoles
    // La lista guarda los miércoles, así que retrocedemos dos días
    if(perteneceSemana(listIntroWednesday, dia, mes, -2)){
        third[2] = "Intro";
    }

    // Semanas sin Alg ni Prog
    if(perteneceSemana(listNoAlgProg, dia, mes)){

        first[0] = "";
        second[0] = "";

        // Semanas sin martes
        if(perteneceSemana(listNoTuesday, dia, mes)){

            first[1] = "";
            second[1] = "";
            third[1] = "";

        }

    }

    return [first, second, third];

}

// ===========================
// INTERFAZ
// ===========================

// Crea la etiqueta de color de cada asignatura
function crearEtiqueta(nombre){

    if(nombre === ""){
        return "";
    }

    const clases = {
        Alg: "alg",
        Comp: "comp",
        Prog: "prog",
        Calc: "calc",
        Visu: "visu",
        Intro: "comp"
    };

    return `<span class="materia ${clases[nombre]}">${nombre}</span>`;

}


// Actualiza el texto "Semana del..."
function actualizarTextoSemana(fecha){

    const lunes = new Date(fecha);

    const diaSemana = lunes.getDay();

    // Si es domingo (0), retrocede 6 días.
    // Si no, vuelve al lunes de esa semana.
    lunes.setDate(
        lunes.getDate() + (diaSemana === 0 ? -6 : 1 - diaSemana)
    );

    const domingo = new Date(lunes);
    domingo.setDate(domingo.getDate() + 6);

    const meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ];

    let texto;

    if(lunes.getMonth() === domingo.getMonth()){

        texto =
            `Semana del ${lunes.getDate()} al ${domingo.getDate()} de ${meses[lunes.getMonth()]}`;

    }else{

        texto =
            `Semana del ${lunes.getDate()} de ${meses[lunes.getMonth()]} al ${domingo.getDate()} de ${meses[domingo.getMonth()]}`;

    }

    document.getElementById("textoSemana").textContent = texto;

}

// Muestra el horario correspondiente a la fecha seleccionada
function mostrarHorario(){

    const input = document.getElementById("fecha");

    if(input.value === ""){
        return;
    }

    // Guardar la última fecha
    localStorage.setItem("ultimaFecha", input.value);

    const fecha = new Date(input.value);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;

    actualizarTextoSemana(fecha);

    const mensaje = document.getElementById("mensaje");
    const tabla = document.getElementById("tabla");
    const imagen = document.getElementById("imagenFinal");

    // Fin de las clases
    if(fecha >= new Date(2026, 11, 11)){

        mensaje.textContent = "🎉 Se acabó yeiiiiii";

        tabla.style.display = "none";
        imagen.style.display = "none";

        return;

    }

    mensaje.textContent = "";

    tabla.style.display = "table";
    imagen.style.display = "block";

    const horario = obtenerHorario(dia, mes);

    for(let fila = 0; fila < 3; fila++){

        const tr = document.getElementById(`fila${fila + 1}`);

        for(let col = 0; col < 4; col++){

            tr.children[col].innerHTML = crearEtiqueta(horario[fila][col]);

        }

    }

}

// ===========================
// CONTROL DE FECHAS
// ===========================

// Avanza o retrocede una semana
function cambiarSemana(dias){

    const input = document.getElementById("fecha");

    if(input.value === ""){
        return;
    }

    const fecha = new Date(input.value);

    fecha.setDate(fecha.getDate() + dias);

    input.value = fecha.toISOString().split("T")[0];

    mostrarHorario();

}


// Ir a hoy
function irAHoy(){

    const hoy = new Date();

    document.getElementById("fecha").value =
        hoy.toISOString().split("T")[0];

    mostrarHorario();

}


// ===========================
// EVENTOS
// ===========================

document.getElementById("fecha").addEventListener("change", mostrarHorario);

document.getElementById("hoy").addEventListener("click", irAHoy);

document.getElementById("anterior").addEventListener("click", () => {
    cambiarSemana(-7);
});

document.getElementById("siguiente").addEventListener("click", () => {
    cambiarSemana(7);
});


// ===========================
// INICIO
// ===========================

window.onload = () => {

    const input = document.getElementById("fecha");

    const ultimaFecha = localStorage.getItem("ultimaFecha");

    if(ultimaFecha){

        input.value = ultimaFecha;

    }else{

        input.value = new Date().toISOString().split("T")[0];

    }

    mostrarHorario();

};