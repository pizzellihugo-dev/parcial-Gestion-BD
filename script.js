// Parcial de Gestión de Bases de Datos
// Envío de resultados a Google Sheets mediante Google Apps Script.

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbykAjibWwqenZky7SsJpelboyycL_4PEWbd9Hb4lCchO1oHbj2uWC-b6wDoRrIGd0u8/exec" 


const BANK = [
    ['Búsqueda','¿Cómo trabaja la búsqueda secuencial?',['Revisa elementos uno por uno','Divide la lista en mitades','Solo funciona con datos ordenados','Necesita un índice'],0,'Recorre los elementos uno por uno.'],

    ['Búsqueda','La búsqueda binaria requiere datos ordenados.',['Verdadero','Falso'],0,'El orden permite descartar una mitad en cada paso.'],

    ['Búsqueda','¿Complejidad típica de búsqueda secuencial en el peor caso?',['O(1)','O(log n)','O(n)','O(n²)'],2,'Puede revisar los n elementos.'],

    ['Búsqueda','¿Qué hace la búsqueda binaria tras comparar con el elemento central?',['Vuelve al principio','Descarta la mitad que no puede contener el valor','Ordena de nuevo','Elimina el centro'],1,'Continúa en una sola mitad.'],

    ['Búsqueda','La búsqueda secuencial puede usarse con datos desordenados.',['Verdadero','Falso'],0,'No requiere orden previo.'],

    ['Búsqueda','¿Qué estructura suelen usar los índices de SQLite?',['Pila LIFO','Árbol B (B-Tree)','Cola circular','Lista sin estructura'],1,'SQLite suele organizar índices mediante árboles B.'],

    ['Búsqueda','¿Qué instrucción crea un índice en SQLite?',['MAKE INDEX','ADD SEARCH','CREATE INDEX','ORDER INDEX'],2,'CREATE INDEX crea un índice.'],

    ['Búsqueda','Los índices pueden acelerar consultas, pero ocupan espacio y requieren mantenimiento.',['Verdadero','Falso'],0,'Tienen beneficios y costos.'],

    ['Minería de datos','En el enfoque trabajado, ¿qué significa explorar datos con SQL?',['Buscar patrones, tendencias o relaciones mediante consultas','Diseñar una interfaz','Convertir tablas en imágenes','Reemplazar la base por texto'],0,'Se exploran patrones y relaciones con consultas y agregaciones.'],

    ['Minería de datos','SQLite puede guardar información en un archivo local.',['Verdadero','Falso'],0,'SQLite es embebida y suele guardar la base en un archivo.'],

    ['SQL avanzado','¿Qué función permite contar filas?',['SUM()','COUNT()','AVG()','MIN()'],1,'COUNT() cuenta registros o valores.'],

    ['Minería de datos','¿Qué cláusula agrupa registros para calcular resultados por categoría?',['ORDER BY','WHERE','GROUP BY','DISTINCT'],2,'GROUP BY agrupa filas que comparten valores.'],

    ['Minería de datos','Para conocer la cantidad de alumnos por localidad, conviene usar:',['COUNT() y GROUP BY localidad','MIN() sin agrupación','CASE sin consulta','Solo DISTINCT'],0,'COUNT junto con GROUP BY localidad cuenta por localidad.'],

    ['Minería de datos','AVG() permite calcular un promedio.',['Verdadero','Falso'],0,'AVG() calcula el promedio numérico.'],

    ['Minería de datos','¿Qué cláusula filtra grupos después de GROUP BY?',['WHERE','HAVING','FROM','LIMIT'],1,'HAVING filtra los grupos resultantes.'],

    ['Minería de datos','¿Qué función devuelve el valor máximo de una columna?',['MAX()','COUNT()','SUM()','DISTINCT()'],0,'MAX() devuelve el valor máximo.'],

    ['Minería de datos','INNER JOIN puede relacionar filas cuando se cumple la condición de unión.',['Verdadero','Falso'],0,'Devuelve coincidencias que cumplen la condición ON.'],

    ['Minería de datos','¿Cómo encontrar apellidos frecuentes en alumnos?',['Agrupar por apellido y contar registros','Ordenar por DNI','Usar MIN(nombre)','Eliminar apellidos repetidos'],0,'GROUP BY apellido con COUNT(*) cuenta frecuencias.'],

    ['Minería de datos','La minería básica con SQL en estos apuntes exige entrenar IA avanzada.',['Verdadero','Falso'],1,'El enfoque se basa en consultas, agrupaciones y relaciones.'],

    ['SQL avanzado','¿Qué función permite sumar valores numéricos?',['SUM()','COUNT()','AVG()','JOIN()'],0,'SUM() suma valores numéricos.'],

    ['SQL avanzado','¿Qué hace WHERE?',['Filtra filas antes de agrupar','Filtra grupos tras agrupar','Crea índices','Renombra permanentemente'],0,'WHERE filtra filas antes de la agrupación.'],

    ['SQL avanzado','HAVING filtra grupos y suele usarse con GROUP BY.',['Verdadero','Falso'],0,'HAVING evalúa condiciones sobre grupos.'],

    ['SQL avanzado','¿Qué devuelve SELECT DISTINCT localidad FROM alumnos?',['Todas las filas repetidas','Localidades sin repeticiones','Cantidad por localidad','Solo la última localidad'],1,'DISTINCT elimina duplicados del resultado.'],

    ['SQL avanzado','¿Qué condición selecciona localidad que no sea NULL?',['localidad = NULL','localidad IS NULL','localidad IS NOT NULL','localidad = EMPTY'],2,'IS NOT NULL selecciona valores no nulos.'],

    ['SQL avanzado','Para comprobar un NULL se recomienda IS NULL en lugar de = NULL.',['Verdadero','Falso'],0,'SQL utiliza IS NULL e IS NOT NULL.'],

    ['SQL avanzado','En CASE, ¿qué ocurre cuando se cumple un WHEN?',['Devuelve ese resultado y deja de evaluar las siguientes condiciones','Ejecuta todos los WHEN','Crea una tabla','Borra filas'],0,'CASE devuelve el resultado del primer WHEN verdadero.'],

    ['SQL avanzado','En CASE, ELSE es obligatorio siempre.',['Verdadero','Falso'],1,'ELSE es opcional; si se omite, el resultado puede ser NULL.'],

    ['SQL avanzado','¿Para qué sirve COUNT(*) AS cantidad?',['Nombra la columna calculada del resultado','Cambia el nombre real de la tabla','Crea una restricción','Ordena descendente'],0,'AS asigna un alias a la columna de salida.'],

    ['SQL avanzado','¿Cómo contar inscripciones por estado?',['GROUP BY estado y COUNT(*)','ORDER BY y DELETE','DISTINCT y DROP TABLE','WHERE sin función'],0,'Agrupar por estado y contar produce una cantidad por estado.'],

    ['SQL avanzado','SUM(CASE WHEN estado = Activa THEN 1 ELSE 0 END) puede contar filas que cumplen la condición.',['Verdadero','Falso'],0,'CASE produce 1 para las filas coincidentes y SUM los acumula.']
];

