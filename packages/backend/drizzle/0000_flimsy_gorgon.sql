CREATE TABLE `cities` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`state` text NOT NULL,
	`country` text NOT NULL,
	`tourist_rating` integer NOT NULL,
	`date_established` text NOT NULL,
	`estimated_population` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
