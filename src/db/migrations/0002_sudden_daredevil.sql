CREATE TABLE `challnegers` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`quiz_id` int NOT NULL,
	`score` json NOT NULL,
	`challenger_id` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `challnegers_id` PRIMARY KEY(`id`)
);
