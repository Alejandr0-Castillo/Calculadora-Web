let display = document.getElementById('display');
let resultadoCalculado = false;

/**
 * @function agregarAlDisplay
 * @description Agrega un valor al display de la calculadora, controlando la entrada de operadores y puntos decimales.
 * @param {string} valor Valor a agregar al display.
 */
function agregarAlDisplay(valor) {
    if (resultadoCalculado) {
        if (!esOperador(valor)) {
            display.value = '';
        }
        resultadoCalculado = false;
    }
    if (esOperador(valor) && esOperador(display.value.slice(-1))) {
        return;
    }
    if (valor === '.') {
        const ultimoNumero = display.value.split(/[\+\-\*\/]/).pop();
        if (ultimoNumero.includes('.')) {
            return;
        }
    }
    if (valor === '.' && (display.value === '' || esOperador(display.value.slice(-1)))) {
        return;
    }
    display.value += valor;
}

/**
 * @function limpiarDisplay
 * @description Limpia el display de la calculadora, reseteando el valor y el estado de resultadoCalculado.
 */
function limpiarDisplay() {
    display.value = '';
    resultadoCalculado = false;
}

/**
 * @function borrarUltimo
 * @description Borra el último caracter del display.
 */
function borrarUltimo() {
    display.value = display.value.slice(0, -1);
}

/**
 * @function calcularResultado
 * @description Calcula el resultado de la operación en el display, controlando errores y actualizando el historial.
 */
function calcularResultado() {
    try {
        if (display.value.slice(-1) === '=') {
            return;
        }
        if (display.value === '') {
            agregarAlHistorial('0 = 0');
            display.value = '0';
            resultadoCalculado = true;
            return;
        }
        let resultado = eval(display.value);
        agregarAlHistorial(display.value + ' = ' + resultado);
        display.value = resultado;
        resultadoCalculado = true;
    } catch (error) {
        display.value = 'Error';
    }
}

/**
 * @function agregarAlHistorial
 * @description Agrega una operación al historial de la calculadora.
 * @param {string} operacion Operación a agregar al historial.
 */
function agregarAlHistorial(operacion) {
    let historialLista = document.getElementById('historial-lista');
    let nuevoItem = document.createElement('li');
    nuevoItem.textContent = operacion;
    historialLista.appendChild(nuevoItem);
}

/**
 * @function esOperador
 * @description Verifica si un valor es un operador (+, -, *, /).
 * @param {string} valor Valor a verificar.
 * @returns {boolean} True si el valor es un operador, false de lo contrario.
 */
function esOperador(valor) {
    return ['+', '-', '*', '/'].includes(valor);
}
