document.addEventListener('DOMContentLoaded', () => {
    // Variables de estado del juego
    let turno = 'X';  // El jugador que empieza (X)
    let tablero = [null, null, null, null, null, null, null, null, null]; // Tablero vacío (9 celdas)
    let celdas = document.querySelectorAll('.celda'); // Seleccionamos todas las celdas del tablero

    // Función para actualizar la celda con el valor correspondiente
    function marcarCelda(index) {
        // Si la celda está vacía, marcarla con la marca del jugador actual
        if (tablero[index] === null) {
            tablero[index] = turno;
            celdas[index].textContent = turno;

            // Verificar si hay un ganador
            if (verificarGanador()) {
                setTimeout(() => alert(`${turno} ha ganado!`), 100); // Mostrar mensaje de ganador
                setTimeout(reiniciarJuego, 1500); // Reiniciar el juego después de 1.5 segundos
            } else if (tablero.every(celda => celda !== null)) {
                // Si todas las celdas están llenas, es un empate
                setTimeout(() => alert('¡Empate!'), 100);
                setTimeout(reiniciarJuego, 1500); // Reiniciar el juego después de 1.5 segundos
            } else {
                // Cambiar de turno
                turno = turno === 'X' ? 'O' : 'X';
            }
        }
    }

    // Función para verificar si hay un ganador
    function verificarGanador() {
        // Combinaciones ganadoras
        const combinaciones = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Verificar cada combinación de celdas
        for (let combinacion of combinaciones) {
            const [a, b, c] = combinacion;
            if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                return true; // Si hay una combinación ganadora
            }
        }
        return false;
    }

    // Función para reiniciar el juego
    function reiniciarJuego() {
        tablero = [null, null, null, null, null, null, null, null, null];
        celdas.forEach(celda => celda.textContent = ''); // Limpiar todas las celdas
        turno = 'X'; // El jugador X comienza de nuevo
    }

    // Asignar el evento de clic a cada celda
    celdas.forEach((celda, index) => {
        celda.addEventListener('click', () => marcarCelda(index));
    });
});
