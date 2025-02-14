## Endpoint : api/usuarios

Metodo: GET

Descripción:
Obtiene una lista de todos los usuarios registrados en el sistema.

Parámetros:
- No requiere parámetros.

Respuesta:
Retorna un Observable<User[]> con la lista de usuarios.

Ejemplo de Uso:
```typescript
usuariosService.getAllUser().subscribe(users => {
console.log('Lista de usuarios:', users);
});
```

## Endpoint: api/usuarios/:usuario/:mail

Metodo: GET

Descripción:
Obtiene la información de un usuario utilizando el nombre de usuario y el correo electrónico.

Parámetros:
- usuario (String): Nombre de usuario.
- mail (String): Correo electrónico.

Respuesta:
Retorna un Observable<User | null> con la información del usuario o null si no se encuentra.

Ejemplo de Uso:
```typescript
usuariosService.getOneUserByEmailOrUsername('juanp', 'juan@example.com').subscribe(user => {
console.log('Usuario encontrado:', user);
});
```
## Endpoint: api/usuarios/bymail/:mail

Metodo: GET

Descripción:
Obtiene la información de un usuario utilizando su correo electrónico.

Parámetros:
- mail (String): Correo electrónico del usuario.

Respuesta:
Retorna un Observable<User | null> con la información del usuario o null si no se encuentra.

Ejemplo de Uso:
```typescript
usuariosService.getOneUserByEmail('juan@example.com').subscribe(user => {
console.log('Usuario encontrado:', user);
});
```
## Endpoint: api/usuarios/:id

Metodo: GET

Descripción:
Obtiene la información de un usuario a partir de su identificador.

Método HTTP: GET
URL: /api/usuarios/{id}

Parámetros:
- id (string): Identificador único del usuario.

Respuesta:
Retorna un Observable<User> con la información del usuario.

Ejemplo de Uso:
```typescript
usuariosService.getOneUserById('1').subscribe(user => {
console.log('Usuario encontrado:', user);
});
```

## Endpoint: api/usuarios/checkusername/:username

METODO: GET
Descripción:
Verifica si un nombre de usuario ya existe en el sistema.

Parámetros:
- username (string): Nombre de usuario a verificar.

Respuesta:
Retorna un Observable<boolean> que indica si el nombre de usuario está disponible (true) o no (false).

Ejemplo de Uso:
```typescript
usuariosService.checkUsername('nuevoUsuario').subscribe(isAvailable => {
console.log('¿Nombre de usuario disponible?', isAvailable);
});
```

# Endpoint: api/usuarios/checkmail/:mail

METODO: GET
Descripción:
Verifica si un correo electrónico ya se encuentra registrado en el sistema.

Parámetros:
- mail (string): Correo electrónico a verificar.

Respuesta:
Retorna un Observable<boolean> que indica si el correo electrónico está disponible (true) o no (false).ç

Ejemplo de Uso:
```typescript
usuariosService.checkEmail('nuevo@example.com').subscribe(isAvailable => {
console.log('¿Correo electrónico disponible?', isAvailable);
});
```

## Endpoint: api/usuarios/validate/:id

METODO: POST

Descripción:
Valida si la contraseña proporcionada coincide con la contraseña actual del usuario.

Parámetros:
- id (string): Identificador del usuario.
- password (string): Contraseña a validar, enviada en el cuerpo de la solicitud.

Respuesta:
Retorna un Observable<boolean> que indica si la contraseña es válida (true) o no (false).

Ejemplo de Uso:
```typescript
usuariosService.validatePassword('1', 'contraseñaActual').subscribe(isValid => {
console.log('¿Contraseña válida?', isValid);
});
```

## Endpoint: api/usuarios/login

Metodo: POST

Descripción:
Verifica si existe el usuario y contraseña

Parámetros:
- {user: string, password: string}

Respuesta:
Retorna un Observable<User>

Ejemplo de Uso:
```typescript
authService.login('juanp', 'miContraseña123').subscribe((usuario: User) => {
console.log('Usuario autenticado:', usuario);
});
```

## Endpoint: api/usuarios

Metodo: POST

Descripción:
Registra un nuevo usuario en el sistema.

