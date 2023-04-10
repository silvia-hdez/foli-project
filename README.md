# foli-project

## HOW TO RUN
### Populate database: 
`npm run seedPlants`

### Populate database with local JSON: 
`npm run seedPlantsLocal`

### Run API dev
`npm run dev`

### Run API in prod
`npm run start`


## TODO
- Verificar que el userName y el teléfono no existen.
- Meter foto al usuario. Modificar el perfil. 
En la ruta de editar perfil, meter 'upload.single('image')
- Hacer Logout
- Lógicas para hacer el guardado de las fichas de plantas

## PROBLEMAS
- No se enlaza cloudinary


## MEJORAR
- Volver a llamar a la API, sacarme todos los días un JSON y que incluya todas las caracterísitcas (incluir other names y el ID)
- Meter todos los JSON en uno y luego no visualizar los que no tienen foto ni los que están repetidos.