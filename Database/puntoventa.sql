-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-08-2023 a las 18:02:06
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `puntoventa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes enviados`
--

CREATE TABLE `mensajes enviados` (
  `id_mensaje` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes recibidos`
--

CREATE TABLE `mensajes recibidos` (
  `id_mensaje` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `contenido` varchar(500) NOT NULL,
  `fecha` date NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_clientes`
--

CREATE TABLE `tb_clientes` (
  `id_cliente` int(11) NOT NULL,
  `nom_cliente` varchar(50) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `rfc` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_clientes`
--

INSERT INTO `tb_clientes` (`id_cliente`, `nom_cliente`, `correo`, `direccion`, `telefono`, `rfc`) VALUES
(1, 'lizz', 'agar.iopoker985@gmail.com', 'CELAYA 3', '4181435821', 'RASO990221PP2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_detalle_pedidos`
--

CREATE TABLE `tb_detalle_pedidos` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_galeria`
--

CREATE TABLE `tb_galeria` (
  `id_imagen` int(11) NOT NULL,
  `titulo` varchar(20) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `imagenRuta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_materiales`
--

CREATE TABLE `tb_materiales` (
  `id_material` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL,
  `existencias` int(11) NOT NULL,
  `cantidad_minima` int(11) NOT NULL,
  `unidad` varchar(8) NOT NULL,
  `id_proveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_materiales`
--

INSERT INTO `tb_materiales` (`id_material`, `descripcion`, `existencias`, `cantidad_minima`, `unidad`, `id_proveedor`) VALUES
(1, 'pasta', 26, 10, 'bultos', 2),
(2, 'color rojo', 2, 2, 'kilo(s)', 1),
(3, 'color naranja', 4, 2, 'kilos (s', 1),
(4, 'molde juego#40', 10, 5, 'moldes', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_pedidos`
--

CREATE TABLE `tb_pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` double NOT NULL,
  `estatus` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_productos`
--

CREATE TABLE `tb_productos` (
  `id_producto` int(11) NOT NULL,
  `descripcion` varchar(30) NOT NULL,
  `tamano` varchar(8) NOT NULL,
  `color` varchar(10) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `imagen` varchar(80) NOT NULL,
  `precio_mayoreo` double NOT NULL,
  `precio_menudeo` double NOT NULL,
  `existencias` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_productos`
--

INSERT INTO `tb_productos` (`id_producto`, `descripcion`, `tamano`, `color`, `id_tipo`, `imagen`, `precio_mayoreo`, `precio_menudeo`, `existencias`) VALUES
(1, 'Maceta michoacana', 'chica', 'azul', 5, '', 150, 180, 10),
(3, 'Alcancia puerquito', 'chica', 'rosa', 3, '', 120, 240, 90),
(4, 'Juego de te 14 piezas', 'Grande', 'azul', 2, '', 250, 300, 10),
(5, 'Taza floreada con plato', 'mediano', 'blanco', 8, '', 75, 80, 30),
(6, 'salero', 'chica', 'combinado', 2, '', 50, 35, 250),
(8, 'Macetra vaso #40', 'Grande', 'combinado', 5, '', 390, 480, 80);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_proveedores`
--

CREATE TABLE `tb_proveedores` (
  `id_proveedor` int(11) NOT NULL,
  `nom_proveedor` varchar(50) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `telefono` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_proveedores`
--

INSERT INTO `tb_proveedores` (`id_proveedor`, `nom_proveedor`, `correo`, `telefono`) VALUES
(1, 'EuroColor', 'eurocolor@gmail.com', '4181818181'),
(2, 'Materiales Alejandra', 'alejandra@gmail.com', '4181827966'),
(3, 'ExpressNieto', 'gas@gmail.com', '4188778752'),
(4, 'procerama', 'procerama@gmaiul.com', '4788585862'),
(5, 'Moldes Nicolas', 'moldes@gmail.com', '6667878215');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipos`
--

CREATE TABLE `tb_tipos` (
  `id_tipo` int(11) NOT NULL,
  `tipo` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_tipos`
--

INSERT INTO `tb_tipos` (`id_tipo`, `tipo`) VALUES
(1, 'Jarrones'),
(2, 'Vajillas'),
(3, 'Decoraciones'),
(4, 'Platos'),
(5, 'Macetas'),
(6, 'Cazuelas'),
(7, 'Ollas'),
(8, 'Tazas'),
(9, 'Lamparas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nom_usuario` varchar(10) NOT NULL,
  `clave` varchar(8) NOT NULL,
  `correo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id_usuario`, `nom_usuario`, `clave`, `correo`) VALUES
(1, 'Oscar', 'linux', 'oscar@ceramica.com'),
(2, 'Maribel', 'linux', 'maribel@ceramica.com'),
(3, 'Josue', 'linux', 'josue@ceramica.com'),
(4, 'Noah', 'linux', 'noah@ceramica.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mensajes enviados`
--
ALTER TABLE `mensajes enviados`
  ADD PRIMARY KEY (`id_mensaje`);

--
-- Indices de la tabla `mensajes recibidos`
--
ALTER TABLE `mensajes recibidos`
  ADD PRIMARY KEY (`id_mensaje`);

--
-- Indices de la tabla `tb_clientes`
--
ALTER TABLE `tb_clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `tb_detalle_pedidos`
--
ALTER TABLE `tb_detalle_pedidos`
  ADD PRIMARY KEY (`id_detalle`);

--
-- Indices de la tabla `tb_galeria`
--
ALTER TABLE `tb_galeria`
  ADD PRIMARY KEY (`id_imagen`);

--
-- Indices de la tabla `tb_materiales`
--
ALTER TABLE `tb_materiales`
  ADD PRIMARY KEY (`id_material`),
  ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `tb_proveedores`
--
ALTER TABLE `tb_proveedores`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `tb_tipos`
--
ALTER TABLE `tb_tipos`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mensajes enviados`
--
ALTER TABLE `mensajes enviados`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensajes recibidos`
--
ALTER TABLE `mensajes recibidos`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_clientes`
--
ALTER TABLE `tb_clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_detalle_pedidos`
--
ALTER TABLE `tb_detalle_pedidos`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_galeria`
--
ALTER TABLE `tb_galeria`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_materiales`
--
ALTER TABLE `tb_materiales`
  MODIFY `id_material` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_pedidos`
--
ALTER TABLE `tb_pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_productos`
--
ALTER TABLE `tb_productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tb_proveedores`
--
ALTER TABLE `tb_proveedores`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_tipos`
--
ALTER TABLE `tb_tipos`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_materiales`
--
ALTER TABLE `tb_materiales`
  ADD CONSTRAINT `tb_materiales_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `tb_proveedores` (`id_proveedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