Parámetros:
- data (FormData): Objeto que contiene la información del usuario a registrar.

Respuesta:
Retorna un Observable<User> con el usuario creado.

Ejemplo de Uso:

```typescript
const formData = new FormData();
formData.append('nombre', 'Juan Pérez');

usuariosService.addUser(formData).subscribe(user => {
console.log('Usuario creado:', user);
});

```

## Endpoint: api/usuarios/reset

Metodo: POST

Descripción:
Restablece la contraseña del usuario utilizando un token de recuperación.

Parámetros:
- token (string): Token de recuperación de contraseña.
- newPassword (string): Nueva contraseña del usuario.

Respuesta:
Retorna un Observable<any> con la confirmación del restablecimiento de la contraseña.

Ejemplo de Uso:
```typescript
recuperacionService.resetPassword('token123', 'nuevaContraseña123').subscribe(response => {
        console.log('Contraseña restablecida:', response);
});
```

## Endpoint: api/usuarios/:id

Metodo: PUT

Descripción:
Actualiza la información de un usuario existente.

Parámetros:
- user (User): Objeto que contiene los datos actualizados del usuario, incluyendo su id.

Respuesta:
Retorna un Observable<User> con la información actualizada del usuario.

Ejemplo de Uso:
```typescript
const updatedUser = { id: 1, nombre: 'Juan Actualizado', ... };
usuariosService.editUser(updatedUser).subscribe(user => {
console.log('Usuario actualizado:', user);
});
```

## Endpoint: api/usuarios/:id

Metodo: PATCH

Descripción:
Actualiza (cambia) la contraseña de un usuario.

Parámetros:
- id (string): Identificador del usuario.
- data (any): Objeto que contiene la nueva contraseña (y otros datos relevantes, si aplica).

Respuesta:
Retorna un Observable<User> con el usuario actualizado.

Ejemplo de Uso:
```typescript
const newPasswordData = { password: 'nuevaContraseña123' };
usuariosService.changePassword('1', newPasswordData).subscribe(user => {
console.log('Contraseña actualizada:', user);
});
```

## Enpoint: api/usuarios/:id

Metodo: DELETE

Descripción:
Elimina un usuario del sistema.

Parámetros:

- user (User): Objeto de usuario que debe incluir el id del usuario a eliminar.

Respuesta:
Retorna un Observable<User> con la confirmación de eliminación (usualmente el usuario eliminado).

Ejemplo de Uso:
```typescript
usuariosService.deleteUser({ id: 1, nombre: 'Juan Pérez', ... }).subscribe(user => {
console.log('Usuario eliminado:', user);
});
```

------------------------------------------------ BRANDS ------------------------------------------------------


## Endpoint: api/brands

Metodo: GET

Descripción:
Obtiene una lista de todas las marcas registradas en el sistema.

Parámetros:
- No requiere parámetros.

Respuesta:
Retorna un Observable<Brand[]> con la lista de marcas.

Ejemplo de Uso:
```typescript
brandService.getAllBrand().subscribe(brands => {
        console.log('Lista de marcas:', brands);
});
```

## Endpoint: api/brands/:id

Metodo: GET

Descripción:
Obtiene la información de una marca a partir de su identificador.

Parámetros:
- id (string): Identificador único de la marca.

Respuesta:
Retorna un Observable<Brand> con la información de la marca.

Ejemplo de Uso:
```typescript
brandService.getOneBrand('1').subscribe(brand => {
        console.log('Marca encontrada:', brand);
});
```

## Endpoint: api/brands/byname/:name

Metodo: GET

Descripción:
Obtiene la información de una marca utilizando su nombre.

Parámetros:
- name (string): Nombre de la marca.

Respuesta:
Retorna un Observable<Brand> con la información de la marca.

Ejemplo de Uso:
```typescript
brandService.getOneBrandByName('Marca Ejemplo').subscribe(brand => {
        console.log('Marca encontrada:', brand);
});
```


## Endpoint: api/brands

Metodo: POST

Descripción:
Registra una nueva marca en el sistema.

Parámetros:
- brand (Brand): Objeto que contiene la información de la marca a registrar.

Respuesta:
Retorna un Observable<Brand> con la marca creada.

