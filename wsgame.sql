-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: wordsearchgame
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `game_groups`
--

DROP TABLE IF EXISTS `game_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_groups`
--

LOCK TABLES `game_groups` WRITE;
/*!40000 ALTER TABLE `game_groups` DISABLE KEYS */;
INSERT INTO `game_groups` VALUES (1,'程式設計基礎'),(2,'成語');
/*!40000 ALTER TABLE `game_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id_fk_idx` (`group_id`),
  CONSTRAINT `group_id_fk` FOREIGN KEY (`group_id`) REFERENCES `game_groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,1,'程式語言','{\"sentence\": [\"JavaScript\", \"Python\", \"Ruby\", \"Swift\", \"Kotlin\"]}'),(2,1,'資料結構','{\"sentence\": [\"Array\", \"List\", \"Stack\", \"Queue\", \"Tree\", \"Graph\"]}'),(3,1,'演算法','{\"sentence\": [\"Dichotomy\", \"Search\", \"Sort\", \"Recursion\", \"Recursion\"]}'),(4,1,'程式概念','{\"sentence\": [\"Variable\", \"Function\", \"Loop\", \"Object\", \"Class\"]}'),(7,2,'智慧','{\"sentence\": [\"才高八斗\", \"學富五車\", \"智者千慮\", \"舉一反三\", \"洞若觀火\"]}'),(8,2,'勤奮','{\"sentence\": [\"孜孜不倦\", \"勤學好問\", \"刻苦耐勞\", \"夜以繼日\", \"持之以恆\"]}'),(9,2,'勇氣','{\"sentence\": [\"臨危不懼\", \"義無反顧\", \"奮不顧身\", \"破釜沉舟\", \"無所畏懼\"]}'),(10,2,'品德','{\"sentence\": [\"德高望重\", \"忠心耿耿\", \"光明磊落\", \"寬宏大量\", \"誠實守信\"]}'),(11,2,'速度','{\"sentence\": [\"風馳電掣\", \"迅雷不及掩耳\", \"日行千里\", \"一日千里\", \"飛速前進\"]}');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-16  1:39:37
