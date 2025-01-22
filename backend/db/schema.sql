-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2024 at 06:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `com3102_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `assignment_title` varchar(255) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `deadline` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `user_id`, `assignment_title`, `course_name`, `deadline`, `created_at`) VALUES
(1, 1, 'Math Assignment 1', 'Calculus 101', '2024-12-01 23:59:59', '2024-11-27 18:58:37'),
(2, 1, 'Test Assignment', 'Sample Course', '2024-11-28 04:42:11', '2024-11-27 19:42:11'),
(3, 36, 'PSY9000', 'Gangnam Style', '2024-12-03 23:59:00', '2024-11-30 15:01:38'),
(4, 36, 'Assignment 1_ F35', 'USAF20', '2025-01-07 22:01:00', '2024-11-30 18:01:40'),
(5, 39, 'E-Com Project', 'COM3105', '2025-01-22 23:59:00', '2024-12-01 08:09:10'),
(6, 40, 'Essay_on_Roman_Empire', 'RMT1000', '2025-01-28 22:59:00', '2024-12-01 08:22:28'),
(7, 42, 'Essay_on_Legalism', 'BJC2115', '2024-12-30 22:40:00', '2024-12-01 08:34:53'),
(8, 43, 'ProposalWriting_Marketing', 'MGT1005', '2024-12-15 23:59:00', '2024-12-01 08:40:25'),
(9, 44, 'EssayonBrics', 'MGT1009', '2024-12-27 22:46:00', '2024-12-01 14:46:22'),
(10, 45, 'FinanceEssay', 'FIN2001', '2024-12-31 16:06:00', '2024-12-01 15:06:31'),
(11, 46, 'FinanceEssay01', 'FIN3001', '2024-12-25 17:24:00', '2024-12-01 16:24:36');

-- --------------------------------------------------------

--
-- Table structure for table `file_references`
--

CREATE TABLE `file_references` (
  `id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploader_id` int(11) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `upload_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `file_references`
--