let questions = [];
let submitted = false;
const $ = id => document.getElementById(id);

function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
}

function updateProgress() {
    if (!questions.length) return;
    const answered = questions.filter(question =>
        document.querySelector(`input[name="q${question.id}"]:checked`)
    ).length;
    $('progressText').textContent = `Respondidas ${answered} de ${questions.length}`;
    $('progress').style.width = `${answered / questions.length * 100}%`;
}

function startExam() {
    const nombre = $('nombre').value.trim();
    const apellido = $('apellido').value.trim();
    const dni = $('dni').value.trim();

    if (!nombre || !apellido || !dni) {
        alert('Completá nombre, apellido y DNI.');
        return;
    }

    questions = shuffle(BANK).map((item, index) => {
        const options = shuffle(item[2].map((text, originalIndex) => ({ text, originalIndex })));
        return {
            topic: item[0],
            question: item[1],
            options,
            answer: options.findIndex(option => option.originalIndex === item[3]),
            explanation: item[4],
            id: index + 1
        };
    });

    submitted = false;
    $('student').hidden = true;
    $('exam').hidden = false;
    $('result').hidden = true;
    $('submit').disabled = false;
    $('saveStatus').textContent = '';
    $('total').textContent = questions.length;

    $('questions').innerHTML = questions.map((question, index) => `
        <article class="q" id="q${question.id}">
            <strong>${index + 1}. ${escapeHtml(question.question)}</strong>
            <div class="note">${escapeHtml(question.topic)}</div>
            ${question.options.map((option, optionIndex) => `
                <label class="opt">
                    <input type="radio" name="q${question.id}" value="${optionIndex}">
                    <span>${escapeHtml(option.text)}</span>
                </label>
            `).join('')}
            <p class="feedback" id="f${question.id}" hidden></p>
        </article>
    `).join('');

    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function submitExam(event) {
    event.preventDefault();
    if (submitted) return;

    const unanswered = questions.filter(question =>
        !document.querySelector(`input[name="q${question.id}"]:checked`)
    ).length;

    if (unanswered && !confirm(`Hay ${unanswered} pregunta(s) sin responder. ¿Entregar igualmente?`)) return;

    submitted = true;
    $('submit').disabled = true;
    let correct = 0;
    const detail = [];

    questions.forEach((question, index) => {
        const selectedInput = document.querySelector(`input[name="q${question.id}"]:checked`);
        const selected = selectedInput ? Number(selectedInput.value) : null;
        const isCorrect = selected === question.answer;
        if (isCorrect) correct++;

        const labels = $(`q${question.id}`).querySelectorAll('.opt');
        labels.forEach((label, optionIndex) => {
            label.querySelector('input').disabled = true;
            if (optionIndex === question.answer) label.classList.add('correct');
            if (optionIndex === selected && !isCorrect) label.classList.add('wrong');
        });

        const feedback = $(`f${question.id}`);
        feedback.hidden = false;
        feedback.textContent = `${isCorrect ? 'Correcta.' : 'Incorrecta o sin responder.'} Respuesta correcta: ${question.options[question.answer].text}. ${question.explanation}`;

        detail.push({
            numero: index + 1,
            tema: question.topic,
            pregunta: question.question,
            respuestaSeleccionada: selected === null ? 'Sin responder' : question.options[selected].text,
            respuestaCorrecta: question.options[question.answer].text,
            correcta: isCorrect
        });
    });

    const total = questions.length;
    const incorrect = total - correct;
const percentage = Math.round(correct / total * 10000) / 100;
const nota = Math.round((correct / total) * 1000) / 100;

    
$('pct').textContent = nota.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});

