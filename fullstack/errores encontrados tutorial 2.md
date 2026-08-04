# Errores encontrados - Tutorial 2

Este documento resumo los errores identificados y las correcciones realizadas durante el desarrollo del tutorial.

## 1. Inconsistencia en el atributo `category`

**Problema:** El modelo utilizaba `Category`, mientras que las vistas accedían al atributo como `category`, provocando que el valor apareciera como `undefined`.

**Corrección:** Renombré el atributo a `category` para mantener una convención consistente en todo el proyecto.

---

## 2. Formato incorrecto de precios

**Problema:** Los precios se mostraban sin dos decimales (por ejemplo, `$45` en lugar de `$45.00`).

**Corrección:** Implementé el método `getFormattedPrice()` utilizando `toLocaleString()` con dos decimales y reutilicé ese método en las vistas.

---

## 3. Todas las imágenes eran iguales

**Problema:** Todos los libros utilizaban la misma imagen.

**Corrección:** Implementé el método `getImageUrl()` utilizando el `id` del libro como semilla para generar una imagen diferente para cada uno.

---

## 4. Nombre del archivo con distinta capitalización

**Problema:** El archivo se llamaba `Books.ts`, mientras que los imports utilizaban `books.ts`, lo que puede generar errores en sistemas Linux.

**Corrección:** Renombré el archivo a `books.ts` para mantener consistencia entre el nombre del archivo y los imports.

---

## 5. El listado de libros no enviaba `viewData`

**Problema:** La vista del listado no recibía `viewData`, por lo que el título de la página no se mostraba correctamente.

**Corrección:** Modifiqué el controlador para enviar `{ viewData }`, siguiendo el mismo patrón utilizado en las demás vistas.

---

## 6. El detalle del libro no enviaba `viewData`

**Problema:** La vista de detalle solo recibía el objeto `book`, impidiendo que el título del layout se mostrara correctamente.

**Corrección:** Agregué `viewData` incluyendo el título y el libro correspondiente.

---

## 7. Nombre del método inconsistente

**Problema:** El método `Main_Point` no seguía la convención *camelCase* utilizada en el resto del controlador.

**Corrección:** Lo renombré a `list` y actualicé la ruta correspondiente, manteniendo la URL solicitada por el tutorial.

---

## 8. Uso de `any`

**Problema:** Algunos métodos utilizaban `any` para los parámetros `Request` y `Response`, perdiendo las ventajas del tipado de TypeScript.

**Corrección:** Reemplacé `any` por los tipos `Request` y `Response` de Express.

---

## 9. Falta de manejo de errores

**Problema:** Solicitar un libro inexistente producía un error interno del servidor.

**Corrección:** Implementé un bloque `try/catch` para responder con un error **404** cuando el libro no existe.

---

## 10. Validación del parámetro `id`

**Problema:** El parámetro `id` no validaba valores inválidos antes de realizar la búsqueda.

**Corrección:** Utilicé `parseInt(..., 10)` y validé el resultado antes de buscar el libro.

---

## 11. Ruta poco descriptiva

**Observación:** La ruta `/main-point` no representa claramente el listado de libros.

**Acción:** Se mantuvo sin cambios por ser un requisito del tutorial; en un proyecto real sería recomendable utilizar `/books`.

---

## 12. Compilación de Tailwind CSS

**Observación:** Los cambios en los estilos no se reflejan si `npm run dev:css` no está ejecutándose.

**Acción:** No corresponde a un error del código, sino al proceso de desarrollo.

---

# Pruebas realizadas

- Se verificó el listado de libros.
- Se comprobó la visualización correcta de la categoría.
- Se validó el formato de precios con dos decimales.
- Se confirmó que cada libro muestra una imagen diferente.
- Se verificó la vista de detalle de un libro.
- Se comprobó que las rutas con IDs inexistentes o inválidos respondan con un error **404**.

---

No se utilizaron librerías adicionales. Todas las correcciones se realizaron reorganizando y mejorando el código existente.