INSERT INTO `file_references` (`id`, `file_path`, `uploader_id`, `tags`, `upload_date`) VALUES
(1, '../public/uploads/testsds.txt', 1, 'Assignment,Project', '2024-11-27 18:09:20'),
(2, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1732978620_Test 1.txt', 37, 'Test1', '2024-11-30 14:57:00'),
(3, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1732978757_COM3102 Project specification (AY2024-25).pdf', 36, 'COM_3102_Proj-Document', '2024-11-30 14:59:17'),
(4, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1732994937_snowy white land.jpg', 36, 'Project Wallpaper', '2024-11-30 19:28:57'),
(5, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1732995032_dark-purple-blue-sparkling-sky-1vds82j6e3ycq9r1.jpg', 36, 'wallpaper', '2024-11-30 19:30:32'),
(6, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1732995184_Colores Wallpaper.jpg', 37, 'Colores', '2024-11-30 19:33:04'),
(7, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1732995268_Deer 2.jpg', 37, 'Deer', '2024-11-30 19:34:28'),
(8, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1732995514_RED Wallpaper.jpg', 36, 'something', '2024-11-30 19:38:34'),
(9, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1732995834_2.jpg', 36, 'Mayan', '2024-11-30 19:43:54'),
(10, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1733040585_client_proposal.docx', 39, 'Client_proposal', '2024-12-01 08:09:45'),
(11, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1733041383_pseudo class midterms css.txt', 40, 'Roman', '2024-12-01 08:23:03'),
(12, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1733041788_HSU Leaflet.pdf', 41, 'Poster', '2024-12-01 08:29:48'),
(13, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1733042143_COM1101 Java Quick Reference.pdf', 42, 'Java', '2024-12-01 08:35:43'),
(14, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1733042464_FIN2001 module outline 2024-1 22Aug2024.docx', 43, 'Finance,Module', '2024-12-01 08:41:04'),
(15, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1733064407_Topic_05_Discounted_Cash_Flow_Valuation.pptx', 44, 'Finance,Presentation', '2024-12-01 14:46:47'),
(16, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1733065438_Topic_01_Introduction_to_Financial_Management.pptx', 45, 'FinanceAssgn', '2024-12-01 15:03:58'),
(17, 'C:\\xampp\\htdocs\\COM3102-Project\\backend\\api/../../public/uploads/1733070165_Topic_08_Net_Present_Value_and_Other_Investment_Criteria.pptx', 46, 'Financeppt1', '2024-12-01 16:22:45');

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `user1_id` int(11) DEFAULT NULL,
  `user2_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`id`, `user_id`, `last_login`) VALUES
(1, 36, '2024-11-30 14:29:03'),
(2, 37, '2024-11-30 14:31:04'),
(3, 37, '2024-11-30 14:35:55'),
(4, 36, '2024-11-30 14:41:37'),
(5, 37, '2024-11-30 14:44:19'),
(6, 37, '2024-11-30 14:56:51'),
(7, 36, '2024-11-30 14:58:27'),
(8, 37, '2024-11-30 16:09:35'),
(9, 37, '2024-11-30 16:13:41'),
(10, 36, '2024-11-30 16:22:19'),
(11, 38, '2024-11-30 16:49:31'),
(12, 36, '2024-11-30 17:03:55'),
(13, 36, '2024-11-30 18:00:35'),
(14, 36, '2024-11-30 18:35:02'),
(15, 36, '2024-11-30 18:53:20'),
(16, 36, '2024-11-30 18:56:56'),
(17, 37, '2024-11-30 18:57:40'),
(18, 36, '2024-11-30 19:04:34'),
(19, 37, '2024-11-30 19:05:01'),
(20, 36, '2024-11-30 19:20:56'),
(21, 36, '2024-11-30 19:28:14'),
(22, 37, '2024-11-30 19:32:50'),
(23, 37, '2024-11-30 19:34:17'),
(24, 36, '2024-11-30 19:38:18'),
(25, 36, '2024-11-30 19:43:43'),
(26, 36, '2024-11-30 19:45:58'),
(27, 39, '2024-12-01 08:07:58'),
(28, 40, '2024-12-01 08:21:22'),
(29, 41, '2024-12-01 08:29:20'),
(30, 42, '2024-12-01 08:34:05'),
(31, 43, '2024-12-01 08:39:39'),
(32, 43, '2024-12-01 08:41:32'),
(33, 36, '2024-12-01 08:44:41'),
(34, 36, '2024-12-01 12:56:26'),
(35, 36, '2024-12-01 12:56:50'),
(36, 37, '2024-12-01 14:19:47'),
(37, 44, '2024-12-01 14:43:01'),
(38, 36, '2024-12-01 14:47:34'),
(39, 37, '2024-12-01 14:50:37'),
(40, 45, '2024-12-01 15:01:00'),
(41, 37, '2024-12-01 15:10:45'),
(42, 42, '2024-12-01 15:13:40'),
(43, 46, '2024-12-01 16:16:30'),
(44, 37, '2024-12-01 16:19:57'),
(45, 42, '2024-12-01 16:28:14');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `timestamp`) VALUES
(1, 1, 2, 'Hello! This is a test message.', '2024-11-27 19:51:08'),
(2, 1, 2, 'Test message', '2024-11-28 12:12:15'),
(3, 1, 2, 'sasa', '2024-11-28 12:14:47'),
(4, 1, 2, 'Jake Paul', '2024-11-28 12:14:53'),
(5, 1, 2, 'dsds', '2024-11-28 12:15:19'),
(6, 1, 2, 'Hey bro', '2024-11-28 12:17:36'),
(7, 1, 2, 'What\'s up', '2024-11-28 12:17:42'),
(8, 1, 2, 'ANDREW TATE', '2024-11-28 12:21:15'),
(9, 1, 2, 'Okay so you good', '2024-11-28 12:24:19'),
(10, 1, 2, 'Yes, I am good', '2024-11-28 12:24:26'),
(11, 1, 2, 'Hie', '2024-11-28 12:29:34'),
(12, 1, 2, 'okay do', '2024-11-28 12:29:42'),
(13, 1, 2, 'Hi what\'s up?', '2024-11-28 12:31:55'),
(14, 1, 2, 'sasasa', '2024-11-28 12:32:48'),
(15, 1, 2, 'vcvcvc', '2024-11-28 12:32:52'),
(16, 1, 2, 'GOOD', '2024-11-28 12:33:19'),
(17, 1, 2, 'dfdfdsf', '2024-11-28 12:47:45'),
(18, 1, 2, 'dasdsd', '2024-11-28 13:25:38'),
(19, 36, 34, 'Good weather today!', '2024-11-30 15:00:48'),
(20, 39, 38, 'Hey Kane, what\'s good?', '2024-12-01 08:08:23'),
(21, 40, 2, 'What\'s up Jane?', '2024-12-01 08:21:49'),
(22, 42, 41, 'Love your podcasts!', '2024-12-01 08:34:28'),
(23, 43, 42, 'GM', '2024-12-01 08:41:14'),
(24, 44, 41, 'Hey, what\'s up!', '2024-12-01 14:45:07'),
(25, 45, 42, 'Hi, I have recommended you', '2024-12-01 15:08:32'),
(26, 46, 42, 'Hi, I got recommended to talk to you', '2024-12-01 16:26:03'),
(27, 46, 42, 'Hellopsdsd', '2024-12-01 16:27:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `program` varchar(50) DEFAULT NULL,
  `year` int(4) DEFAULT NULL,
  `student_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `program`, `year`, `student_id`) VALUES
(1, 'John Doe', 'john.doe@example.com', '$2y$10$9x//AnCHy0/voco2E66z8Osvmg1tDwz2bFCx5dx9Cxd/549T1XSX6', 'BA-AHCC', 2024, 's123456'),
(2, 'Jane Doe', 'janedoe@example.com', '$2y$10$fU/12JRICb6VQFnrdQPRXOlY3cUWHGsQrpUIMHicFQrBKR9P1E/8S', 'BA-AHCC', 2024, 's238879'),
(31, 'Lionel Messi', 'messi10@gmail.com', '$2y$10$c5l2eW12syqAmCqKXElPdulIW9CogvaVS0F6g6ZgCrbn3boTSH6qu', 'BA-AHCC', 2024, 's000891'),
(32, 'Joe Hart', 'adle92@gmail.com', '$2y$10$IBsSuNfUzjVU30w23ipmOevas5PtSVGolDyhsPxKTkbjcVQPIYCam', 'BA-AMS', 2023, 's008794'),
(33, 'Roman Pickford', 'sale322@gmail.com', '$2y$10$IAisxsQjb4iA4hGyc2Tc6eqvatfVYM9QSJO7hmVga4MYkUs.kdLJC', 'BA-AMS', 2023, 's456109'),
(34, 'Ray Jackson', 'arsds@gmail.com', '$2y$10$7.pXp/k89LqsEefp1QWN/.70vgxcgk9PrCFJIm0B6nEWYdztWP2Pe', 'BA-PIKA', 2023, 's457001'),
(36, 'Ksi Jide', 'ksi32@gmail.com', '$2y$10$lxVXQ6z9z7W.nxCE8Dpx2OlbC5t9mM01pc/k24skxqgXl.QkkZQWa', 'BBA', 2022, 's340098'),
(37, 'Ragnar Lothbrok', 'ragnar@outlook.com', '$2y$10$ZcuKjmncVUCNei31DAbqu.YKaWnxG3tWH2H5QMrKVqRjsfdhlh0qG', 'BA-AMS', 2022, 's098761'),
(38, 'Harry Kane', 'kane@gmail.com', '$2y$10$r8Tn6LeWsqGQekHzM12hUOIVXemoQ.XhYjeJbNilePOOXQOHtPe9C', 'BA-AMS', 2022, 's009871'),
(39, 'Michael Jackson', 'michael@outlook.com', '$2y$10$o1UFQt7D0tNPo9aCKS.i0eUZlRosxSo8p79ydAjRXsek6pc6IPZ2y', 'BBA', 2023, 's340987'),
(40, 'Tristan Tate', 'tristan@yahoo.com', '$2y$10$dpShliS.XNptgmGLR2bs6OYuc4d3TROv.SsoPHv6WHjLJ2c4vbfPW', 'BA-AMS', 2023, 's000989'),
(41, 'Joe Rogan', 'joe@hotmail.com', '$2y$10$KAb8dvsEA2EGOFmiuwmmV.yhTAYEKax/toKD5mhaP2FUYSW2JQ27C', 'BSc-AIN', 2023, 's901244'),
(42, 'Simon Minter', 'simon@gmail.com', '$2y$10$iyHz8xf.4MGdLAGZY8w/Muyg4QF/MLwi2p6Pz58nwHJiXvPEN8WLm', 'BBA-SCM', 2020, 's223345'),
(43, 'Ethan Behzinga', 'ethan@outlook.com', '$2y$10$lcybW/XkD8pOaxNqo8Jwnurndj0eGrvbF2N2ftQevlE/R/M6vmq4a', 'BBA-SCM', 2022, 's120910'),
(44, 'Barack Obama', 'barack@outlook.com', '$2y$10$tJOPPCBLezV7Bgd8JTUse.Wv7ayv/i8rzDK8FsvBCzujNQlmXYCyW', 'BBA-SCM', 2021, 's009871'),
(45, 'Allan Mate', 'allan21@gmail.com', '$2y$10$Cj/6o.zlCL1RMKU/Vkd.Fe5crwLTqv1RWDEKMT5SxXTuqfaKl4gQS', 'BBA-SCM', 2020, 's223456'),
(46, 'Logan Paul', 'logan34@gmail.com', '$2y$10$UNefWyptuilFabQlmGGmuOd6yuRf4VgRn6d3qzJZZz8i0/2qK6JuC', 'BBA-SCM', 2022, 's009887');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `deadline` (`deadline`);

--
-- Indexes for table `file_references`
--
ALTER TABLE `file_references`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploader_id` (`uploader_id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user1_id` (`user1_id`),
  ADD KEY `user2_id` (`user2_id`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `file_references`
--
ALTER TABLE `file_references`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
