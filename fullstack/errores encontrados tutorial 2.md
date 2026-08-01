# Errores encontrados - Tutorial 2

Este documento es parte de la tarea del tutorial 2, donde el reto era encontrar los +10 errores que introdujeron a propósito en el código de la parte de libros (modelo, "base de datos", controlador, rutas y vistas) y se pedia armar una versión mejorada sin usar librerías nuevas, solo organizando mejor lo que ya había.

Fui revisando modelo por modelo, vista por vista, y esto fue lo que encontré:

**1. La categoría no se veía en ninguna vista**

En el modelo `Book.ts` el campo se llama `Category` con mayúscula, pero en `books.ejs` y en `show.ejs` lo estaban leyendo como `book.category` en minúscula. Como en JS/TS eso sí importa (mayúscula ≠ minúscula), siempre daba `undefined` y por eso el tag de categoría salía vacío tanto en las tarjetas como en el detalle. Lo arreglé dejando todo en minúscula (`category`), igual que `id`, `title`, `price` y `stock`, así no queda ese campo raro que no combina con los demás.

**2. Los precios se veían mal ($45 en vez de $45.00)**

Esto lo noté comparando con las imágenes del tutorial: ahí también sale "$45" y "$18.5" en vez de "$45.00" y "$18.50". El problema es que usaban `toLocaleString()` a secas, sin decirle que mantenga los dos decimales, entonces si el precio es "redondo" JS se come los ceros. Le agregué un método `getFormattedPrice()` al modelo que usa `toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })` y ahora sí siempre muestra los dos decimales. De paso dejé esa lógica en un solo lugar en vez de repetirla en las dos vistas.

**3. Todos los libros tenían la misma foto**

La imagen era literal la misma URL fija (`picsum.photos/seed/picsum/...`) para cualquier libro, entonces Gatsby, Clean Code y Sapiens mostraban la misma montaña. Le puse un método `getImageUrl()` al modelo que arma la URL usando el `id` del libro como semilla, así cada uno tiene su propia imagen (sigue siendo un placeholder random, pero al menos varía).

**4. El archivo de datos tenía mal el nombre**

Este fue el más raro de encontrar porque en mi compu ni se notaba: el archivo se llamaba `Books.ts` (con B mayúscula) pero en todos los imports lo llamaban `../data/books.js` (con b minúscula). En Windows funciona igual porque no distingue mayúsculas en los nombres de archivo, pero si eso se sube a un servidor Linux o se corre en Docker, se rompe porque ahí sí importa la mayúscula. Lo renombré a `books.ts` en minúscula para que quede bien en cualquier sistema.

**5. y 6. El título de la página no aparecía ni en el listado ni en el detalle**

Estos dos los agrupo porque es básicamente el mismo error en dos lugares. En `index`, `about` y `contact` el controlador manda los datos como `res.render(vista, { viewData: viewData })`, pero en el método que lista los libros lo mandaban directo (`res.render('home/books', viewData)`, sin el `{ viewData: ... }`), y en el método `show` directamente mandaban `{ book: book }` sin `viewData` para nada. Como el layout revisa si existe `viewData` para mostrar el título del header, en esas dos páginas el título quedaba siempre en blanco. Arreglé los dos métodos para que sigan el mismo patrón que los demás: arman su `viewData` con `title` (y `books` o `book` adentro) y lo mandan igual que el resto.

**7. El método `Main_Point` no pegaba con el resto**

Los demás métodos del controlador se llaman `index`, `about`, `contact` — todo en camelCase normal. Este se llamaba `Main_Point`, con mayúscula y guion bajo, y quedaba raro al lado de los otros. Lo cambié a `list` (que además describe mejor lo que hace) y actualicé la ruta en `Routes.ts`. La URL `/main-point` la dejé tal cual porque el tutorial la pide explícitamente así.

**8. Usaban `any` en vez de los tipos de Express**

Los métodos nuevos (`Main_Point` y `show`) tenían `res: any` y hasta `req: any`, mientras que el resto del controlador usa `Request` y `Response` de Express. Eso hace que TypeScript deje de revisar esos métodos, que es justo lo contrario de para qué se usa TypeScript. Les puse los tipos correctos.

**9. Si pedías un libro que no existe, se caía el servidor**

`Book.findById` tira un `Error` si no encuentra el id, pero nadie lo estaba atrapando. Probé entrando a `/books/99` y efectivamente Express respondía con un error 500 feo en vez de algo más decente. Le puse un `try/catch` alrededor y ahora si no encuentra el libro responde `404` con un mensaje simple.

**10. El id de la ruta no se validaba**

`parseInt(req.params.id)` estaba sin la base (radix) y sin revisar si daba `NaN` (por ejemplo entrando a `/books/abc`). Lo dejé como `parseInt(req.params.id ?? '', 10)`, y si igual da `NaN`, cae en el mismo catch del punto anterior y muestra el 404 en vez de romperse.

**11. `/main-point` es un nombre raro para "ver todos los libros"**

Este no lo "arreglé" porque el tutorial pide esa ruta tal cual, pero sí lo anoto como algo que no tiene mucho sentido: el detalle de un libro está en `/books/:id` (que sí es una ruta normal) y el listado está en `/main-point`, que no tiene nada que ver con libros. Si no fuera un requisito de la guía, lo lógico sería que el listado estuviera en `/books`.

**12. Bonus: el CSS no se actualiza solo**

Esto no es un error del código, pero me hizo perder como 10 minutos: si edito una vista y no tengo corriendo `npm run dev:css` en otra terminal, Tailwind no regenera el `style.css` y la página se ve toda fea y en una sola columna. No es nada que se "arregle" en el código, solo hay que acordarse de dejar las dos terminales abiertas.

---

Cómo lo probé: levanté la app con `npm run dev`, entré a `/main-point` y revisé que salga el título, la categoría, el precio con dos decimales y que cada libro tenga su imagen. Después entré a `/books/1` para ver el detalle, y a `/books/99` y `/books/abc` para confirmar que ahora dan 404 en vez de tumbar el servidor.

No usé ninguna librería nueva para nada de esto, solo reorganicé lo que ya estaba.
