-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: thp_db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `thp_users`
--

DROP TABLE IF EXISTS `thp_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thp_users` (
  `u_index` int NOT NULL AUTO_INCREMENT,
  `u_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `u_pass` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `u_first_names` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `u_last_names` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `u_security_lvl` int NOT NULL DEFAULT '1',
  `u_start_time` time NOT NULL DEFAULT '07:00:00',
  `u_finish_time` time NOT NULL DEFAULT '15:00:00',
  PRIMARY KEY (`u_index`),
  UNIQUE KEY `idUser_UNIQUE` (`u_index`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thp_users`
--

LOCK TABLES `thp_users` WRITE;
/*!40000 ALTER TABLE `thp_users` DISABLE KEYS */;
INSERT INTO `thp_users` VALUES (1,'jsalcedou','$2b$10$9ju2pxjiBMQX3sR9ivXweeD2G28n6BzCWATxOrlQpz/BXwiWrbFri','José','Salcedo Uribe',1,'09:00:00','14:30:00'),(2,'lsanchezm','12345','Lorenzo','Sanchez Martinez',4,'07:00:00','15:00:00'),(3,'rgrajedag','12345','Rogelio','Grajeda Garcia',4,'07:00:00','15:00:00'),(4,'rgutierrezd','12345','José Refugio','Gutierres Díaz',4,'07:00:00','15:00:00'),(5,'agutierrezd','12345','Luis Alberto','Gutierres Díaz',4,'07:00:00','15:00:00'),(6,'aojedah','12345','Herrera','Ojeda Herrera',4,'07:00:00','15:00:00'),(11,'aleorad','12345','Miguel Angel','Leora Delgadillo',4,'07:00:00','15:00:00'),(15,'rbriseñor','12345','Ruben','Briseño Rodriguez',4,'07:00:00','15:00:00'),(16,'mgarciao','12345','Manuel','García Ortíz',4,'07:00:00','15:00:00'),(23,'jgarciaa','12345','Jesús','García Alvares',4,'07:00:00','15:00:00'),(29,'mgarciam','12345','Mario','García Alvares',4,'07:00:00','15:00:00'),(42,'mvargasg','12345','Vicente Manuel','Vargas Gonzalez',4,'07:00:00','15:00:00');
/*!40000 ALTER TABLE `thp_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-22 13:43:43