Ejemplo de Uso:
```typescript
const newBrand = { nombre: 'Marca Nueva' };
brandService.addBrand(newBrand).subscribe(brand => {
        console.log('Marca creada:', brand);
});
```

## Endpoint: api/brands/:id

Metodo: PUT

Descripción:
Actualiza la información de una marca existente.

Parámetros:
- brand (Brand): Objeto que contiene los datos actualizados de la marca, incluyendo su id.

Respuesta:
Retorna un Observable<Brand> con la información actualizada de la marca.

Ejemplo de Uso:
```typescript
const updatedBrand = { id: 1, nombre: 'Marca Actualizada' };
brandService.editBrand(updatedBrand).subscribe(brand => {
        console.log('Marca actualizada:', brand);
});
```

## Endpoint: api/brands/:id

Metodo: DELETE

Descripción:
Elimina una marca del sistema.

Parámetros:
- brand (Brand): Objeto de marca que debe incluir el id de la marca a eliminar.

Respuesta:
Retorna un Observable<Brand> con la confirmación de eliminación (usualmente la marca eliminada).

Ejemplo de Uso:
```typescript
const brandToDelete = { id: 1, nombre: 'Marca a Eliminar' };
brandService.deleteBrand(brandToDelete).subscribe(brand => {
        console.log('Marca eliminada:', brand);
});
```

------------------------------------------------------------- CATEGORIES ------------------------------------------------------------

## Endpoint: api/categories

Metodo: POST

Descripción:
Agrega una nueva categoría al sistema.

Parámetros:
- category (Category): Objeto que contiene la información de la categoría a registrar.

Respuesta:
Retorna un Observable<Category> con la categoría creada.

Ejemplo de Uso:
```typescript
const newCategory = { nombre: 'Nueva Categoría' };
categoryService.addCategory(newCategory).subscribe(category => {
        console.log('Categoría creada:', category);
});
```

## Endpoint: api/categories

Metodo: GET

Descripción:
Obtiene una lista de todas las categorías registradas en el sistema.

Parámetros:
- No requiere parámetros.

Respuesta:
Retorna un Observable<Category[]> con la lista de categorías.

Ejemplo de Uso:
```typescript
categoryService.getAllCategories().subscribe(categories => {
        console.log('Lista de categorías:', categories);
});
```

## Endpoint: api/categories/:id

Metodo: GET

Descripción:
Obtiene la información de una categoría a partir de su identificador.

Parámetros:
- id (string): Identificador único de la categoría.

Respuesta:
Retorna un Observable<Category> con la información de la categoría.

Ejemplo de Uso:
```typescript
categoryService.getOneCategory('1').subscribe(category => {
        console.log('Categoría encontrada:', category);
});
```

## Endpoint: api/categories/byname/:name

Metodo: GET

Descripción:
Obtiene la información de una categoría utilizando su nombre.

Parámetros:
- name (string): Nombre de la categoría.

Respuesta:
Retorna un Observable<Category> con la información de la categoría.

Ejemplo de Uso:
```typescript
categoryService.getOneCategoryByName('Categoría Ejemplo').subscribe(category => {
        console.log('Categoría encontrada:', category);
});
```
## Endpoint: api/categories/:id

Metodo: PUT

Descripción:
Actualiza la información de una categoría existente.

Parámetros:
- category (Category): Objeto que contiene los datos actualizados de la categoría, incluyendo su id.

Respuesta:
Retorna un Observable<Category> con la información actualizada de la categoría.

Ejemplo de Uso:
```typescript
const updatedCategory = { id: '1', nombre: 'Categoría Actualizada' };
categoryService.editCategory(updatedCategory).subscribe(category => {
        console.log('Categoría actualizada:', category);
});
```

## Endpoint: api/categories/:id

Metodo: DELETE

Descripción:
Elimina una categoría del sistema.

Parámetros:
- id (string): Identificador único de la categoría a eliminar.

Respuesta:
Retorna un Observable<Category> con la confirmación de eliminación (usualmente la categoría eliminada).

Ejemplo de Uso:
```typescript
categoryService.deleteCategory({ id: '1' }).subscribe(category => {
        console.log('Categoría eliminada:', category);
});
```

