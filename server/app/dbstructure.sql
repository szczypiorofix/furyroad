/**
 * The MIT License
 * Copyright 2019 Piotr Wróblewski.
 *
 * @author Piotr Wróblewski <poczta@wroblewskipiotr.pl>
 * Created: 2019-08-27
 */

SET NAMES 'utf8';
SET CHARACTER SET 'UTF8';

CREATE TABLE IF NOT EXISTS  `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'User ID',
    `email` VARCHAR(30) COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'User mail',
    `password` TEXT COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'User password',
    `date_registered` DATETIME NOT NULL COMMENT 'Registered',
    `date_login` DATETIME NOT NULL COMMENT 'Last online',
    `session_code` CHAR(32) NOT NULL COMMENT 'session code',
    `first_login_failed` INT NOT NULL COMMENT 'Timestamp of first login failure',
    `failed_login_count` INT NOT NULL DEFAULT '0' COMMENT 'Failed login counter',
    PRIMARY KEY(`id`)
)
COMMENT='Users table'
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;


CREATE TABLE IF NOT EXISTS `stats` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Stats ID',
    `userId` INT UNSIGNED NOT NULL COMMENT 'User ID',
    `fuel` INT NOT NULL COMMENT 'Car fuel',
    `maxFuel` INT NOT NULL COMMENT 'Car fuel maximum',
    `water` INT NOT NULL COMMENT 'Car water',
    `food` INT NOT NULL COMMENT 'Food resources',
    `scrap` INT NOT NULL COMMENT 'Scrap resources',
    `carHealth` INT NOT NULL COMMENT 'Car health',
    `carMaxHealth` INT NOT NULL COMMENT 'Car health maximum',
    `carTemperature` INT NOT NULL COMMENT 'Car temperature',
    `carMaxTemperature` INT NOT NULL COMMENT 'Car temperature maximum',
    `distanceDriven` INT NOT NULL COMMENT 'Distance driven',
    `carSpeed` INT NOT NULL COMMENT 'Car speed',
    `carMaxSpeed` INT NOT NULL COMMENT 'Car speed maximum',
    `carFuelUsage` INT NOT NULL COMMENT 'Fuel usage by car',
    `attackRate` INT NOT NULL COMMENT 'Car attack rate',
    `defenseRate` INT NOT NULL COMMENT 'Car defense rate',
    `hoursPassed` INT  NOT NULL COMMENT 'Hours passed',
    `daysPassed` INT  NOT NULL COMMENT 'Days passed',
    `score` INT NOT NULL COMMENT 'Score',
    PRIMARY KEY(`id`),
    FOREIGN KEY(`userId`) REFERENCES `users` (`id`)
)
COMMENT='Stats table'
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;


-- USERS table example
INSERT INTO `users` (`id`, `email`, `password`, `date_registered`, `date_login`, `session_code`, `first_login_failed`, `failed_login_count`) VALUES
(1, 'admin@o2.pl', 'admin1', NOW(), NOW(), '', 0, 0),
(2, 'misiek@o2.pl', 'dupa', NOW(), NOW(), '', 0, 0),
(3, 'misiewicze@o2.pl', 'kaczka', NOW(), NOW(), '', 0, 0),
(4, 'siara@o2.pl', 'siarzasty', NOW(), NOW(), '', 0, 0);


-- STATS table example
INSERT INTO `stats` (`id`, `userId`, `fuel`, `maxFuel`, `water`,
`food`, `scrap`, `carHealth`, `carMaxHealth`, `carTemperature`, `carMaxTemperature`,
`distanceDriven`, `carSpeed`, `carMaxSpeed`, `carFuelUsage`, `attackRate`, `defenseRate`,
`hoursPassed`, `daysPassed`, `score`) VALUES

(1, 1, 20, 20, 20, 20, 0, 100, 100, 80, 120, 0, 0, 160, 0.4, 1, 1, 0, 0, 0),
(2, 2, 40, 70, 40, 60, 70, 95, 100, 95, 120, 123, 0, 160, 0.5, 2, 3, 56, 2, 1230),
(3, 3, 10, 70, 15, 60, 160, 73, 100, 95, 120, 123, 60, 170, 0.6, 3, 3, 59, 2, 1712);

