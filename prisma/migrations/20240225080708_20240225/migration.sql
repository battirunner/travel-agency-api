/*
  Warnings:

  - Added the required column `baggage` to the `group_ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `food` to the `group_ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policy` to the `group_ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `group_ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `show_price` to the `group_ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `group_ticket` ADD COLUMN `baggage` VARCHAR(191) NOT NULL,
    ADD COLUMN `food` BOOLEAN NOT NULL,
    ADD COLUMN `policy` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` VARCHAR(191) NOT NULL,
    ADD COLUMN `show_price` BOOLEAN NOT NULL;
