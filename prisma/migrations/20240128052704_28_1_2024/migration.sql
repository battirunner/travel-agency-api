-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(100) NULL,
    MODIFY `phone` VARCHAR(14) NULL,
    MODIFY `agreement` BOOLEAN NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NULL;
