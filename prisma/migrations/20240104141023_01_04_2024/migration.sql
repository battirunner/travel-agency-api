/*
  Warnings:

  - A unique constraint covering the columns `[uri]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_tour_Package_id_fkey`;

-- AlterTable
ALTER TABLE `media` MODIFY `tour_Package_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Media_uri_key` ON `Media`(`uri`);

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_tour_Package_id_fkey` FOREIGN KEY (`tour_Package_id`) REFERENCES `Tour_Package`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
