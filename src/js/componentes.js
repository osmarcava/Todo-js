import { Todo, TodoList } from "../classes/index";
import { todoList } from "../index";

// referencias html
const divTodoList  = document.querySelector('.todo-list');
const txtInput     = document.querySelector('.new-todo');
const btnBorrarC   = document.querySelector('.clear-completed');
const ulFitros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {



const htmlTodo = `
<li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'ckecked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
			<input class="edit" value="Create a TodoMVC template">
 </li>`;

 const div = document.createElement('div');
 div.innerHTML = htmlTodo;

 divTodoList.append( div.firstElementChild );
 return div.firstElementChild;

}

//eventos

txtInput.addEventListener('keyup', ( event ) => {

	if (event.keyCode === 13 && txtInput.value.length > 0){
		console.log(txtInput.value);
		const nuevoTodo = new Todo(txtInput.value);
	
		todoList.nuevoTodo(nuevoTodo);

		crearTodoHtml(nuevoTodo);
		txtInput.value = '';
		console.log(todoList);
	}
});

divTodoList.addEventListener('click', (event) => {

	const nombreElemento = event.target.localName;
	const todoElement    = event.target.parentElement.parentElement;
	const todoid         = todoElement.getAttribute('data-id');

	if ( nombreElemento.includes('input') ){
		todoList.marcarCompletado(todoid);
		todoElement.classList.toggle('completed');

	} else if(nombreElemento.includes('button')) {
		todoList.elimimnarTodo( todoid );
		divTodoList.removeChild(todoElement);
	}
})


btnBorrarC.addEventListener('click', () => {

	todoList.eliminarCompletados();

	for (let i = divTodoList.children.length-1; i >= 0; i--) {

		const element = divTodoList.children[i];

		if( element.classList.contains('completed')) {
			divTodoList.removeChild(element);
		}
	}
	console.log(todoList);
});


ulFitros.addEventListener('click', ( event  => {

	const filtro = event.target.text;
	if( !filtro) { return; }

	anchorFiltros.forEach( elem => elem.classList.remove('selected'));
	event.target.classList.add('selected');
	console.log(event.target);

	for ( const elemento of divTodoList.children) {
		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');

		switch ( filtro ) {
			case 'Pendientes':
				if( completado) {
					elemento.classList.add('hidden');
				}
			break;
			
			case 'Completados':
				if (!completado) {
					elemento.classList.add('hidden');
				}
			break;
		}
	}
}));