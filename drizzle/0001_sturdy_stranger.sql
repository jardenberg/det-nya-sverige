CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pointId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`authorName` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pointId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `votes_id` PRIMARY KEY(`id`)
);
