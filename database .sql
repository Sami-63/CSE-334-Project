-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2023 at 07:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `customerEmail` varchar(255) NOT NULL,
  `roomId` mediumint(9) NOT NULL,
  `paymentAmount` decimal(10,2) NOT NULL,
  `givenRating` int(11) DEFAULT NULL,
  `paymentStatus` varchar(20) DEFAULT NULL CHECK (`paymentStatus` in ('not paid','paid'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `startDate`, `endDate`, `customerEmail`, `roomId`, `paymentAmount`, `givenRating`, `paymentStatus`) VALUES
(1, '2023-08-25', '2023-08-30', 'sadi1@gmail.com', 8, 750.00, 5, 'paid'),
(2, '2023-08-25', '2023-08-30', 'sadi1@gmail.com', 6, 75.00, 2, 'not paid'),
(3, '2023-08-23', '2023-08-25', 'gandu@gmail.com', 7, 160.00, NULL, 'not paid'),
(4, '2023-08-25', '2023-08-26', 'gandu@gmail.com', 8, 150.00, NULL, 'not paid'),
(5, '2023-09-07', '2023-09-10', 'sami@gmail.com', 7, 240.00, 2, 'not paid'),
(6, '2023-09-10', '2023-09-11', 'sadi1@gmail.com', 8, 150.00, NULL, 'not paid'),
(7, '2023-09-26', '2023-09-29', 'sami@gmail.com', 8, 450.00, NULL, 'not paid'),
(8, '2023-10-01', '2023-10-04', 'sami@gmail.com', 7, 240.00, NULL, 'not paid'),
(9, '2023-08-28', '2023-08-29', 'sami@gmail.com', 7, 80.00, 4, 'not paid'),
(10, '2023-09-01', '2023-09-04', 'sami@gmail.com', 7, 240.00, NULL, 'not paid');

-- --------------------------------------------------------

--
-- Table structure for table `otherbooking`
--

CREATE TABLE `otherbooking` (
  `id` int(11) NOT NULL,
  `bookingDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `customerEmail` varchar(255) NOT NULL,
  `facilityId` mediumint(9) NOT NULL,
  `paymentAmount` decimal(10,2) NOT NULL,
  `givenRating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otherbooking`
--

INSERT INTO `otherbooking` (`id`, `bookingDate`, `startTime`, `endTime`, `customerEmail`, `facilityId`, `paymentAmount`, `givenRating`) VALUES
(2, '2023-08-25', '10:00:00', '12:00:00', 'sami@gmail.com', 5, 59.99, NULL),
(3, '2023-08-29', '04:00:00', '05:00:00', 'sami@gmail.com', 3, 50.00, NULL),
(4, '2023-08-28', '06:00:00', '07:00:00', 'sami@gmail.com', 3, 50.00, NULL),
(5, '2023-08-26', '06:00:00', '06:30:00', 'sami@gmail.com', 3, 25.00, NULL),
(6, '2023-08-28', '05:00:00', '07:00:00', 'sami@gmail.com', 3, 100.01, NULL),
(7, '2023-08-29', '10:00:00', '11:00:00', 'sami@gmail.com', 3, 50.00, NULL),
(8, '2023-08-29', '20:00:00', '21:00:00', 'sami@gmail.com', 3, 50.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `otherfacility`
--

CREATE TABLE `otherfacility` (
  `category` varchar(30) DEFAULT NULL,
  `id` mediumint(9) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `price` double NOT NULL,
  `rating` double NOT NULL,
  `imgUrl` text DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otherfacility`
--

INSERT INTO `otherfacility` (`category`, `id`, `description`, `price`, `rating`, `imgUrl`, `title`) VALUES
('Indoor Game', 1, 'Enjoy a game of pool with friends.', 10.5, 4.5, 'https://media.istockphoto.com/id/149409557/photo/composition-of-billiard.jpg?s=612x612&w=0&k=20&c=Wn6B7acze4xG4TX1S3vusu8nC88nYJBy2_xYhdRNpKU=', 'Pool Table'),
('Dining', 2, 'Experience delicious cuisine at our restaurant.', 25, 4.8, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGluaW5nfGVufDB8fDB8fHww&w=1000&q=80', 'Restaurant'),
('Dining', 3, 'Experience delicious cuisine at our restaurant.', 25, 4.8, 'https://st.hzcdn.com/simgs/pictures/dining-rooms/beachfront-gem-on-jersey-shore-morris-gindi-photography-img~34e10c630eab3594_14-1640-1-5739607.jpg', 'Restaurant'),
('Dining', 4, 'Experience delicious cuisine at our restaurant.', 25, 4.8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeLg5rVQxS9rybm_OULK_DwsGX4YNynby-lrXUyLby&s', 'Restaurant'),
('Swimming Pool', 5, 'Relax and swim in our refreshing outdoor pool.', 15, 4.7, 'https://media.istockphoto.com/id/1364656744/photo/back-yard-with-two-lounge-chairs-and-swimming-pool.webp?b=1&s=170667a&w=0&k=20&c=R3tyVNI6eL8x9nzrhStUvOl_gXx-iEzq-ZIN4-4oymA=', 'Outdoor Pool'),
('Dining', 6, 'for 40 to 50 people', 0, 0, 'data:image/jpeg;base64,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', 'Small Dining'),
('Indoor Game', 7, 'Enjoy a game of pool with friends.', 0, 4.5, 'https://media.istockphoto.com/id/149409557/photo/composition-of-billiard.jpg?s=612x612&w=0&k=20&c=Wn6B7acze4xG4TX1S3vusu8nC88nYJBy2_xYhdRNpKU=', 'Pool Table'),
('Indoor Game', 8, 'Enjoy with your friends', 0, 0, 'data:image/jpeg;base64,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', 'Mini Footall'),
('Swimming Pool', 9, 'Relax and swim in our  outdoor pool.', 0, 0, 'https://www.baumerk.com/storage/app/media/blog/havuz-izolasyonu.jpeg', 'Outdoor Pool with beautiful scenario'),
('Swimming Pool', 10, 'Mind blowing scenario', 0, 0, 'https://leisurepools.eu/wp-content/uploads/2020/06/best-type-of-swimming-pool-for-my-home_2.jpg', 'Swimming Pool connected with nature');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` mediumint(9) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `price` double NOT NULL,
  `rating` double NOT NULL,
  `personCount` int(11) DEFAULT NULL,
  `bedroomCount` int(11) DEFAULT NULL,
  `acCount` tinyint(1) DEFAULT NULL,
  `imgUrl` text DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `description`, `price`, `rating`, `personCount`, `bedroomCount`, `acCount`, `imgUrl`, `title`) VALUES
(6, 'Big Rooom', 120, 4.5, 5, 2, 1, 'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=', 'Cozzy Room'),
(7, 'Spacious Double Roommmmm', 80, 4.8, 2, 1, 1, 'https://media.istockphoto.com/id/1163498940/photo/interior-of-a-modern-luxury-hotel-double-bed-bedroom.jpg?s=612x612&w=0&k=20&c=75KFjgY3RHrQq2yTV4boA4A89qMeccMQZotFKIMURS8=', 'Spacious Double Room'),
(8, 'Luxury Suite', 350, 4.9, 2, 2, 0, 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?cs=srgb&dl=pexels-pixabay-164595.jpg&fm=jpg', 'Luxury Suite'),
(16, 'Big Rooom', 0, 0, NULL, NULL, NULL, 'https://media.istockphoto.com/id/627892060/photo/hotel-room-suite-with-view.jpg?s=612x612&w=0&k=20&c=YBwxnGH3MkOLLpBKCvWAD8F__T-ypznRUJ_N13Zb1cU=', 'Cozzy Room'),
(23, 'A comfortable and cozy room with modern amenities.', 150, 4.5, 2, 1, 1, 'https://media.gettyimages.com/id/157485095/photo/messy-hotel-room.jpg?s=612x612&w=gi&k=20&c=qoDxzsBw9zTaFwlshG3HmUqTOh51khEkwMyHxiiHjrY=', 'Cozy Retreat'),
(24, 'Experience luxury and elegance in our spacious suite.', 300, 4.8, 4, 2, 2, 'https://cdn.pixabay.com/photo/2020/11/23/11/26/hotel-5769442_960_720.jpg', 'Luxury Suite'),
(25, 'Perfect for families, this room offers comfort and convenience.', 220, 4.3, 3, 1, 1, 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&w=1000&q=80', 'Family Getaway'),
(27, 'Spacious Double Room', 80, 4.8, 2, 1, 1, 'https://media.istockphoto.com/id/1163498940/photo/interior-of-a-modern-luxury-hotel-double-bed-bedroom.jpg?s=612x612&w=0&k=20&c=75KFjgY3RHrQq2yTV4boA4A89qMeccMQZotFKIMURS8=', 'Spacious Double Room'),
(37, 'Experience the ultimate luxury in our spacious suite.', 299, 0, 4, 2, 1, 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571458.jpg&fm=jpg', 'Luxury Suite'),
(80, 'Luxury Suite', 150, 4.9, 2, 2, 0, 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?cs=srgb&dl=pexels-pixabay-164595.jpg&fm=jpg', 'Luxury Suite');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `userType` varchar(20) DEFAULT NULL CHECK (`userType` in ('customer','manager','admin')),
  `nidNumber` bigint(20) DEFAULT NULL,
  `phoneNumber` varchar(30) DEFAULT NULL,
  `bankName` varchar(30) DEFAULT NULL,
  `accountNumber` varchar(30) DEFAULT NULL,
  `bkashNumber` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `email`, `password`, `userType`, `nidNumber`, `phoneNumber`, `bankName`, `accountNumber`, `bkashNumber`) VALUES
('Ayana', 'ayana@gmail.com', '$2a$10$OninjZeRwfsef/LlR7rTS.UZWSjgJ8IvnOFI0CjcIi.u8JDu76Reu', 'customer', NULL, NULL, NULL, NULL, NULL),
('Gandu', 'gandu@gmail.com', '$2a$10$QPi./8UbjKmjZpPNPlvxWul.SaEyZ2zEqKsvk7Phxe7kiM3FrXlMC', 'customer', NULL, NULL, NULL, NULL, NULL),
('Jawad Ali', 'jta@gmail.com', '$2a$10$pbcYQisL8RAVAwFJhSWHNOnoFpScoolWe08FYNHuUjq3Fuu/YSZR6', 'customer', 65467684645, '+4421643468464', NULL, NULL, NULL),
('Nihan Ali', 'nihan@gmail.com', '$2a$10$Y5zZK94eeQSpNr7xiSH7XeBIAhM2UTwF25cDLFbSBBMLiWX.wm4U.', 'customer', 5561766493, '01701559019', 'Bkash', '123456', 1701559019),
('Sadi', 'sadi1@gmail.com', '$2a$10$i6O7Uy56bnwmCuatE1HSPeXS0Zb1eDZxuTo.qC3ilqpxYxJVkDOwy', 'customer', NULL, '1312345678', 'DBBL', '21739162398163', NULL),
('Sami', 'sami@gmail.com', '$2a$10$V1RfKnWzxrqDI88PagsTfOEhDUNnYoS7L/X6CEtwjdj7qg/MFqgoi', 'admin', 1231, '2313', 'afbkab', '21312312', 9089),
('Wasi', 'wasi@gmail.com', '$2a$10$8J/GIpF1MbCweK3J2lq71Os4p2U9qWHgUJEr8R9yleI9Iy20WBr06', 'customer', 1234567890, '1234567890', 'asdfghjkl', '1234567890', 1234567890);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomId` (`roomId`),
  ADD KEY `customerEmail` (`customerEmail`);

--
-- Indexes for table `otherbooking`
--
ALTER TABLE `otherbooking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facilityId` (`facilityId`),
  ADD KEY `customerEmail` (`customerEmail`);

--
-- Indexes for table `otherfacility`
--
ALTER TABLE `otherfacility`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `bkashNumber` (`bkashNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `otherbooking`
--
ALTER TABLE `otherbooking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `otherfacility`
--
ALTER TABLE `otherfacility`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`customerEmail`) REFERENCES `user` (`email`);

--
-- Constraints for table `otherbooking`
--
ALTER TABLE `otherbooking`
  ADD CONSTRAINT `otherbooking_ibfk_1` FOREIGN KEY (`facilityId`) REFERENCES `otherfacility` (`id`),
  ADD CONSTRAINT `otherbooking_ibfk_2` FOREIGN KEY (`customerEmail`) REFERENCES `user` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