-------------------------------------------------------- COMPRA -------------------------------------------------

## Endpoint: api/compras

Metodo: GET

Descripción:
Obtiene una lista de todas las compras registradas en el sistema.

Parámetros:
- No requiere parámetros.

Respuesta:
Retorna un Observable<Compra[]> con la lista de compras.

Ejemplo de Uso:
```typescript
compraService.getAllCompra().subscribe(compras => {
        console.log('Lista de compras:', compras);
});
```

## Endpoint: api/compras/byuser/:userId

Metodo: GET

Descripción:
Obtiene una lista de todas las compras realizadas por un usuario específico.

Parámetros:
- userId (string): Identificador único del usuario.

Respuesta:
Retorna un Observable<Compra[]> con la lista de compras del usuario.

Ejemplo de Uso:
```typescript
compraService.getAllCompraByUser('userId123').subscribe(compras => {
        console.log('Lista de compras del usuario:', compras);
});
```

## Endpoint: api/compras

Metodo: POST

Descripción:
Agrega una nueva compra al sistema.

Parámetros:
- idComprador (string): Identificador único del comprador.
- idVehiculo (string): Identificador único del vehículo.
- fechaCancelacion (Date | null): Fecha de cancelación de la compra (opcional, puede ser null).

Respuesta:
Retorna un Observable<Compra> con la compra creada.

Ejemplo de Uso:
```typescript
compraService.addCompra('idComprador123', 'idVehiculo456').subscribe(compra => {
        console.log('Compra creada:', compra);
});
```

## Endpoint: api/compras/confirmarCompra

Metodo: POST

Descripción:
Confirma una compra enviando un correo electrónico al destinatario.

Parámetros:
- mail (string): Correo electrónico del destinatario.
- id (string): Identificador único de la compra.

Respuesta:
Retorna un Observable<Compra> con la confirmación de la compra.

Ejemplo de Uso:
```typescript
compraService.confirmarCompra('correo@example.com', 'compraId123').subscribe(compra => {
        console.log('Compra confirmada:', compra);
});
```

## Endpoint: api/compras/avisoCompraExitosa

Metodo: POST

Descripción:
Envía un aviso de compra exitosa al correo electrónico del destinatario.

Parámetros:
- mail (string): Correo electrónico del destinatario.

Respuesta:
Retorna un Observable<Compra> con la confirmación del aviso.

Ejemplo de Uso:
```typescript
compraService.avisoCompraExitosa('correo@example.com').subscribe(compra => {
        console.log('Aviso de compra exitosa enviado:', compra);
});
```

## Endpoint: api/compras/cancelarCompra

Metodo: DELETE

Descripción:
Cancela una compra existente.

Parámetros:
- compra (Compra): Objeto de compra que debe incluir el id de la compra a cancelar.

Respuesta:
Retorna un Observable<Compra> con la confirmación de cancelación (usualmente la compra cancelada).

Ejemplo de Uso:
```typescript
const compraACancelar = { id: 'compraId123', ... };
compraService.cancelarCompra(compraACancelar).subscribe(compra => {
        console.log('Compra cancelada:', compra);
});
```

-------------------------------------------------------- RECUPERACIÓN DE CONTRASEÑA -------------------------------------------------

## Endpoint: api/recuperacion

Metodo: POST

Descripción:
Envía un correo electrónico de recuperación de contraseña al destinatario.

Parámetros:
- destinatario (string): Correo electrónico del destinatario.

Respuesta:
Retorna un Observable<any> con la confirmación del envío del correo.

Ejemplo de Uso:
```typescript
recuperacionService.sendRecoveryEmail('correo@example.com').subscribe(response => {
        console.log('Correo de recuperación enviado:', response);
});
```


-------------------------------------------------------- CALIFICACIONES -------------------------------------------------

## Endpoint: api/calificaciones/:userId

Metodo: GET

Descripción:
Obtiene una lista de todas las calificaciones realizadas por un usuario específico.

Parámetros:
- userId (string): Identificador único del usuario.

Respuesta:
Retorna un Observable<Qualification[]> con la lista de calificaciones del usuario.

