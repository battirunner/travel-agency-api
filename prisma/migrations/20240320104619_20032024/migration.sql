-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NULL,
    `phone` VARCHAR(14) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NULL,
    `dob` VARCHAR(20) NULL DEFAULT '',
    `agreement` BOOLEAN NULL,
    `role` ENUM('USER', 'ADMIN', 'MODERATOR') NOT NULL DEFAULT 'USER',
    `profile_pic_url` VARCHAR(191) NULL DEFAULT '',
    `active` BOOLEAN NOT NULL DEFAULT true,
    `address` VARCHAR(191) NULL DEFAULT '',
    `postal_code` VARCHAR(191) NULL DEFAULT '',
    `district` VARCHAR(191) NULL DEFAULT '',
    `country` VARCHAR(191) NULL DEFAULT '',
    `passport_no` VARCHAR(191) NULL DEFAULT '',
    `passport_exp_date` VARCHAR(191) NULL DEFAULT '',
    `passport_img_url` VARCHAR(191) NULL DEFAULT '',
    `visa_img_url` VARCHAR(191) NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `emailVerified` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    FULLTEXT INDEX `User_name_email_phone_idx`(`name`, `email`, `phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `VerificationToken_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResetPasswordToken` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ResetPasswordToken_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour_Package` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `start_datetime` VARCHAR(191) NOT NULL,
    `end_datetime` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `guests` INTEGER NOT NULL,
    `included` LONGTEXT NOT NULL,
    `not_included` LONGTEXT NOT NULL,
    `tour_type_id` VARCHAR(191) NULL,
    `departure_location` VARCHAR(191) NOT NULL,
    `map_url` VARCHAR(191) NULL,
    `terms_conditions` LONGTEXT NOT NULL,
    `other_details` LONGTEXT NULL,
    `visa_Category_id` VARCHAR(191) NULL,
    `location_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tour_Package_title_key`(`title`),
    FULLTEXT INDEX `Tour_Package_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour_Type` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `details` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tour_Type_title_key`(`title`),
    FULLTEXT INDEX `Tour_Type_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tag_title_key`(`title`),
    FULLTEXT INDEX `Tag_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour_Package_On_Tag` (
    `tour_package_id` VARCHAR(191) NOT NULL,
    `tag_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`tour_package_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visa_Category` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `details` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Visa_Category_title_key`(`title`),
    FULLTEXT INDEX `Visa_Category_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `type` VARCHAR(10) NOT NULL,
    `tour_Package_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Media_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Location_name_key`(`name`),
    FULLTEXT INDEX `Location_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_relations` (
    `id` VARCHAR(191) NOT NULL,
    `main_location_id` VARCHAR(191) NOT NULL,
    `sub_location_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_form` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `phone` VARCHAR(14) NULL,
    `subject` VARCHAR(191) NULL,
    `message` VARCHAR(191) NULL,
    `sentConfirmation` BOOLEAN NULL,
    `receivedEmail` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `contact_form_email_key`(`email`),
    FULLTEXT INDEX `contact_form_name_email_phone_idx`(`name`, `email`, `phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visa` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `details` LONGTEXT NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `validity` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `min_stay` VARCHAR(191) NOT NULL,
    `visa_category_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `visa_title_key`(`title`),
    UNIQUE INDEX `visa_country_visa_category_id_key`(`country`, `visa_category_id`),
    FULLTEXT INDEX `visa_title_details_country_price_idx`(`title`, `details`, `country`, `price`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `insurance` (
    `id` VARCHAR(191) NOT NULL,
    `insurance_category_id` VARCHAR(191) NULL,
    `title` VARCHAR(255) NOT NULL,
    `details` LONGTEXT NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `insurance_title_key`(`title`),
    FULLTEXT INDEX `insurance_title_details_country_price_idx`(`title`, `details`, `country`, `price`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `insurance_category` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `details` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `insurance_category_title_key`(`title`),
    FULLTEXT INDEX `insurance_category_title_details_idx`(`title`, `details`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_ticket` (
    `id` VARCHAR(191) NOT NULL,
    `start_place` VARCHAR(191) NOT NULL,
    `end_place` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `show_price` BOOLEAN NOT NULL,
    `food` BOOLEAN NOT NULL,
    `baggage` LONGTEXT NOT NULL,
    `policy` LONGTEXT NOT NULL,
    `start_country` VARCHAR(191) NOT NULL,
    `end_country` VARCHAR(191) NOT NULL,
    `refund` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    FULLTEXT INDEX `group_ticket_start_place_end_place_price_start_country_end_c_idx`(`start_place`, `end_place`, `price`, `start_country`, `end_country`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_path` (
    `id` VARCHAR(191) NOT NULL,
    `group_ticket_id` VARCHAR(191) NOT NULL,
    `path_order` INTEGER NOT NULL,
    `path_way` VARCHAR(191) NULL DEFAULT '',
    `departure_place` VARCHAR(191) NOT NULL,
    `departure_airport` VARCHAR(191) NOT NULL,
    `airlines` VARCHAR(191) NULL DEFAULT '',
    `aircraft` VARCHAR(191) NULL DEFAULT '',
    `ticket_class` VARCHAR(191) NULL DEFAULT '',
    `seat_number` VARCHAR(191) NULL DEFAULT '',
    `departure_datetime` VARCHAR(191) NOT NULL,
    `arrival_place` VARCHAR(191) NOT NULL,
    `arrival_airport` VARCHAR(191) NOT NULL,
    `arrival_datetime` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ticket_path_group_ticket_id_path_order_key`(`group_ticket_id`, `path_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `airports` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `iata_code` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `airports_name_key`(`name`),
    UNIQUE INDEX `airports_iata_code_key`(`iata_code`),
    INDEX `airports_iata_code_idx`(`iata_code`),
    INDEX `airports_name_idx`(`name`),
    INDEX `airports_city_idx`(`city`),
    INDEX `airports_country_idx`(`country`),
    FULLTEXT INDEX `airports_name_iata_code_city_country_idx`(`name`, `iata_code`, `city`, `country`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `airlines` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `iata_code` VARCHAR(191) NOT NULL,
    `logo_url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `airlines_name_key`(`name`),
    INDEX `airlines_name_idx`(`name`),
    INDEX `airlines_iata_code_idx`(`iata_code`),
    FULLTEXT INDEX `airlines_name_iata_code_idx`(`name`, `iata_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `country` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `iso_code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `country_name_key`(`name`),
    INDEX `country_name_idx`(`name`),
    INDEX `country_iso_code_idx`(`iso_code`),
    FULLTEXT INDEX `country_name_iso_code_idx`(`name`, `iso_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `booking_user_contact` VARCHAR(191) NOT NULL,
    `booking_user_address` VARCHAR(191) NOT NULL,
    `booking_user_notes` VARCHAR(191) NOT NULL DEFAULT '',
    `booking_item_type` ENUM('VISA', 'HAJJ', 'GROUP_TICKET', 'UMRAH', 'INSURANCE', 'TOURS', 'FLIGHT_TICKET', 'HOTEL') NOT NULL,
    `booking_item_id` VARCHAR(191) NOT NULL,
    `booking_informations` VARCHAR(191) NOT NULL,
    `payment_status` ENUM('PAID', 'UNPAID', 'DUE') NOT NULL,
    `approval_status` ENUM('PENDING', 'PROCESSING', 'READY_TO_RECEIVE', 'RECEIVED', 'COMPLETED') NOT NULL,
    `booking_datetime` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_media` (
    `id` VARCHAR(191) NOT NULL,
    `booking_id` VARCHAR(191) NOT NULL,
    `media_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `booking_id` VARCHAR(191) NULL,
    `payment_gateway_id` VARCHAR(191) NULL,
    `amount` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `payment_status_type` VARCHAR(191) NOT NULL,
    `payment_transaction_token` VARCHAR(191) NOT NULL,
    `payment_reference` VARCHAR(191) NOT NULL DEFAULT '',
    `payment_account_info` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_gateway` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NOT NULL DEFAULT '',
    `related_logo_media_id` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `source_user_id` VARCHAR(191) NOT NULL,
    `action_details` VARCHAR(255) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `read_status` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VerificationToken` ADD CONSTRAINT `VerificationToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResetPasswordToken` ADD CONSTRAINT `ResetPasswordToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tour_Package` ADD CONSTRAINT `Tour_Package_tour_type_id_fkey` FOREIGN KEY (`tour_type_id`) REFERENCES `Tour_Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tour_Package` ADD CONSTRAINT `Tour_Package_visa_Category_id_fkey` FOREIGN KEY (`visa_Category_id`) REFERENCES `Visa_Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tour_Package` ADD CONSTRAINT `Tour_Package_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tour_Package_On_Tag` ADD CONSTRAINT `Tour_Package_On_Tag_tour_package_id_fkey` FOREIGN KEY (`tour_package_id`) REFERENCES `Tour_Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tour_Package_On_Tag` ADD CONSTRAINT `Tour_Package_On_Tag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_tour_Package_id_fkey` FOREIGN KEY (`tour_Package_id`) REFERENCES `Tour_Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visa` ADD CONSTRAINT `visa_visa_category_id_fkey` FOREIGN KEY (`visa_category_id`) REFERENCES `Visa_Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `insurance` ADD CONSTRAINT `insurance_insurance_category_id_fkey` FOREIGN KEY (`insurance_category_id`) REFERENCES `insurance_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket_path` ADD CONSTRAINT `ticket_path_group_ticket_id_fkey` FOREIGN KEY (`group_ticket_id`) REFERENCES `group_ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_media` ADD CONSTRAINT `booking_media_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `booking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_payment_gateway_id_fkey` FOREIGN KEY (`payment_gateway_id`) REFERENCES `payment_gateway`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
