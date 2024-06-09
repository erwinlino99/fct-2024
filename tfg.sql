-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2024 a las 00:57:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg`
--
CREATE DATABASE IF NOT EXISTS `tfg` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tfg`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `description` varchar(999) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` float NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category`, `price`, `stock`) VALUES
(2, 'Pantalones Mujer', 'Pantalón tobillero sin cierre', 'Mujer', 100, 845),
(3, 'Zapatillas Niño', 'Zapatillas deportivas de malla', 'boys', 29.99, 938),
(4, 'Vestido Mujer', 'Vestido de tirantes en punto texturizado', 'Mujer', 49.99, 15),
(5, 'Camisa Hombre', 'Camisa resort en mezcla de lino Regular Fit', 'hombre', 24.99, 31),
(9, 'Pantalon Corto', 'Pantalón corto en mezcla de lino', 'boys', 39.99, 28),
(10, 'Corbata Negra', 'Corbata de satén', 'hombre', 39.99, 23),
(11, 'Gafas Sol', 'Gafas rectangulares', 'accesorios', 8, 2),
(12, 'Bandana', 'Banda azul patron', 'accesorios', 12, 7),
(13, 'Sombrero', 'Sombrero cowboy', 'accesorios', 33, 12),
(14, 'Vestido Rib', 'Vestido Rojo', 'girls', 21, 6),
(15, 'Top Rib', 'Top rojo', 'girls', 17, 21),
(16, 'Camiseta verano', 'Camiseta Maggie Simpson', 'girls', 8, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(80) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `password_hash` varchar(128) NOT NULL,
  `domicile` varchar(999) DEFAULT NULL,
  `bornDate` date DEFAULT NULL,
  `phone` int(20) NOT NULL,
  `email` varchar(120) NOT NULL,
  `wishlist` text NOT NULL DEFAULT '[]',
  `cart` varchar(999) NOT NULL DEFAULT '{}'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `surname`, `password_hash`, `domicile`, `bornDate`, `phone`, `email`, `wishlist`, `cart`) VALUES
(1, 'Erwin', 'Lino Zabala', 'editado', 'Calle EDITADA', '1999-03-02', 9999, 'user1@example.com', '[{\"category\": \"hombre\", \"description\": \"Camisa resort en mezcla de lino Regular Fit\", \"id\": 5, \"name\": \"Camisa Hombre\", \"price\": 24.99, \"stock\": 31}, {\"category\": \"hombre\", \"description\": \"Corbata de sat\\u00e9n\", \"id\": 10, \"name\": \"Corbata Negra\", \"price\": 39.99, \"stock\": 23}]', '[{\"category\": \"boys\", \"description\": \"Pantal\\u00f3n corto en mezcla de lino\", \"id\": 9, \"name\": \"Pantalon Corto\", \"price\": 39.99, \"stock\": 28, \"times\": 1}, {\"category\": \"boys\", \"description\": \"Zapatillas deportivas de malla\", \"id\": 3, \"name\": \"Zapatillas Ni\\u00f1o\", \"price\": 29.99, \"stock\": 938, \"times\": 1}]'),
(8, 'prueba', '', 'prueba', 'C/Hola', '1999-03-22', 123456789, 's@gmail.com', '[]', '[]'),
(10, 'nuevo', '', 'nuevo', 'C/ Nueva', '1999-03-22', 643040865, 'nuevo@gmail.com', '[]', '[]');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