Ejemplo de Uso:
```typescript
qualificationsService.getQualificationsByUserId('userId123').subscribe(calificaciones => {
        console.log('Lista de calificaciones del usuario:', calificaciones);
});
```


## Endpoint: api/calificaciones/:userId/:rentId

Metodo: GET

Descripción:
Verifica si una calificación ya existe para un usuario y un alquiler específicos.

Parámetros:
- userId (string): Identificador único del usuario.
- rentId (string): Identificador único del alquiler.

Respuesta:
Retorna un Observable<boolean> que indica si la calificación existe (true) o no (false).

Ejemplo de Uso:
```typescript
qualificationsService.checkQualificationExists('userId123', 'rentId456').subscribe(exists => {
        console.log('¿Calificación existe?', exists);
});
```

## Endpoint: api/calificaciones

Metodo: POST

Descripción:
Crea una nueva calificación en el sistema.

Parámetros:
- qualification (Qualification): Objeto que contiene la información de la calificación a registrar.

Respuesta:
Retorna un Observable<Qualification> con la calificación creada.

Ejemplo de Uso:
```typescript
const newQualification = { userId: 'userId123', rentId: 'rentId456', score: 5, comment: 'Excelente servicio' };
qualificationsService.createQualification(newQualification).subscribe(qualification => {
        console.log('Calificación creada:', qualification);
});
```


-------------------------------------------------------- ALQUILER -------------------------------------------------

## Endpoint: api/rents

Metodo: GET

Descripción:
Obtiene una lista de todos los alquileres registrados en el sistema.

Parámetros:
- No requiere parámetros.

Respuesta:
Retorna un Observable<Rent[]> con la lista de alquileres.

Ejemplo de Uso:
```typescript
rentService.getAllRents().subscribe(rents => {
        console.log('Lista de alquileres:', rents);
});
```

## Endpoint: api/rents/vehiculo/:id

Metodo: GET

Descripción:
Obtiene una lista de todos los alquileres de un vehículo específico.

Parámetros:
- id (string): Identificador único del vehículo.

Respuesta:
Retorna un Observable<Rent[]> con la lista de alquileres del vehículo.

Ejemplo de Uso:
```typescript
rentService.getRentsByVehicle('vehiculoId123').subscribe(rents => {
        console.log('Lista de alquileres del vehículo:', rents);
});
```

## Endpoint: api/rents/usuario/:id

Metodo: GET

Descripción:
Obtiene una lista de todos los alquileres realizados por un usuario específico.

Parámetros:
- id (string): Identificador único del usuario.

Respuesta:
Retorna un Observable<Rent[]> con la lista de alquileres del usuario.

Ejemplo de Uso:
```typescript
rentService.getRentsByUser('usuarioId123').subscribe(rents => {
        console.log('Lista de alquileres del usuario:', rents);
});
```

## Endpoint: api/rents/:id

Metodo: GET

Descripción:
Obtiene la información de un alquiler a partir de su identificador.

Parámetros:
- id (string): Identificador único del alquiler.

Respuesta:
Retorna un Observable<Rent> con la información del alquiler.

Ejemplo de Uso:
```typescript
rentService.getOneRent('alquilerId123').subscribe(rent => {
        console.log('Alquiler encontrado:', rent);
});
```

## Endpoint: api/rents

Metodo: POST

Descripción:
Agrega un nuevo alquiler al sistema.

Parámetros:
- rent (Rent): Objeto que contiene la información del alquiler a registrar.

Respuesta:
Retorna un Observable<Rent> con el alquiler creado.

Ejemplo de Uso:
```typescript
const newRent = { vehiculoId: 'vehiculoId123', usuarioId: 'usuarioId123', fechaInicio: '2023-01-01', fechaFin: '2023-01-10' };
rentService.addRent(newRent).subscribe(rent => {
        console.log('Alquiler creado:', rent);
});
```

## Endpoint: api/rents/confirmarAlquiler

Metodo: POST

Descripción:
Confirma un alquiler enviando un correo electrónico al destinatario.

Parámetros:
- mail (string): Correo electrónico del destinatario.
- id (number): Identificador único del alquiler.

Respuesta:
Retorna un Observable<Rent> con la confirmación del alquiler.

