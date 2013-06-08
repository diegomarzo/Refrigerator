var ingredientesParaRecetas = {};
var recetaSeleccionada;
var alimentos = [];

function initIngredientesParaRecetas() {
	ingredientesParaRecetas['cesar'] = ['lechuga', 'pollo', 'queso'];
	ingredientesParaRecetas['pastel'] = ['leche', 'queso'];
	ingredientesParaRecetas['rosto'] = ['carne', 'pasta', 'zanahoria'];
	ingredientesParaRecetas['pescado'] = ['pescado'];
}

function seleccionaReceta(nombreReceta) {
	var innerHTML = "<p>Ingredientes para " + nombreReceta + "</p>";
	recetaSeleccionada = nombreReceta;
	var ulist = "<ul>";
	for (var i = 0; i < ingredientesParaRecetas[nombreReceta].length; i++) {
		var liElement = "<li>" + ingredientesParaRecetas[nombreReceta][i] + "</li>"
		ulist = ulist + liElement;
	}
	ulist = ulist + "</ul>";
	document.getElementById("ingredientes").innerHTML = innerHTML + ulist;
}

function mostrarAlimentos() {
	var innerHTML = "";
	for (var i = 0; i < alimentos.length; i++) {
		var innerDiv = "<div class='" + alimentos[i] + "'></div>";
		innerHTML = innerHTML + innerDiv;
	}
	document.getElementById("refrigerator").innerHTML = innerHTML;
}

function addAlimento(alimento) {
	if (alimentos.length < 20) {
		alimentos.push(alimento);
		mostrarAlimentos();
	} else {
		alert("Nevera llena, prepare alguna receta antes de añadir alimentos")
	}
}

function vaciarNevera() {
	alimentos = [];
	mostrarAlimentos();
}

function listaDeLaCompra() {
	var alimentosAComprar = [];
	for (var receta in ingredientesParaRecetas) {
		alimentosAComprar = alimentosAComprar.concat(alimentosQueFaltan(ingredientesParaRecetas[receta], alimentos.concat(alimentosAComprar)));
	}
	if (alimentosAComprar.length > 0) {
		alert("Lista de la compra: " + alimentosAComprar);
	} else {
		alert("Pueden hacerse todas las recetas con los alimentos disponibles");
	}
}

function alimentosQueFaltan(ingredientes, alimentos) {
	var ingredientesNecesarios = [];
	for (var i = 0; i < ingredientes.length; i++) {
		var index = alimentos.indexOf(ingredientes[i]);
		if (index < 0) {
			ingredientesNecesarios.push(ingredientes[i]);
		}
	}
	return ingredientesNecesarios;
}

function prepararReceta() {
	if (recetaSeleccionada) {
		var ing = ingredientesParaRecetas[recetaSeleccionada];
		var necesarios = alimentosQueFaltan(ing, alimentos);
		if (necesarios.length <= 0) {
			for (var i = 0; i < ing.length; i++) {
				var index = alimentos.indexOf(ing[i]);
				alimentos.splice(index, 1);
			}
			mostrarAlimentos();
		} else {
			alert("No se puede preparar " + recetaSeleccionada + " porque no hay " + necesarios);
		}
	} else {
		alert('No hay receta seleccionada');
	}
}

function compraAutomatica() {
	var alimentosAComprar = [];
	for (var receta in ingredientesParaRecetas) {
		alimentosAComprar = alimentosAComprar.concat(alimentosQueFaltan(ingredientesParaRecetas[receta], alimentos.concat(alimentosAComprar)));
	}
	if (alimentosAComprar.length > 0) {
		alimentos = alimentos.concat(alimentosAComprar);
		mostrarAlimentos();
	} else {
		alert("Pueden hacerse todas las recetas con los alimentos disponibles");
	}
}

function buscarReceta() {
	for (var receta in ingredientesParaRecetas) {
		var alimentosAComprar = alimentosQueFaltan(ingredientesParaRecetas[receta], alimentos);
		if (alimentosAComprar.length == 0) {
			alert("Puede preparar " + receta);
			return;
		}
	}
	alert("No puede prepararse ninguna receta con los alimentos disponibles");
}

initIngredientesParaRecetas();
