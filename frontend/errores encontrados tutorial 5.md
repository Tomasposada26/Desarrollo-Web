# Errores encontrados - Tutorial 5

Malas prácticas identificadas en el código del tutorial (implementado al pie de la letra).

## 1. Precio mal formateado

`formatToCOP` quita el "$" pero la plantilla lo vuelve a poner y agrega " COP" (`$13 COP`), y los precios en USD se formatean como si ya fueran COP, sin convertir. **Corrección:** mostrar solo `{{ formatToCOP(book.price) }}` y convertir el valor a la moneda correcta antes de formatear.

## 2. `formatToCOP` duplicada

Copiada igual en `BooksIndexView.vue` y `BooksShowView.vue`. **Corrección:** moverla a un archivo compartido (`src/utils/currency.ts` o `BookService`).

## 3. `filteredBooks` no reacciona a cambios del store

`ref` + `watch` clona el arreglo al filtrar, desconectándolo del store. Verificado: filtrando por "History" y borrando el último libro, "Sapiens" queda como fantasma en la lista. **Corrección:** usar `computed()` en vez de `ref` + `watch`.

## 4. Categorías del selector no reactivas

`selectorCategories` se calcula una sola vez; una categoría nueva no aparece hasta recargar. **Corrección:** convertirlo en `computed()`.

## 5. `OtherService` mal nombrado y ubicado

Nombre no descriptivo para lógica que pertenece a `BookService`. **Corrección:** mover `getUniqueBookCategories()` a `BookService` o renombrar el servicio.

## 6. Generación de `id` inconsistente

`BookService.createBook` usa `length + 1` (frágil); `ReviewService.createReview` usa `Math.max(...ids) + 1`. **Corrección:** unificar con `Math.max(...ids, 0) + 1`.

## 7. `isSubmitting` no protege nada

Se pone en `true`/`false` de forma síncrona sin operación async real; no evita doble envío. **Corrección:** quitarlo (o envolverlo en `try/finally` si algún día `createReview` es async).

## 8. Validación de `rating` solo en el componente

`ReviewService.createReview` acepta cualquier número. **Corrección:** mover el `Math.min(5, Math.max(1, ...))` al servicio.
