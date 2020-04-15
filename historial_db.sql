-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-04-2020 a las 21:39:49
-- Versión del servidor: 5.7.29-0ubuntu0.18.04.1
-- Versión de PHP: 5.6.40-26+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `historial_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ANTECEDENTES_FAMILIARES`
--

CREATE TABLE `ANTECEDENTES_FAMILIARES` (
  `ID` int(11) NOT NULL,
  `HTA` tinyint(1) NOT NULL,
  `IAM` tinyint(1) NOT NULL,
  `ACV_AIT` tinyint(1) NOT NULL,
  `DISLIPEMIA` tinyint(1) NOT NULL,
  `DIABETES` tinyint(1) NOT NULL,
  `ENF_CELIACA` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CIRCULATORIO`
--

CREATE TABLE `CIRCULATORIO` (
  `ID` int(11) NOT NULL,
  `ACV_AIT` tinyint(1) NOT NULL,
  `AIM` tinyint(1) NOT NULL,
  `ANGIOPLASTIA_BYPASS` tinyint(1) NOT NULL,
  `ECG` tinyint(1) NOT NULL,
  `ECODOPPLER` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `COMPLICACIONES_AGUDAS_DE_DIABETES`
--

CREATE TABLE `COMPLICACIONES_AGUDAS_DE_DIABETES` (
  `ID` int(11) NOT NULL,
  `TUVO_EPISODIOS` tinyint(1) NOT NULL,
  `CANTIDAD_EPISODIOS_ULTIMO_ANIO` int(11) NOT NULL,
  `HIPOGLUCEMIA_SEVERAS` int(11) NOT NULL,
  `CETOACIDOSIS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CONDUCTAS_MEDICAS`
--

CREATE TABLE `CONDUCTAS_MEDICAS` (
  `ID` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `OBSERVACION` int(11) NOT NULL,
  `ID_PACIENTE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DATOS_CLINICOS`
--

CREATE TABLE `DATOS_CLINICOS` (
  `ID` int(11) NOT NULL,
  `TABACO` int(11) NOT NULL,
  `PESO` float NOT NULL,
  `IMC` float NOT NULL,
  `TENSION_ARTERIAL` float NOT NULL,
  `PERIMETRO_CINTURA` float NOT NULL,
  `EXAMEN_PIES` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DATOS_DE_LABORATORIO`
--

CREATE TABLE `DATOS_DE_LABORATORIO` (
  `ID` int(11) NOT NULL,
  `GLUCEMIA` float NOT NULL,
  `HBA1C` float NOT NULL,
  `GOT` float NOT NULL,
  `GPT` float NOT NULL,
  `FAL` float NOT NULL,
  `COLESTEROL_TOTAL` float NOT NULL,
  `HDL` float NOT NULL,
  `LD` float NOT NULL,
  `TRIGLIC` float NOT NULL,
  `CLEARENCE_CREAT` float NOT NULL,
  `CREATININA` float NOT NULL,
  `ESTADIO` float NOT NULL,
  `PROT` float NOT NULL,
  `CREATININURIA` float NOT NULL,
  `MICROALBUMINURIA` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DEPARTAMENTO`
--

CREATE TABLE `DEPARTAMENTO` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `DEPARTAMENTO`
--

INSERT INTO `DEPARTAMENTO` (`ID`, `DESCRIPCION`) VALUES
(1, 'DR. MANUEL BELGRANO'),
(2, 'SAN PEDRO DE JUJUY'),
(3, 'LEDESMA'),
(4, 'PALPA'),
(5, 'PERICO'),
(10, 'SUSQUES');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DIAGNOSTICOS`
--

CREATE TABLE `DIAGNOSTICOS` (
  `ID` int(11) NOT NULL,
  `GLUCEMIA_ALTERADA_EN_AYUNAS` tinyint(1) NOT NULL,
  `TOLERANCIA_GLUCOSA_ALTERADA` tinyint(1) NOT NULL,
  `DIABETES` tinyint(1) NOT NULL,
  `DIABETES_TIEMPO_EVOLUCION` int(11) NOT NULL,
  `DIABETES_TIPO` int(11) NOT NULL,
  `DIABETES_SEMANAS_GESTACION` int(11) NOT NULL,
  `HIPERTENCION_ARTERIAL` tinyint(1) NOT NULL,
  `HIPERTENSION_ARTERIAL_TIEMPO_EVOLUCION` int(11) NOT NULL,
  `DISLIPEMIA` tinyint(1) NOT NULL,
  `PRECLASIFICACION_RCVG` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ENFERMEDADES_ASOCIADAS`
--

CREATE TABLE `ENFERMEDADES_ASOCIADAS` (
  `ID` int(11) NOT NULL,
  `ENFERMEDAD_TIROIDEA` tinyint(1) NOT NULL,
  `ENFERMEDAD_TIROIDEA_TIPO` int(11) NOT NULL,
  `TBC` tinyint(1) NOT NULL,
  `ENFERMEDAD_CELIACA` tinyint(1) NOT NULL,
  `ENFERMEDAD_REUMATICA` tinyint(1) NOT NULL,
  `ENFERMEDAD_REUMATICA_TIPO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ENFERMERIA`
--

CREATE TABLE `ENFERMERIA` (
  `ID` int(11) NOT NULL,
  `CONSEJERIA` tinyint(1) NOT NULL,
  `CURACIONES` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ESTADO_CIVIL`
--

CREATE TABLE `ESTADO_CIVIL` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(200) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ESTADO_CIVIL`
--

INSERT INTO `ESTADO_CIVIL` (`ID`, `DESCRIPCION`) VALUES
(1, 'SOLTERO'),
(2, 'CASADO'),
(3, 'U.ESTABLE'),
(4, 'OTRO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ESTUDIO`
--

CREATE TABLE `ESTUDIO` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ESTUDIO`
--

INSERT INTO `ESTUDIO` (`ID`, `DESCRIPCION`) VALUES
(1, 'NINGUNO'),
(2, 'PRIMARIO'),
(3, 'SECUNDARIO'),
(4, 'UNIVERSITARIO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EXAMEN_FISICO`
--

CREATE TABLE `EXAMEN_FISICO` (
  `ID` int(11) NOT NULL,
  `PESO` float NOT NULL,
  `TALLA` float NOT NULL,
  `IMC` float NOT NULL,
  `PERIMETRO_CINTURA` float NOT NULL,
  `TA_SISTOLICA` float NOT NULL,
  `TA_DIASTOLICA` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `FACTORES_DE_RIESGO_ASOCIADOS`
--

CREATE TABLE `FACTORES_DE_RIESGO_ASOCIADOS` (
  `ID` int(11) NOT NULL,
  `OBESIDAD` tinyint(1) NOT NULL,
  `SEDENTARISMO` tinyint(1) NOT NULL,
  `TABACO` tinyint(1) NOT NULL,
  `ALCOHOLISMO` tinyint(1) NOT NULL,
  `ANTICOAGULANTES` tinyint(1) NOT NULL,
  `CORTICOIDES` tinyint(1) NOT NULL,
  `ANTICONCEPTIVOS` tinyint(1) NOT NULL,
  `MENOSPAUSIA_PREMATURA` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `GENERO`
--

CREATE TABLE `GENERO` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `GENERO`
--

INSERT INTO `GENERO` (`ID`, `DESCRIPCION`) VALUES
(1, 'FEMENINO'),
(2, 'MASCULINO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `HISTORIAL`
--

CREATE TABLE `HISTORIAL` (
  `ID` int(11) NOT NULL,
  `HOSPITAL_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `HISTORIAL`
--

INSERT INTO `HISTORIAL` (`ID`, `HOSPITAL_ID`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INMUNIZACIONES`
--

CREATE TABLE `INMUNIZACIONES` (
  `ID` int(11) NOT NULL,
  `ANTIGRIPAL` tinyint(1) NOT NULL,
  `ANTINEUMOCOCO` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INTERNACIONES_RELACIONDAS_CON_ENFERMEDAD_DE_BASE`
--

CREATE TABLE `INTERNACIONES_RELACIONDAS_CON_ENFERMEDAD_DE_BASE` (
  `ID` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `DIAS` int(11) NOT NULL,
  `CAUSAS` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `LABORATORIO`
--

CREATE TABLE `LABORATORIO` (
  `ID` int(11) NOT NULL,
  `GLUCEMIA_EN_AYUNAS` float NOT NULL,
  `COLESTEROL_TOTAL` float NOT NULL,
  `TRIGLICERIDOS` float NOT NULL,
  `IGA_TOTAL` float NOT NULL,
  `PTOG_DESDE` float NOT NULL,
  `PTOG_HASTA` float NOT NULL,
  `COLESTEROL_HDL` float NOT NULL,
  `GOT` float NOT NULL,
  `ANTITRANSGLUTAMINASA` float NOT NULL,
  `HBA1C` float NOT NULL,
  `COLESTEROL_LDL` float NOT NULL,
  `FAL` float NOT NULL,
  `CREATININA` float NOT NULL,
  `CLEARENCE_DE_CREATININA` float NOT NULL,
  `FG` float NOT NULL,
  `PROTEINURIA` float NOT NULL,
  `PROTEINURIA_CREATININURIA` float NOT NULL,
  `UREA` float NOT NULL,
  `MICROALBUMINURIA` float DEFAULT NULL,
  `NIVEL_DE_RIESGO_CARDIOVASCULAR_GLOBAL` float NOT NULL,
  `PARTICIPACION_TALLERES_AUTOCUIDADO` tinyint(1) NOT NULL,
  `OBSERVACIONES` text NOT NULL,
  `GPT` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `LOCALIDAD`
--

CREATE TABLE `LOCALIDAD` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `CODIGO_POSTAL` varchar(10) NOT NULL,
  `DEPARTAMENTO_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `LOCALIDAD`
--

INSERT INTO `LOCALIDAD` (`ID`, `DESCRIPCION`, `CODIGO_POSTAL`, `DEPARTAMENTO_ID`) VALUES
(1, 'LIBERTADOR GENERAL SAN MARTIN', '4512', 0),
(2, 'SAN PEDRO DE JUJUY', '', 0),
(3, 'SAN SALVADOR DE JUJUY', '4600', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MEDICAMENTOS`
--

CREATE TABLE `MEDICAMENTOS` (
  `ID` int(11) NOT NULL,
  `INSULINA_NPH` float NOT NULL,
  `INSULINA_RAPIDA` float NOT NULL,
  `METFORMINA` float NOT NULL,
  `GLIBENCLAMIDA` float NOT NULL,
  `ENALAPRIL` float NOT NULL,
  `ATENOLOL` float NOT NULL,
  `HIDROCLOROTIAZIDA` float NOT NULL,
  `AAS` float NOT NULL,
  `SIMVASTATINA` float NOT NULL,
  `FENOFIBRATO` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `NUTRICION`
--

CREATE TABLE `NUTRICION` (
  `ID` int(11) NOT NULL,
  `TIENE_CONOCIMIENTOS_BASICOS` tinyint(1) NOT NULL,
  `ASISTE_CONTROL` tinyint(1) NOT NULL,
  `CUMPLE_PLAN_DE_ALIMENTACION` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `OBRA_SOCIAL`
--

CREATE TABLE `OBRA_SOCIAL` (
  `ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(200) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `OBRA_SOCIAL`
--

INSERT INTO `OBRA_SOCIAL` (`ID`, `DESCRIPCION`) VALUES
(1, 'NO'),
(2, 'INC.SALUD'),
(3, 'I.S.J.'),
(4, 'PAMI'),
(5, 'OTRA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ODONTOLOGIA`
--

CREATE TABLE `ODONTOLOGIA` (
  `ID` int(11) NOT NULL,
  `CONTROL_ODONTOLOGICO` tinyint(1) NOT NULL,
  `ENFERMEDAD_PERIODONTAL` tinyint(1) NOT NULL,
  `FLEMONES` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `OFTALMOLOGIA`
--

CREATE TABLE `OFTALMOLOGIA` (
  `ID` int(11) NOT NULL,
  `EXAMEN_ACTUAL` tinyint(1) NOT NULL,
  `FONDO_DE_OJOS` tinyint(1) NOT NULL,
  `AMAUROSIS` tinyint(1) NOT NULL,
  `CATARATAS` tinyint(1) NOT NULL,
  `GLAUCOMA` tinyint(1) NOT NULL,
  `MACULOPATIA` tinyint(1) NOT NULL,
  `RETINOPATIA` tinyint(1) NOT NULL,
  `PROLIFERATIVA` tinyint(1) NOT NULL,
  `NO_PROFILERATIVA` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PACIENTE`
--

CREATE TABLE `PACIENTE` (
  `ID` int(11) NOT NULL,
  `DNI` int(8) NOT NULL,
  `NOMBRE` varchar(200) NOT NULL,
  `FECHA_NACIMIENTO` date NOT NULL,
  `GENERO_ID` tinyint(1) NOT NULL,
  `ESTADO_CIVIL_ID` int(11) NOT NULL,
  `OBRA_SOCIAL_ID` int(11) NOT NULL,
  `ESTUDIO_ID` int(11) NOT NULL,
  `DOMICILIO` varchar(300) NOT NULL,
  `TELEFONO` varchar(20) NOT NULL,
  `LOCALIDAD_ID` int(11) NOT NULL,
  `DEPARTAMENTO_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `PACIENTE`
--

INSERT INTO `PACIENTE` (`ID`, `DNI`, `NOMBRE`, `FECHA_NACIMIENTO`, `GENERO_ID`, `ESTADO_CIVIL_ID`, `OBRA_SOCIAL_ID`, `ESTUDIO_ID`, `DOMICILIO`, `TELEFONO`, `LOCALIDAD_ID`, `DEPARTAMENTO_ID`) VALUES
(1, 28063735, 'JUAN PEREZ', '2019-04-09', 2, 2, 3, 4, 'EL EUCALIPTO Nª540', '3884090221', 1, 2),
(2, 28175186, 'CHAVES MONICA IVANA LUZ', '1980-06-22', 1, 2, 4, 4, 'CARDOZO SOTO Nª420', '3884754888', 1, 2),
(3, 26182189, 'CHAVES PATRICIA NOEMI', '1978-07-21', 1, 3, 2, 3, 'TUMUSLA Nª627', '3884611274', 2, 2),
(4, 44125656, 'CHUMACERO CHAVES MAURICIO AGUSTIN', '2002-04-04', 2, 1, 3, 3, 'TUCUMAN Nª185', '3884561723', 2, 2),
(5, 11111111, 'HECTOR ANTONIO FERNANDEZ', '1980-01-02', 1, 1, 1, 1, 'El corcho Nro 333', '03886154999222', 2, 2),
(6, 22222222, 'HECTOR ANTONIO FERNANDEZ', '1980-01-02', 1, 1, 1, 1, 'El corcho Nro 333', '03886154999222', 2, 2),
(7, 22222222, 'HECTOR ANTONIO FERNANDEZ', '1980-01-02', 1, 1, 1, 1, 'El corcho Nro 333', '03886154999222', 2, 2),
(9, 5555, 'HECTOR ANTONIO FERNANDEZ', '1980-01-02', 1, 1, 1, 1, 'El corcho Nro 333', '03886154999222', 2, 2),
(11, 7777, 'HECTOR ANTONIO ZULETA', '2019-04-09', 1, 1, 1, 1, 'El corcho Nro 333', '03886154999222', 2, 2),
(12, 8888, 'HECTOR ANTONIO ZULETA', '1980-01-02', 1, 1, 1, 1, 'El corcho Nro 333', '03886154999222', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PIES`
--

CREATE TABLE `PIES` (
  `ID` int(11) NOT NULL,
  `EXAMEN_ACTUAL` tinyint(1) NOT NULL,
  `AUSENCIA_DE_PULSO_PEDIO` tinyint(1) NOT NULL,
  `AUSENCIA_DE_RELEJOS` tinyint(1) NOT NULL,
  `ALTERACION_SENSIBILIDAD` tinyint(1) NOT NULL,
  `CLAUDICACION_INTERMINENTE` tinyint(1) NOT NULL,
  `ULCERA` tinyint(1) NOT NULL,
  `AMPUTACION` tinyint(1) NOT NULL,
  `ECODOPPLER_PERIFERICO` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PSICOLOGIA`
--

CREATE TABLE `PSICOLOGIA` (
  `ID` int(11) NOT NULL,
  `REALIZO_ENTREVISTA` tinyint(1) NOT NULL,
  `ASISTE_A_TERAPIA` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RENAL`
--

CREATE TABLE `RENAL` (
  `ID` int(11) NOT NULL,
  `NEFROPATIA` tinyint(1) NOT NULL,
  `NEFROPATIA_TIPO` tinyint(1) NOT NULL,
  `DIALISIS` tinyint(1) NOT NULL,
  `TRANSPLANTE` tinyint(1) NOT NULL,
  `ECOGRAFIA` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SEGUIMIENTO`
--

CREATE TABLE `SEGUIMIENTO` (
  `ID` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `ADHERENCIA_AL_TRATAMIENTO` tinyint(1) NOT NULL,
  `ECG` tinyint(1) NOT NULL,
  `RIESGO_CARDIOVASCULAR` int(11) NOT NULL,
  `AUTOMONITOREO` tinyint(1) NOT NULL,
  `ID_PACIENTE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SOLICITUD_DE_PRACTICA`
--

CREATE TABLE `SOLICITUD_DE_PRACTICA` (
  `ID` int(11) NOT NULL,
  `LABORATORIOS` tinyint(1) NOT NULL,
  `LABORATORIOS_OBSERVACION` text NOT NULL,
  `OTROS_ESTUDIOS` tinyint(1) NOT NULL,
  `OTROS_ESTUDIOS_OBSERVACION` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SOLICITUD_INTERCONSULTA`
--

CREATE TABLE `SOLICITUD_INTERCONSULTA` (
  `ID` int(11) NOT NULL,
  `CARDIOLOGIA` tinyint(1) NOT NULL,
  `ENDOCRINOLOGIA` tinyint(1) NOT NULL,
  `NEFROLOGIA` tinyint(1) NOT NULL,
  `NUTRICION` tinyint(1) NOT NULL,
  `ODONTOLOGIA` tinyint(1) NOT NULL,
  `OFTALMOLOGIA` tinyint(1) NOT NULL,
  `PSICOLOGIA` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TIPO_ENFERMEDAD`
--

CREATE TABLE `TIPO_ENFERMEDAD` (
  `ID` int(11) NOT NULL,
  `ENFERMEDAD` varchar(200) NOT NULL,
  `TIPO` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `TIPO_ENFERMEDAD`
--

INSERT INTO `TIPO_ENFERMEDAD` (`ID`, `ENFERMEDAD`, `TIPO`) VALUES
(1, 'DIABETES', 'TIPO 1'),
(2, 'DIABETES', 'TIPO 2 CON HIPOGLUCEMIANTES'),
(3, 'DIABETES', 'TIPO 2 INSULINIZADO'),
(4, 'DIABETES', 'TIPO 2 INSULINIZADO + HO'),
(5, 'DIABETES', 'GESTACIONAL'),
(6, 'DIABETES', 'GESTACIONAL INSULINIZADO'),
(7, 'DIABETES', 'OTRO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TRATAMIENTO_ACTUAL`
--

CREATE TABLE `TRATAMIENTO_ACTUAL` (
  `ID` int(11) NOT NULL,
  `INSULINA_NPH` float NOT NULL,
  `INSULINA_RAPIDA` float NOT NULL,
  `METFORMINA` float NOT NULL,
  `GLIBENCLAMIDA` float NOT NULL,
  `ENALAPRIL` float NOT NULL,
  `ATENOLOL` float NOT NULL,
  `FUROSEMIDA` float NOT NULL,
  `HIDROCLOROTIAZIDA` float NOT NULL,
  `AAS` float NOT NULL,
  `SIMVASTATINA` float NOT NULL,
  `FENOFIBRATO` float NOT NULL,
  `AUTOMONITOREO` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ANTECEDENTES_FAMILIARES`
--
ALTER TABLE `ANTECEDENTES_FAMILIARES`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `CIRCULATORIO`
--
ALTER TABLE `CIRCULATORIO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `COMPLICACIONES_AGUDAS_DE_DIABETES`
--
ALTER TABLE `COMPLICACIONES_AGUDAS_DE_DIABETES`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `CONDUCTAS_MEDICAS`
--
ALTER TABLE `CONDUCTAS_MEDICAS`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `DATOS_CLINICOS`
--
ALTER TABLE `DATOS_CLINICOS`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `DATOS_DE_LABORATORIO`
--
ALTER TABLE `DATOS_DE_LABORATORIO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `DEPARTAMENTO`
--
ALTER TABLE `DEPARTAMENTO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `DIAGNOSTICOS`
--
ALTER TABLE `DIAGNOSTICOS`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `ENFERMEDADES_ASOCIADAS`
--
ALTER TABLE `ENFERMEDADES_ASOCIADAS`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `ENFERMERIA`
--
ALTER TABLE `ENFERMERIA`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `ESTADO_CIVIL`
--
ALTER TABLE `ESTADO_CIVIL`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `ESTUDIO`
--
ALTER TABLE `ESTUDIO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `EXAMEN_FISICO`
--
ALTER TABLE `EXAMEN_FISICO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `FACTORES_DE_RIESGO_ASOCIADOS`
--
ALTER TABLE `FACTORES_DE_RIESGO_ASOCIADOS`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `GENERO`
--
ALTER TABLE `GENERO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `HISTORIAL`
--
ALTER TABLE `HISTORIAL`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `INMUNIZACIONES`
--
ALTER TABLE `INMUNIZACIONES`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `INTERNACIONES_RELACIONDAS_CON_ENFERMEDAD_DE_BASE`
--
ALTER TABLE `INTERNACIONES_RELACIONDAS_CON_ENFERMEDAD_DE_BASE`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `LABORATORIO`
--
ALTER TABLE `LABORATORIO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `LOCALIDAD`
--
ALTER TABLE `LOCALIDAD`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `MEDICAMENTOS`
--
ALTER TABLE `MEDICAMENTOS`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `NUTRICION`
--
ALTER TABLE `NUTRICION`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `OBRA_SOCIAL`
--
ALTER TABLE `OBRA_SOCIAL`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `ODONTOLOGIA`
--
ALTER TABLE `ODONTOLOGIA`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `OFTALMOLOGIA`
--
ALTER TABLE `OFTALMOLOGIA`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `PACIENTE`
--
ALTER TABLE `PACIENTE`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `PIES`
--
ALTER TABLE `PIES`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `PSICOLOGIA`
--
ALTER TABLE `PSICOLOGIA`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `RENAL`
--
ALTER TABLE `RENAL`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `SEGUIMIENTO`
--
ALTER TABLE `SEGUIMIENTO`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `SOLICITUD_DE_PRACTICA`
--
ALTER TABLE `SOLICITUD_DE_PRACTICA`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `SOLICITUD_INTERCONSULTA`
--
ALTER TABLE `SOLICITUD_INTERCONSULTA`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `TIPO_ENFERMEDAD`
--
ALTER TABLE `TIPO_ENFERMEDAD`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `TRATAMIENTO_ACTUAL`
--
ALTER TABLE `TRATAMIENTO_ACTUAL`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `CONDUCTAS_MEDICAS`
--
ALTER TABLE `CONDUCTAS_MEDICAS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `DEPARTAMENTO`
--
ALTER TABLE `DEPARTAMENTO`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `ESTADO_CIVIL`
--
ALTER TABLE `ESTADO_CIVIL`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `ESTUDIO`
--
ALTER TABLE `ESTUDIO`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `GENERO`
--
ALTER TABLE `GENERO`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `LOCALIDAD`
--
ALTER TABLE `LOCALIDAD`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `OBRA_SOCIAL`
--
ALTER TABLE `OBRA_SOCIAL`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `PACIENTE`
--
ALTER TABLE `PACIENTE`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `TIPO_ENFERMEDAD`
--
ALTER TABLE `TIPO_ENFERMEDAD`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
