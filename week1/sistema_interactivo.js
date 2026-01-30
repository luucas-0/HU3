

// const para el nombre ya que su referencia no cambiará
const nombreUsuario = prompt("Por favor, ingresa tu nombre:");

// let para la edad ya que es un valor que procesaremos
let entradaEdad = prompt("Por favor, ingresa tu edad:");


// convierto la entrada a un número entero
const edadNumerica = parseInt(entradaEdad);

// compruebo si el valor ingresado no es un numero, con el is not a number 
if (isNaN(edadNumerica)) {
    // Uso de console.error para reportar fallos de entrada
    console.error("Error: Por favor, ingresa una edad válida en números.");
    alert("Error: La edad ingresada no es un número válido.");
} else {
    

    
    // si la edad es menor de 18
    if (edadNumerica < 18) {
        console.log(`Hola ${nombreUsuario}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`);
        alert(`Hola ${nombreUsuario}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`);
    } 
    // si la edad es mayor o igual 18
    else {
        console.log(`Hola ${nombreUsuario}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`);
        alert(`Hola ${nombreUsuario}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`);
    }
}