Ejemplo de Uso:
```typescript
rentService.confirmRent('correo@example.com', 123).subscribe(rent => {
        console.log('Alquiler confirmado:', rent);
});
```
## Endpoint: api/rents/:id

Metodo: PUT

Descripción:
Actualiza la información de un alquiler existente.

Parámetros:
- rent (Rent): Objeto que contiene los datos actualizados del alquiler, incluyendo su id.

Respuesta:
Retorna un Observable<Rent> con la información actualizada del alquiler.

Ejemplo de Uso:
```typescript
const updatedRent = { id: 'alquilerId123', vehiculoId: 'vehiculoId123', usuarioId: 'usuarioId123', fechaInicio: '2023-01-01', fechaFin: '2023-01-15' };
rentService.editRent(updatedRent).subscribe(rent => {
        console.log('Alquiler actualizado:', rent);
});
```

## Endpoint: api/rents/cancelar/:id

Metodo: PUT

Descripción:
Cancela un alquiler existente.

Parámetros:
- rent (Rent): Objeto de alquiler que debe incluir el id del alquiler a cancelar.

Respuesta:
Retorna un Observable<Rent> con la confirmación de cancelación (usualmente el alquiler cancelado).

Ejemplo de Uso:
```typescript
const rentToCancel = { id: 'alquilerId123', ... };
rentService.cancelRent(rentToCancel).subscribe(rent => {
        console.log('Alquiler cancelado:', rent);
});
```

## Endpoint: api/rents/:id

Metodo: DELETE

Descripción:
Elimina un alquiler del sistema.

Parámetros:
- rent (Rent): Objeto de alquiler que debe incluir el id del alquiler a eliminar.

Respuesta:
Retorna un Observable<Rent> con la confirmación de eliminación (usualmente el alquiler eliminado).

Ejemplo de Uso:
```typescript
const rentToDelete = { id: 'alquilerId123', ... };
rentService.deleteRent(rentToDelete).subscribe(rent => {
        console.log('Alquiler eliminado:', rent);
});
```





-------------------------------------------------------- ROLES -------------------------------------------------


## Endpoint: api/roles

Metodo: GET

Descripción:
Obtiene una lista de todos los roles registrados en el sistema.

Parámetros:
No requiere parámetros.

Respuesta:
Retorna un Observable<Rol[]> con la lista de roles.

Ejemplo de Uso:
```typescript
rolService.getAllRol().subscribe(roles => {
        console.log('Lista de roles:', roles);
});
```

## Endpoint: api/roles/byname/:name

Metodo: GET

Descripción:
Obtiene la información de un rol utilizando su nombre.

Parámetros:
- name (string): Nombre del rol.

Respuesta:
Retorna un Observable<Rol> con la información del rol.

Ejemplo de Uso:
```typescript
rolService.getOneRolByName('Admin').subscribe(rol => {
        console.log('Rol encontrado:', rol);
});
```

## Endpoint: api/roles/:id

Metodo: GET

Descripción:
Obtiene la información de un rol a partir de su identificador.

Parámetros:
- id (string): Identificador único del rol.

Respuesta:
Retorna un Observable<Rol> con la información del rol.

Ejemplo de Uso:
```typescript
rolService.getOneRol('rolId123').subscribe(rol => {
        console.log('Rol encontrado:', rol);
});
```

## Endpoint: api/roles

Metodo: POST

Descripción:
Agrega un nuevo rol al sistema.

Parámetros:
- rolData (Rol): Objeto que contiene la información del rol a registrar.

Respuesta:
Retorna un Observable<Rol> con el rol creado.

Ejemplo de Uso:
```typescript
const newRol = { nombre: 'Nuevo Rol' };
rolService.addRol(newRol).subscribe(rol => {
        console.log('Rol creado:', rol);
});
```

## Endpoint: api/roles/:id

Metodo: PUT

Descripción:
Actualiza la información de un rol existente.

Parámetros:
- rol (Rol): Objeto que contiene los datos actualizados del rol, incluyendo su id.

Respuesta:
Retorna un Observable<Rol> con la información actualizada del rol.

