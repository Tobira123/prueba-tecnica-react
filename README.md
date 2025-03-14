🔧 Pasos de Instalación y Ejecución

Clona este repositorio:

git clone https://github.com/Tobira123/prueba-tecnica-react.git

Instala las dependencias:

npm install

Inicia el servidor de desarrollo:

npm run dev

📁 Estructura del Proyecto

main.jsx:

Punto de entrada de la aplicación. Configura Redux, el ThemeProvider de MUI y el LocalizationProvider para mostrar fechas en español.

App.jsx:

Componente principal que muestra el encabezado, el botón para alternar el modo oscuro, la lista de tareas y un FAB que abre un modal para agregar tareas.

store:

Contiene la configuración de Redux y los slices para la gestión de tareas y del tema.

components:

Incluye todos los componentes de la aplicación, como:

TaskForm.jsx: Formulario para crear tareas (título, descripción, fecha, estado, categoría y prioridad).

TaskList.jsx: Vista para filtrar y mostrar tareas mediante Tabs (categorías) y un Select (estado).

TaskItem.jsx: Componente para mostrar cada tarea con controles para actualizar su estado, marcarla como completada o revertirla, y eliminarla.

ThemeToggleButton.jsx: Botón que alterna el modo oscuro, mostrando un ícono de luna en light y un ícono de sol en dark.

styles:

Archivos CSS globales y específicos, por ejemplo, para los estilos neumórficos de los toggles.

utils:

Archivos de utilidades y datos iniciales (como el listado de tareas predeterminadas).

📝 Decisiones de Diseño

Tecnologías: React con Redux y Vite, utilizando Material UI para una interfaz responsiva y moderna.

Modo Oscuro: Controlado globalmente vía Redux y MUI ThemeProvider; se alterna mediante un botón que muestra luna o sol según el modo.

Gestión de Tareas: Tareas con atributos completos (incluyendo fecha en español, estado, categoría y prioridad). Se usan toggles neumórficos y botones para cambiar o revertir el estado.

Filtrado y Organización: Tareas filtradas por categoría (Tabs) y estado (Select) para facilitar la navegación.

Responsive: Diseño adaptado a dispositivos móviles y escritorio, con un FAB que abre el formulario en un modal y se posiciona según el tamaño de pantalla.