$('right').textContent = correct;
$('wrong').textContent = incorrect;
$('total').textContent = total;

$('message').textContent =
    `Obtuviste ${correct} de ${total} respuestas correctas. Tu nota es ${nota.toLocaleString('es-AR')} sobre 10.`;

    $('result').hidden = false;
    $('result').scrollIntoView({ behavior: 'smooth' });


await saveResult({
    nombre: $('nombre').value.trim(),
    apellido: $('apellido').value.trim(),
    dni: $('dni').value.trim(),
    correctas: correct,
    incorrectas: incorrect,
    total,
    nota: nota,
    porcentaje: percentage,
    fechaCliente: new Date().toISOString(),
    detail
});

}

async function saveResult(data) {
    $('saveStatus').textContent = 'Enviando el resultado a Google Sheets…';
    try {
        // Envío mediante formulario HTML: evita las restricciones CORS de fetch
        // cuando la web está alojada en GitHub Pages y Apps Script en Google.
        let frame = document.getElementById('appsScriptFrame');
        if (!frame) {
            frame = document.createElement('iframe');
            frame.name = 'appsScriptFrame';
            frame.id = 'appsScriptFrame';
            frame.hidden = true;
            document.body.appendChild(frame);
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = SCRIPT_URL;
        form.target = 'appsScriptFrame';
        form.acceptCharset = 'UTF-8';
        form.style.display = 'none';

        const payload = document.createElement('input');
        payload.type = 'hidden';
        payload.name = 'payload';
        payload.value = JSON.stringify(data);
        form.appendChild(payload);
        document.body.appendChild(form);
        // No quitar el formulario inmediatamente: algunos navegadores cancelan
        // el envío si se elimina del DOM antes de iniciar la navegación del iframe.
        form.submit();
        window.setTimeout(() => form.remove(), 10000);

        $('saveStatus').textContent = 'Se inició el envío. Confirmá que el resultado aparezca en la planilla; este mensaje no garantiza que se haya guardado.';
    } catch (error) {
        console.error('No se pudo enviar el resultado:', error);
        $('saveStatus').textContent = 'No se pudo enviar el resultado. Revisá la conexión y la URL de Apps Script.';
    }
}

function init() {
    $('start').addEventListener('click', startExam);
    $('questions').addEventListener('change', updateProgress);
    $('form').addEventListener('submit', submitExam);
    $('printButton').addEventListener('click', () => window.print());
}

document.addEventListener('DOMContentLoaded', init);
