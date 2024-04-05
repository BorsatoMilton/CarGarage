# Integrantes
51394 - Arach, Mateo Simon

51391 - Borsato, Milton Ruben

51508 - Dayer, Jose Ignacio

51745 - Marchese, Valentin David

# Enunciado

SvS es un sitio destinado a la subasta y comercio electrónico de productos a través de internet. Es utilizado para comprar y vender artículos. Las subastas utilizan un sistema de subasta. Compradores y vendedores pueden valorarse y evaluarse mutuamente después de cada transacción, lo que da lugar a un sistema de reputación. El servicio SvS es accesible a través de sitios web y aplicaciones móviles.

<table>
<thead>
<tr>
<th align="left">Req</th>
<th align="left">Detalle</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">CRUD simple</td>
<td align="left">1. CRUD Tipo Habitacion<br>2. CRUD Servicio<br>3. CRUD Localidad</td>
</tr>
<tr>
<td align="left">CRUD dependiente</td>
<td align="left">1. CRUD Habitación {depende de} CRUD Tipo Habitacion<br>2. CRUD Cliente {depende de} CRUD Localidad</td>
</tr>
<tr>
<td align="left">Listado<br>+<br>detalle</td>
<td align="left">1. Listado de habitaciones filtrado por tipo de habitación, muestra nro y tipo de habitación =&gt; detalle CRUD Habitacion<br> 2. Listado de reservas filtrado por rango de fecha, muestra nro de habitación, fecha inicio y fin estadía, estado y nombre del cliente =&gt; detalle muestra datos completos de la reserva y del cliente</td>
</tr>
<tr>
<td align="left">CUU/Epic</td>
<td align="left">1. Reservar una habitación para la estadía<br>2. Realizar el check-in de una reserva</td>
</tr>
</tbody>
</table>

