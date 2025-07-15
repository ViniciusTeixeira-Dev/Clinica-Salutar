DROP TABLE IF EXISTS `tbl_fichapaciente`;
/*!40101 SET @saved_cs_client      = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_fichapaciente` (
  `id_ficha` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `data_nasc` date DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `numero_complemento` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `ocupacao` varchar(45) DEFAULT NULL,
  `diagnostico_clinico` text,
  `queixa_principal` text,
  `hmp_hma` text,
  `medicacoes` text,
  `exames_complementares` text,
  `exame_fisico` text,
  `conduta_clinica` text,
  `diagnostico` text,
  `evolucao_clinica` varchar(45) DEFAULT NULL,
  `uuid` varchar(45) NOT NULL,
  `link_foto` text,
  `ativo` int DEFAULT NULL,
  PRIMARY KEY (`id_ficha`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `tbl_midia`;
/*!40101 SET @saved_cs_client      = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_midia` (
  `num_seq` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `link_midia` varchar(255) DEFAULT NULL,
  `id_ficha` int DEFAULT NULL,
  PRIMARY KEY (`num_seq`),
  KEY `id_ficha` (`id_ficha`),
  CONSTRAINT `tbl_midia_ibfk_1` FOREIGN KEY (`id_ficha`) REFERENCES `tbl_fichapaciente` (`id_ficha`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `tbl_usuario`;
/*!40101 SET @saved_cs_client      = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(100) DEFAULT NULL,
  `login` varchar(45) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO tbl_usuario (id_usuario, nome_usuario, login, senha) VALUES (1, 'admin', 'admin', '$2a$10$PA0PLCEYHT3vbvGag5636uU.gw/UJUgqXT5MwDEGv5s93qCAlSQfe');