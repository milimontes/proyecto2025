/**
 * Interfaz que define la estructura de un producto en el sistema.
 * Utilizada para tipado estático y validación de datos de productos.
 */
export interface Producto {
    /**
     * Identificador único del producto en formato string.
     * @example "prod-123456"
     */
    idProducto: string;

    /**
     * Nombre comercial del producto.
     * @example "Smartphone Galaxy S23"
     */
    nombre: string;

    /**
     * Precio del producto en formato numérico (se recomienda usar decimales para valores exactos).
     * @example 799.99
     */
    precio: number;

    /**
     * Descripción detallada del producto y sus características.
     * @example "Teléfono con pantalla AMOLED de 6.1 pulgadas, 256GB almacenamiento"
     */
    descripcion: string;

    /**
     * Categoría a la que pertenece el producto (usado para filtros y organización).
     * @example "Electrónicos"
     */
    categoria: string;

    /**
     * URL de la imagen principal del producto.
     * @example "https://ejemplo.com/imgs/galaxy-s23.jpg"
     */
    imagen: string;

    /**
     * Texto alternativo para accesibilidad web (SEO y tecnologías asistivas).
     * @example "Fotografía del Galaxy S23 en color negro"
     */
    alt: string;
}