// tutorialStepsConfig.js
const tutorialStepsConfig = {
    '/dashboard': [
        {
            target: '.dashboard',
            content: '¡Bienvenido al Dashboard! Aquí encontrarás indicadores útiles para la gestión de pacientes y fisioterapeutas en tu institución.',
            placement: 'bottom',
        },
        {
            target: '.dashboardFichasClinicas',
            content: 'En este apartado podrás ver las fichas clínicas de tus pacientes.',
            placement: 'top',
        },
        {
            target: '.dashboardFisioterapeutasEnMiInstitucion',
            content: 'En este apartado podrás ver los fisioterapeutas que trabajan en tu institución.',
            placement: 'top',
        },
        {
            target: '.dashboardUltimosPacientesAlta',
            content: 'En este apartado podrás ver los últimos pacientes que han sido dados de alta.',
            placement: 'top',
        },
        {
            target: '.dashboardPromedioDuracionAtencion',
            content: 'En este apartado podrás ver el promedio de duración de atención de tus pacientes.',
            placement: 'top',
        },
        {
            target: '.dashboardUltimosPacientesIngresados',
            content: 'En este apartado podrás ver los últimos pacientes que han sido ingresados.',
            placement: 'top',
        },
        {
            target: '.dashboardCargaPersonal',
            content: 'En este apartado podrás ver la carga de trabajo de tus fisioterapeutas.',
            placement: 'top',
        },
        {
            target: '.dashboardAreasAfectadasUltimosPacientes',
            content: 'En este apartado podrás ver las áreas afectadas de tus últimos pacientes.',
            placement: 'top',
        },
    ],
    '/dashboard/agregar-administrador': [
        {
            target: '.administrador',
            content: 'Esta es la sección de administradores general.',
            placement: 'top',
        },
        {
            target: '.administradorSeccionIngreso',
            content: 'En esta sección podrás ingresar un nuevo administrador.',
            placement: 'top',
        },
        {
            target: '.administradorIngreso',
            content: 'A continuación tendrás que ingresar los datos correspondientes que son solicitados.',
            placement: 'right',
        },
        {
            target: '.FeedActividades',
            content: 'En este apartado podrás ver las actividades de ingreso que se han realizado por el rol administrador.',
            placement: 'right',
        },
    ],
    '/dashboard/eliminar-administrador': [
        {
            target: '.administradorSeccionEliminar',
            content: 'En esta sección podrás eliminar un administrador existente.',
            placement: 'top',
        },
        {
            target: '.administradorEliminar',
            content: 'A continuación tendrás que ingresar los datos correspondientes que son solicitados.',
            placement: 'right',
        },
        {
            target: '.FeedActividades',
            content: 'En este apartado podrás ver las actividades de eliminar que se han realizado por el rol administrador.',
            placement: 'right',
        },
    ],
    '/dashboard/actualizar-administrador': [
        {
            target: '.administradorSeccionActualizar',
            content: 'En esta sección podrás actualizar un administrador existente.',
            placement: 'top',
        },
        {
            target: '.administradorActualizar',
            content: 'A continuación tendrás que ingresar los datos correspondientes que son solicitados.',
            placement: 'right',
        },
        {
            target: '.FeedActividades',
            content: 'En este apartado podrás ver las actividades de actualizar que se han realizado por el rol administrador.',
            placement: 'right',
        },
    ],
    '/dashboard/ingresar-medico': [
        {
            target: '.fisioterapeuta',
            content: 'Esta es la sección de fisioterapeutas.',
            placement: 'top',
        },
        {
            target: '.fisioterapeutaSeccionIngreso',
            content: 'En esta sección podrás ingresar un nuevo fisioterapeuta.',
            placement: 'top',
        },
        {
            target: '.fisioterapeutaIngreso',
            content: 'A continuación tendrás que ingresar los datos correspondientes que son solicitados.',
            placement: 'right',
        },
        {
            target: '.FeedActividades',
            content: 'En este apartado podrás ver las actividades de ingreso que se han realizado por el rol fisioterapeutas.',
            placement: 'right',
        },
    ],
    '/dashboard/eliminar-medico': [
        {
            target: '.fisioterapeutaSeccionEliminar',
            content: 'En esta sección podrás eliminar un fisioterapeuta existente.',
            placement: 'top',
        },
        {
            target: '.fisioterapeutaEliminar',
            content: 'A continuación tendrás que ingresar los datos correspondientes que son solicitados.',
            placement: 'right',
        },
        {
            target: '.FeedActividades',
            content: 'En este apartado podrás ver las actividades de eliminar que se han realizado por el rol fisioterapeutas.',
            placement: 'right',
        },
    ],
    '/dashboard/actualizar-medico': [
        {
            target: '.fisioterapeutaSeccionActualizar',
            content: 'En esta sección podrás actualizar un fisioterapeuta existente.',
            placement: 'top',
        },
        {
            target: '.fisioterapeutaActualizar',
            content: 'A continuación tendrás que ingresar los datos correspondientes que son solicitados.',
            placement: 'right',
        },
        {
            target: '.FeedActividades',
            content: 'En este apartado podrás ver las actividades de actualizar que se han realizado por el rol fisioterapeutas.',
            placement: 'right',
        },
    ],
    '/dashboard/reingreso-medico': [
        {
            target: '.fisioterapeutaSeccionReingreso',
            content: 'En esta sección podrás reingresar un fisioterapeuta existente.',
            placement: 'top',
        },
        {
            target: '.fisioterapeutaReingreso',
            content: 'A continuación tendrás que ingresar los datos correspondientes que son solicitados.',
            placement: 'right',
        },
        {
            target: '.FeedActividades',
            content: 'En este apartado podrás ver las actividades de reingreso que se han realizado por el rol fisioterapeutas.',
            placement: 'right',
        },
    ],
    '/dashboard/ingresar-paciente': [
        {
            target: '.paciente',
            content: 'Esta es la sección de pacientes.',
            placement: 'top',
        },
        {
            target: '.pacienteSeccionIngreso',
            content: 'En esta sección podrás ingresar un nuevo paciente.',
            placement: 'top',
        },
        {
            target: '.pacienteIngresoSecciones',
            content: 'Tendrás la opción de ingresar un paciente por su ficha clínica y seleccionar cual se adapta mejor e ingresar cada uno de los datos solicitados',
            placement: 'right',
        },
        {
            target: '.pacienteEsquema',
            content: 'En este espacio tienes la opción de poder indicar el área afectada del paciente.',
            placement: 'top',
        }

    ],
    '/dashboard/alta-paciente': [
        {
            target: '.pacienteSeccionEliminar',
            content: 'En esta sección podrás eliminar un paciente existente.',
            placement: 'top',
        },
        {
            target: '.pacienteEliminar',
            content: 'A continuación tendrás que ingresar los datos correspondientes que son solicitados.',
            placement: 'right',
        },
        {
            target: '.FeedActividades',
            content: 'En este apartado podrás ver las actividades de eliminar que se han realizado por el rol paciente.',
            placement: 'right',
        },

    ],
    '/dashboard/reingreso-paciente': [
        {
            target: '.pacienteSeccionReingreso',
            content: 'En esta sección podrás reingresar un paciente existente.',
            placement: 'top',
        },
        {
            target: '.pacienteReingreso',
            content: 'A continuación tendrás que ingresar los datos correspondientes que son solicitados.',
            placement: 'right',
        },
        {
            target: '.FeedActividades',
            content: 'En este apartado podrás ver las actividades de eliminar que se han realizado por el rol paciente.',
            placement: 'right',
        },

    ],
    '/dashboard/calendario-citas': [
        {
            target: '.calendarioCitasPaciente',
            content: 'En esta sección podrás asignar citas a tus pacientes, además de visualizar las mismas en tu calendario personalizado.',
            placement: 'top',
        },
        {
            target: '.listaDeEspera',
            content: 'En esta sección podrás visualizar la lista de pacientes sin una cita próxima.',
            placement: 'right',
        },
        {
            target: '.`calendarioDeVisualizacion`',
            content: 'En este calendario podrás ver tus próximas citas e irlas actualizando mientras se van completando.',
            placement: 'right',
        },

    ],
};

export default tutorialStepsConfig;
