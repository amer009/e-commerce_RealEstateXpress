-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql
-- Tiempo de generación: 21-10-2024 a las 23:45:51
-- Versión del servidor: 9.0.1
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `RealStateXpress`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Compra`
--

CREATE TABLE `Compra` (
  `id_compra` int NOT NULL,
  `fecha_compra` datetime NOT NULL,
  `id_producto` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Compra`
--

INSERT INTO `Compra` (`id_compra`, `fecha_compra`, `id_producto`) VALUES
(1, '2024-10-21 00:00:00', 1),
(2, '2024-10-21 00:00:00', 2),
(3, '2024-10-21 00:00:00', 3),
(4, '2024-10-21 00:00:00', 4),
(5, '2024-10-21 00:00:00', 5),
(6, '2024-10-21 00:00:00', 1),
(7, '2024-10-21 00:00:00', 2),
(8, '2024-10-21 00:00:00', 3),
(9, '2024-10-21 00:00:00', 4),
(10, '2024-10-21 00:00:00', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Estado`
--

CREATE TABLE `Estado` (
  `id_estado` int NOT NULL,
  `tipo_estado` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Estado`
--

INSERT INTO `Estado` (`id_estado`, `tipo_estado`) VALUES
(1, 'en venta'),
(2, 'vendido'),
(3, 'en venta'),
(4, 'vendido'),
(5, 'en venta'),
(6, 'vendido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Producto`
--

CREATE TABLE `Producto` (
  `id_producto` int NOT NULL,
  `nombre_producto` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio` decimal(20,2) NOT NULL,
  `ubicacion` varchar(80) COLLATE utf8mb4_spanish_ci NOT NULL,
  `area` decimal(10,4) NOT NULL,
  `tamaño` decimal(10,4) NOT NULL,
  `imagen` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_estado` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Producto`
--

INSERT INTO `Producto` (`id_producto`, `nombre_producto`, `precio`, `ubicacion`, `area`, `tamaño`, `imagen`, `id_estado`) VALUES
(1, 'Annette Av Interlachen, FL 32148', 7.00, 'Interlachen', 9.3590, 0.2100, 'Annette-Av.png', 1),
(2, 'Annette Av Interlachen, FL 32148', 7.00, 'Interlachen', 9.3590, 0.2100, 'Annette-Av.png', 1),
(3, 'Oak Dr Riverside, CA 92506', 8.50, 'Riverside', 2.5000, 0.3000, 'Oak-Dr.png', 1),
(4, 'Pine Ave Portland, OR 97205', 5.75, 'Portland', 1.7500, 0.2500, 'Pine-Ave.png', 1),
(5, 'Cedar Ln Dallas, TX 75201', 11.00, 'Dallas', 3.0000, 0.3500, 'Cedar-Ln.png', 1),
(6, 'Annette Av Interlachen, FL 32148', 7.00, 'Interlachen', 9.3590, 0.2100, 'Annette-Av.png', 1),
(7, 'Annette Av Interlachen, FL 32148', 7.00, 'Interlachen', 9.3590, 0.2100, 'Annette-Av.png', 1),
(8, 'Oak Dr Riverside, CA 92506', 8.50, 'Riverside', 2.5000, 0.3000, 'Oak-Dr.png', 1),
(9, 'Pine Ave Portland, OR 97205', 5.75, 'Portland', 1.7500, 0.2500, 'Pine-Ave.png', 1),
(10, 'Cedar Ln Dallas, TX 75201', 11.00, 'Dallas', 3.0000, 0.3500, 'Cedar-Ln.png', 1),
(11, 'Annette Av Interlachen, FL 32148', 7.00, 'Interlachen', 9.3590, 0.2100, 'Annette-Av.png', 1),
(12, 'Annette Av Interlachen, FL 32148', 7.00, 'Interlachen', 9.3590, 0.2100, 'Annette-Av.png', 1),
(13, 'Oak Dr Riverside, CA 92506', 8.50, 'Riverside', 2.5000, 0.3000, 'Oak-Dr.png', 1),
(14, 'Pine Ave Portland, OR 97205', 5.75, 'Portland', 1.7500, 0.2500, 'Pine-Ave.png', 1),
(15, 'Cedar Ln Dallas, TX 75201', 11.00, 'Dallas', 3.0000, 0.3500, 'Cedar-Ln.png', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Rol`
--

CREATE TABLE `Rol` (
  `id_rol` int NOT NULL,
  `tipo_rol` varchar(20) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Rol`
--

INSERT INTO `Rol` (`id_rol`, `tipo_rol`) VALUES
(1, 'usuario'),
(2, 'administrador'),
(3, 'usuario'),
(4, 'administrador'),
(5, 'usuario'),
(6, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(80) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` bigint DEFAULT NULL,
  `fecha` date NOT NULL,
  `id_rol` int DEFAULT NULL,
  `id_compra` int DEFAULT NULL,
  `contraseña` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`id_usuario`, `nombre`, `email`, `telefono`, `fecha`, `id_rol`, `id_compra`, `contraseña`) VALUES
(1, 'Alfonso Hasan', 'alfonso@gmail.com', 3224564876, '2024-10-21', 1, 2, 'alF23/*2'),
(2, 'Luis Fernández', 'luis.fernandez@gmail.com', 3356789123, '2024-10-21', 2, 1, 'lF23/*5'),
(3, 'Sofía Martínez', 'sofia.martinez@gmail.com', 3223456789, '2024-10-21', 1, 5, 'sM23/*3'),
(4, 'Diego Pérez', 'diego.perez@gmail.com', 3312345679, '2024-10-21', 2, 4, 'dP23/*9'),
(5, 'Clara Ruiz', 'clara.ruiz@gmail.com', 3309876543, '2024-10-21', 1, 3, 'cR23/*8');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Compra`
--
ALTER TABLE `Compra`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `Estado`
--
ALTER TABLE `Estado`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `Producto`
--
ALTER TABLE `Producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `Rol`
--
ALTER TABLE `Rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_compra` (`id_compra`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Compra`
--
ALTER TABLE `Compra`
  MODIFY `id_compra` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `Estado`
--
ALTER TABLE `Estado`
  MODIFY `id_estado` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Producto`
--
ALTER TABLE `Producto`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `Rol`
--
ALTER TABLE `Rol`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Compra`
--
ALTER TABLE `Compra`
  ADD CONSTRAINT `Compra_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `Producto` (`id_producto`);

--
-- Filtros para la tabla `Producto`
--
ALTER TABLE `Producto`
  ADD CONSTRAINT `Producto_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `Estado` (`id_estado`);

--
-- Filtros para la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD CONSTRAINT `Usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `Rol` (`id_rol`),
  ADD CONSTRAINT `Usuario_ibfk_2` FOREIGN KEY (`id_compra`) REFERENCES `Compra` (`id_compra`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
