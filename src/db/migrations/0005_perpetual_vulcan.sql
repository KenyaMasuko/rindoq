CREATE TABLE `quizzes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`creator_id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`is_public` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
