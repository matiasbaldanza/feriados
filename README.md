# API feriados V1

Esta API es una demo súper básica de una API que devuelve los feriados de Argentina para los últimos 10 años.

Inicialmente, solo funciona 2024.
El repositorio de datos son archivos JSON para cada año y un archivo ref.json con información sobre los feriados.

Uso:

Por defecto una petición `GET` a `/` redirige a 
`/v1/ar/2024` (año actual)

## TODO:

Año:
GET `/v1/ar/2023` feriados de 2023

Año y mes:
GET `v1/ar/2024/04` feriados de abril 2024

## SETUP

- requiere node.js 16 y express 4.19
- `npm run build` para crear las variables de entorno por defecto