Ejemplo de Uso:
```typescript
const updatedRol = { id: 'rolId123', nombre: 'Rol Actualizado' };
rolService.editRol(updatedRol).subscribe(rol => {
        console.log('Rol actualizado:', rol);
});
```

## Endpoint: api/roles/:id

Metodo: DELETE

Descripción:
Elimina un rol del sistema.

Parámetros:
- rol (Rol): Objeto de rol que debe incluir el id del rol a eliminar.

Respuesta:
Retorna un Observable<Rol> con la confirmación de eliminación (usualmente el rol eliminado).

Ejemplo de Uso:
```typescript
const rolToDelete = { id: 'rolId123', nombre: 'Rol a Eliminar' };
rolService.deleteRol(rolToDelete).subscribe(rol => {
        console.log('Rol eliminado:', rol);
});
```

-------------------------------------------------------- VEHÍCULOS -------------------------------------------------


## Endpoint: api/vehicles

Metodo: GET

Descripción:
Obtiene una lista de todos los vehículos registrados en el sistema.

Parámetros:
No requiere parámetros.

Respuesta:
Retorna un Observable<Vehicle[]> con la lista de vehículos.

Ejemplo de Uso:
```typescript
vehicleService.getAllVehicle().subscribe(vehicles => {
        console.log('Lista de vehículos:', vehicles);
});
```

## Endpoint: api/vehicles/user/:id

Metodo: GET

Descripción:
Obtiene una lista de todos los vehículos registrados por un usuario específico.

Parámetros:
- id (string): Identificador único del usuario.

Respuesta:
Retorna un Observable<Vehicle[]> con la lista de vehículos del usuario.

Ejemplo de Uso:
```typescript
vehicleService.getAllVehicleByUser('userId123').subscribe(vehicles => {
        console.log('Lista de vehículos del usuario:', vehicles);
});
```

## Endpoint: api/vehicles/:id

Metodo: GET

Descripción:
Obtiene la información de un vehículo a partir de su identificador.

Parámetros:
- id (string): Identificador único del vehículo.

Respuesta:
Retorna un Observable<Vehicle> con la información del vehículo.

Ejemplo de Uso:
```typescript
vehicleService.getOneVehicle('vehicleId123').subscribe(vehicle => {
        console.log('Vehículo encontrado:', vehicle);
});
```

## Endpoint: api/vehicles

Metodo: POST

Descripción:
Agrega un nuevo vehículo al sistema.

Parámetros:
- formData (FormData): Objeto que contiene la información del vehículo a registrar.

Respuesta:
Retorna un Observable<Vehicle> con el vehículo creado.

Ejemplo de Uso:
```typescript
const formData = new FormData();
formData.append('marca', 'Toyota');
formData.append('modelo', 'Corolla');
formData.append('año', '2021');
vehicleService.addVehicle(formData).subscribe(vehicle => {
        console.log('Vehículo creado:', vehicle);
});
```

## Endpoint: api/vehicles/:id

Metodo: PUT

Descripción:
Actualiza la información de un vehículo existente.

Parámetros:
- vehicle (Vehicle): Objeto que contiene los datos actualizados del vehículo, incluyendo su id.

Respuesta:
Retorna un Observable<Vehicle> con la información actualizada del vehículo.

Ejemplo de Uso:
```typescript
const updatedVehicle = { id: 'vehicleId123', marca: 'Toyota', modelo: 'Corolla', año: '2022' };
vehicleService.editVehicle(updatedVehicle).subscribe(vehicle => {
        console.log('Vehículo actualizado:', vehicle);
});
```

## Endpoint: api/vehicles/:id

Metodo: DELETE

Descripción:
Elimina un vehículo del sistema.

Parámetros:
- vehicle (Vehicle): Objeto de vehículo que debe incluir el id del vehículo a eliminar.

Respuesta:
Retorna un Observable<Vehicle> con la confirmación de eliminación (usualmente el vehículo eliminado).

Ejemplo de Uso:
```typescript
const vehicleToDelete = { id: 'vehicleId123', marca: 'Toyota', modelo: 'Corolla' };
vehicleService.deleteVehicle(vehicleToDelete).subscribe(vehicle => {
        console.log('Vehículo eliminado:', vehicle);
});
```