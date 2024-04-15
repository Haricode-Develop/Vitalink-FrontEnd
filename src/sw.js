import { precacheAndRoute } from 'workbox-precaching';

// Esto inyecta la lista de archivos a precachear por Workbox en el build
precacheAndRoute(self.__WB_MANIFEST);
