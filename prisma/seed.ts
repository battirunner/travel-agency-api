import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("1234", 10);
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      role: "USER",
      password: password,
      emailVerified: true,
      agreement: true,
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      role: "ADMIN",
      password: password,
      emailVerified: true,
      agreement: true,
    },
  });
  //   console.log({ alice, bob });

  const visaCategory1 = await prisma.visa_Category.upsert({
    where: { title: "Tourist" },
    update: {},
    create: {
      title: "Tourist",
      details: "visaCategory1 details",
    },
  });

  const visaCategory2 = await prisma.visa_Category.upsert({
    where: { title: "Business" },
    update: {},
    create: {
      title: "Business",
      details: "visaCategory2 details",
    },
  });

  const visa1Details = JSON.stringify([
    {
      name: "Required Documents",
      items: [
        {
          category_name: "Job Holder",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Visiting card",
            "No objection certificate (NOC)",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Employee Id card copy (One photo copy)",
            "Salary bank statement (Last 06 months) and bank solvency certificate or salary certificate or pay slip",
            "Personal bank solvency certificate",
            "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
          ],
        },
        {
          category_name: "Businessman",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Personal or Company bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
            "Renewal trade license copy with notary public (english translated)",
            "Visiting card",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Memorandum for limited company form page XII (One photo copy)",
            "Company letter head pad",
            "Personal or company bank solvency certificate",
          ],
        },
        {
          category_name: "Government Job Holder",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Visiting card",
            "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Employee Id card copy (One photo copy)",
            "Salary bank statement (Last 06 months) and bank solvency certificate or salary certificate or pay slip",
            "Personal bank solvency certificate",
            "GO (Government order) for official passport",
          ],
        },
        {
          category_name: "Doctor",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Visiting card",
            "BMDC certificate for doctor (Scan copy)",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Personal bank solvency certificate",
            "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.",
          ],
        },
        {
          category_name: "Advocate Lawyer",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Visiting card",
            "BMDC certificate for doctor (Scan copy)",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Personal bank solvency certificate",
            "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.",
          ],
        },
        {
          category_name: "Student",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "ID card (Student) one photocopy both sides",
            "Leave letter from school or collage original copy",
            "Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )",
          ],
        },
        {
          category_name: "Non Student Children",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "ID card (Student) one photocopy both sides",
            "Leave letter from school or collage original copy",
            "Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )",
          ],
        },
        {
          category_name: "Housewife",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "ID card (Student) one photocopy both sides",
            "Leave letter from school or collage original copy",
            "Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )",
          ],
        },
        {
          category_name: "Retired Person",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "ID card (Student) one photocopy both sides",
            "Leave letter from school or collage original copy",
            "Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )",
          ],
        },
        {
          category_name: "Unemployed Person",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "ID card (Student) one photocopy both sides",
            "Leave letter from school or collage original copy",
            "Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )",
          ],
        },
      ],
    },
    {
      name: "Important Notes",
      items: [
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro consequuntur et quos adipisci eum, unde iste vel ut deserunt omnis ab sed tenetur doloremque laudantium cum, placeat odit nesciunt quia sit? Dignissimos aspernatur vero suscipit natus, quas a tempore possimus et sunt itaque unde explicabo reprehenderit quisquam tempora harum expedita!",
      ],
    },
  ]);

  const visa1 = await prisma.visa.upsert({
    where: { title: "Thailand Tourist Visa" },
    update: {},
    create: {
      title: "Thailand Tourist Visa",
      details: visa1Details,
      country: "Thailand",
      validity: "6 months",
      price: "5000",
      min_stay: "1 day",
      visa_category_id: visaCategory1.id,
    },
  });

  const visa2Details = JSON.stringify([
    {
      name: "Required Documents With LOI",
      items: [
        {
          category_name: "Job Holder",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Visiting card",
            "No objection certificate (NOC)",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Employee Id card copy (One photo copy)",
            "Salary bank statement (Last 06 months) and bank solvency certificate or salary certificate or pay slip",
            "Personal bank solvency certificate",
            "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
          ],
        },
        {
          category_name: "Businessman",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Personal or Company bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
            "Renewal trade license copy with notary public (english translated)",
            "Visiting card",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Memorandum for limited company form page XII (One photo copy)",
            "Company letter head pad",
            "Personal or company bank solvency certificate",
          ],
        },
        {
          category_name: "Government Job Holder",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Visiting card",
            "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Employee Id card copy (One photo copy)",
            "Salary bank statement (Last 06 months) and bank solvency certificate or salary certificate or pay slip",
            "Personal bank solvency certificate",
            "GO (Government order) for official passport",
          ],
        },
        {
          category_name: "Doctor",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Visiting card`,
            `BMDC certificate for doctor (Scan copy)`,
            `Marriage certificate copy (if spouse name not mentioned in the passport)`,
            `Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
          ],
        },
        {
          category_name: "Advocate Lawyer",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Visiting card`,
            `BAR council certificate (One photo copy)`,
            `Marriage certificate copy (if spouse name not mentioned in the passport)`,
            `Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
          ],
        },
        {
          category_name: "Student",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `ID card (Student) one photocopy both sides`,
            `Leave letter from school or collage original copy`,
            `Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )`,
          ],
        },
        {
          category_name: "Non Student Children",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Birth certificate`,
            `Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )`,
          ],
        },
        {
          category_name: "Housewife",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Marriage certificate copy (if spouse name not mentioned in the passport) Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
          ],
        },
        {
          category_name: "Retired Person",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Retirement document (Retired Person) one photo copy`,
            `Marriage certificate copy (if spouse name not mentioned in the passport)`,
            `Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
          ],
        },
        {
          category_name: "Unemployed Person",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
            `NID or birth certificate (must) one photo copy`,
          ],
        },
      ],
    },

    {
      name: "Required Documents Without LOI",
      items: [
        {
          category_name: "Job Holder",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Visiting card",
            "No objection certificate (NOC)",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Employee Id card copy (One photo copy)",
            "Salary bank statement (Last 06 months) and bank solvency certificate or salary certificate or pay slip",
            "Personal bank solvency certificate",
            "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
          ],
        },
        {
          category_name: "Businessman",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Personal or Company bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
            "Renewal trade license copy with notary public (english translated)",
            "Visiting card",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Memorandum for limited company form page XII (One photo copy)",
            "Company letter head pad",
            "Personal or company bank solvency certificate",
          ],
        },
        {
          category_name: "Government Job Holder",
          category_items: [
            "07 Months Valid Passport With Old Passport (If have)",
            "Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)",
            "Visiting card",
            "Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant",
            "Marriage certificate copy (if spouse name not mentioned in the passport)",
            "Employee Id card copy (One photo copy)",
            "Salary bank statement (Last 06 months) and bank solvency certificate or salary certificate or pay slip",
            "Personal bank solvency certificate",
            "GO (Government order) for official passport",
          ],
        },
        {
          category_name: "Doctor",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Visiting card`,
            `BMDC certificate for doctor (Scan copy)`,
            `Marriage certificate copy (if spouse name not mentioned in the passport)`,
            `Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
          ],
        },
        {
          category_name: "Advocate Lawyer",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Visiting card`,
            `BAR council certificate (One photo copy)`,
            `Marriage certificate copy (if spouse name not mentioned in the passport)`,
            `Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
          ],
        },
        {
          category_name: "Student",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `ID card (Student) one photocopy both sides`,
            `Leave letter from school or collage original copy`,
            `Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )`,
          ],
        },
        {
          category_name: "Non Student Children",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Birth certificate`,
            `Parents bank statement (Last 06 months) & solvency certificate ( Minimum balance BDT 70,000 for each applicant )`,
          ],
        },
        {
          category_name: "Housewife",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Marriage certificate copy (if spouse name not mentioned in the passport) Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
          ],
        },
        {
          category_name: "Retired Person",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Retirement document (Retired Person) one photo copy`,
            `Marriage certificate copy (if spouse name not mentioned in the passport)`,
            `Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
          ],
        },
        {
          category_name: "Unemployed Person",
          category_items: [
            `07 Months Valid Passport With Old Passport (If have)`,
            `Recent 2 copy photograph taken in last 3 months (white background only, photo size 35 mm X 45 mm)`,
            `Personal bank solvency certificate`,
            `Personal bank statement of last 06 months and minimum balance BDT 70,000 for each applicant.`,
            `NID or birth certificate (must) one photo copy`,
          ],
        },
      ],
    },
    {
      name: "Important Notes",
      items: [
        "Please contact the Visa department for Document processing after the payment. Visa rate may change without any prior notice",
      ],
    },
  ]);

  const visa2 = await prisma.visa.upsert({
    where: { title: "Singapore Tourist Visa" },
    update: {},
    create: {
      title: "Singapore Tourist Visa",
      details: visa2Details,
      country: "Singapore",
      validity: "6 months",
      price: "5000",
      min_stay: "1 day",
      visa_category_id: visaCategory1.id,
    },
  });

  const insuranceCategory1 = await prisma.insurance_category.upsert({
    where: { title: "Travel Insurance" },
    update: {},
    create: {
      title: "Travel Insurance",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, nesciunt saepe reiciendis consectetur quaerat veniam magnam natus ipsum deserunt eius?",
    },
  });

  const insurance1 = await prisma.insurance.upsert({
    where: { title: "Australia Travel Insurance" },
    update: {},
    create: {
      title: "Australia Travel Insurance",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, nesciunt saepe reiciendis consectetur quaerat veniam magnam natus ipsum deserunt eius?",
      country: "Australia",
      duration: "180 days",
      price: "5000",
      insurance_category_id: insuranceCategory1.id,
    },
  });

  const tourType1 = await prisma.tour_Type.upsert({
    where: { title: "Adventure" },
    update: {},
    create: {
      title: "Adventure",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, nesciunt saepe reiciendis consectetur quaerat veniam magnam natus ipsum deserunt eius?",
    },
  });

  const location1 = await prisma.location.upsert({
    where: { name: "Phuket" },
    update: {},
    create: {
      name: "Phuket, Thailand",
      type: "Phuket province is located in southern Thailand. It is the biggest Island of Thailand and sits on the Andaman sea.",
    },
  });

  const tourPackage1Description = JSON.stringify([
    {
      name: "Description",
      items: [
        `Escape to the tropical haven of Phuket, Thailand's largest island, where breathtaking landscapes, pristine beaches, and vibrant culture await. This enchanting tour offers a perfect blend of relaxation and adventure, making it an ideal getaway for travelers seeking an unforgettable island escape.`,

        `Upon arrival, you'll be greeted with warm hospitality and transferred to your luxurious beachfront resort.`,

        `The tour will take you on a journey of exploration, from the stunning beaches of Patong, Kata, and Karon to the lush greenery of Sirinat National Park. Dive into the crystal-clear waters of Phi Phi Islands, renowned for their vibrant coral reefs and marine life, or take a leisurely boat trip to Phang Nga Bay to marvel at the famous James Bond Island and unique limestone formations.`,

        `In addition to island-hopping, immerse yourself in Thai culture as you visit colorful temples, bustling local markets, and experience traditional Thai cuisine.`,

        `Whether you seek relaxation on pristine shores or thrill-seeking adventures in the sea, Phuket's captivating beauty will leave you with cherished memories for a lifetime.`,
      ],
    },
    {
      name: "Highlights:",
      items: [
        `Explore the best beaches of Phuket, from lively Patong to serene Kata and Karon. Discover the exotic underwater world through snorkeling or scuba diving at Phi Phi Islands.`,
        `Cruise through Phang Nga Bay to see the famous James Bond Island and stunning limestone formations.`,
        `Visit iconic temples, such as the Big Buddha and Wat Chalong, to experience Thai spiritual traditions.`,
        `Delight your taste buds with authentic Thai cuisine at local restaurants and street food vendors.`,
        `Enjoy free time for leisure, relaxation, and optional activities to tailor the tour to your preferences.`,
        `Experience the vibrant nightlife in Patong with a mix of bars, restaurants, and entertainment venues.`,
      ],
    },
    {
      name: "Plans",
      items: [
        {
          plan_day: "Day 1",
          plan_description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum animi, quasi veniam sequi doloribus tempora, saepe iste ad, blanditiis labore quisquam asperiores voluptas reprehenderit dolor sit? Nisi ipsa maxime, at minima expedita, doloremque soluta rem officiis accusamus nulla non sapiente neque explicabo voluptate amet labore hic error numquam ullam esse?`,
        },
        {
          plan_day: "Day 2",
          plan_description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum animi, quasi veniam sequi doloribus tempora, saepe iste ad, blanditiis labore quisquam asperiores voluptas reprehenderit dolor sit? Nisi ipsa maxime, at minima expedita, doloremque soluta rem officiis accusamus nulla non sapiente neque explicabo voluptate amet labore hic error numquam ullam esse?`,
        },
        {
          plan_day: "Day 3",
          plan_description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum animi, quasi veniam sequi doloribus tempora, saepe iste ad, blanditiis labore quisquam asperiores voluptas reprehenderit dolor sit? Nisi ipsa maxime, at minima expedita, doloremque soluta rem officiis accusamus nulla non sapiente neque explicabo voluptate amet labore hic error numquam ullam esse?`,
        },
        {
          plan_day: "Day 4",
          plan_description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum animi, quasi veniam sequi doloribus tempora, saepe iste ad, blanditiis labore quisquam asperiores voluptas reprehenderit dolor sit? Nisi ipsa maxime, at minima expedita, doloremque soluta rem officiis accusamus nulla non sapiente neque explicabo voluptate amet labore hic error numquam ullam esse?`,
        },
        {
          plan_day: "Day 5",
          plan_description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum animi, quasi veniam sequi doloribus tempora, saepe iste ad, blanditiis labore quisquam asperiores voluptas reprehenderit dolor sit? Nisi ipsa maxime, at minima expedita, doloremque soluta rem officiis accusamus nulla non sapiente neque explicabo voluptate amet labore hic error numquam ullam esse?`,
        },
      ],
    },
  ]);

  const tourPackage1Included = JSON.stringify([
    `Accommodation: Luxurious beachfront resort accommodation during the entire tour, providing comfort and relaxation.`,
    `Transportation: 100% free air transportation to and from Phuket, Thailand.`,
    `Hotel: 100% free hotel accommodation to and from Phuket, Thailand.`,
    `Flight: 100% free flight accommodation to and from Phuket, Thailand.`,
    `Cruise: 100% free cruise accommodation to and from Phuket, Thailand.`,
    `Entertainment: 100% free entertainment accommodation to and from Phuket, Thailand.`,
    `Golf: 100% free golf accommodation to and from Phuket, Thailand.`,
    `Hiking: 100% free hiking accommodation to and from Phuket, Thailand.`,
    `Swimming: 100% free swimming accommodation to and from Phuket, Thailand.`,
    `Camping: 100% free camping accommodation to and from Phuket, Thailand.`,
  ]);
  const tourPackage1NotIncluded = JSON.stringify([
    `International Flights: Airfare to and from Phuket is not included, giving you the flexibility to book flights according to your convenience.`,
    `International Hotels: Hotel accommodation to and from Phuket is not included, giving you the flexibility to book hotels according to your convenience.`,
    `International Cruises: Cruise accommodation to and from Phuket is not included, giving you the flexibility to book cruises according to your convenience.`,
    `International Entertainment: Entertainment accommodation to and from Phuket is not included, giving you the flexibility to book entertainment according to your convenience.`,
    `International Golf: Golf accommodation to and from Phuket is not included, giving you the flexibility to book golf according to your convenience.`,
    `International Hiking: Hiking accommodation to and from Phuket is not included, giving you the flexibility to book hiking according to your convenience.`,
    `International Swimming: Swimming accommodation to and from Phuket is not included, giving you the flexibility to book swimming according to your convenience.`,
  ]);
  const tourPackage1Terms = JSON.stringify([
    `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore aspernatur libero cum, consequuntur explicabo pariatur sapiente iure iusto labore ad laudantium reiciendis rem quis ipsa. Aliquid vero molestias facere porro voluptates nihil debitis iste praesentium repudiandae repellendus doloribus quia, minima sequi obcaecati id. Quod, necessitatibus eveniet provident iure ad sint dolorem dicta veniam dolores, rem enim sequi ratione incidunt eaque suscipit quos delectus ab molestias, ipsa aperiam. Accusamus doloremque totam sit eos aspernatur, aliquid rem et praesentium, quidem reprehenderit possimus voluptatem esse nostrum quibusdam nemo atque tenetur debitis perspiciatis laboriosam mollitia dicta unde iste saepe. Iste suscipit dolor facilis recusandae.`,
  ]);
  const tourPackage1Other = JSON.stringify([
    `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore aspernatur libero cum, consequuntur explicabo pariatur sapiente iure iusto labore ad laudantium reiciendis rem quis ipsa. Aliquid vero molestias facere porro voluptates nihil debitis iste praesentium repudiandae repellendus doloribus quia, minima sequi obcaecati id. Quod, necessitatibus eveniet provident iure ad sint dolorem dicta veniam dolores, rem enim sequi ratione incidunt eaque suscipit quos delectus ab molestias, ipsa aperiam. Accusamus doloremque totam sit eos aspernatur, aliquid rem et praesentium, quidem reprehenderit possimus voluptatem esse nostrum quibusdam nemo atque tenetur debitis perspiciatis laboriosam mollitia dicta unde iste saepe. Iste suscipit dolor facilis recusandae.`,
  ]);

  const tourPackage1 = await prisma.tour_Package.upsert({
    where: { title: "The Allure of Thailand's Stunning Phuket" },
    update: {},
    create: {
      title: "The Allure of Thailand's Stunning Phuket",
      description: tourPackage1Description,
      duration: "4 Days 5 Nights",
      start_datetime: "2024/05/02",
      end_datetime: "2024/05/07",
      price: "10000",
      guests: 10,
      included: tourPackage1Included,
      not_included: tourPackage1NotIncluded,
      tour_type_id: tourType1.id,
      departure_location: "Muscat International Airport, Muscat",
      map_url: "",
      terms_conditions: tourPackage1Terms,
      other_details: tourPackage1Other,
      visa_Category_id: visaCategory1.id,
      location_id: location1.id,
    },
  });

  const visaCategory3 = await prisma.visa_Category.upsert({
    where: { title: "Hajj Visa" },
    update: {},
    create: {
      title: "Hajj Visa",
      details: "visaCategory3 details",
    },
  });

  const tourType2 = await prisma.tour_Type.upsert({
    where: { title: "Hajj" },
    update: {},
    create: {
      title: "Hajj",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, nesciunt saepe reiciendis consectetur quaerat veniam magnam natus ipsum deserunt eius?",
    },
  });

  const location2 = await prisma.location.upsert({
    where: { name: "Saudi Arabia" },
    update: {},
    create: {
      name: "Saudi Arabia",
      type: "Saudi Arabia officially the Kingdom of Saudi Arabia (KSA) is a country in West Asia and the Middle East.",
    },
  });

  const HajjPackage1Description = JSON.stringify([
    {
      name: "Description",
      items: [
        `The General Package is called as Shifting Hajj Package.
    The hajjis are always moved from one apartment to another providing habitation away from Haram during the top days of Hajj in General Hajj packages and then bringing them close to Haram when Hajj days are over.`,
      ],
    },
    {
      name: "Highlights:",
      items: [],
    },
    {
      name: "Plans",
      items: [
        {
          plan_day: "Day 1",
          plan_description: `Departure from Dhaka to Jeddah. Transfer from Jeddah Airport to the Makkah Hotel. Check-in hotel, SAME DAY PERFORM UMRAH.`,
        },
        {
          plan_day: "Day 2",
          plan_description: `Makkah Ziyarah`,
        },
        {
          plan_day: "Day 3 to 20",
          plan_description: `Focus on your regular ibadah`,
        },
        {
          plan_day: "Day 21",
          plan_description: `Check out from the Makkah Hotel, transfer to Madinah Hotel, Focus on your regular Prayers and Ibadah.`,
        },
        {
          plan_day: "Day 22",
          plan_description: `Madinah Ziyarah`,
        },
        {
          plan_day: "Day 23 to 28",
          plan_description: `Madinah Ziyarah`,
        },
        {
          plan_day: "Day 29",
          plan_description: `Check out from the Madinah Hotel, transfer to Madinah Hotel, Focus on your regular Prayers and Ibadah.`,
        },
        {
          plan_day: "Day 30 to 32",
          plan_description: `Shisha Ziyarah`,
        },
        {
          plan_day: "Day 33",
          plan_description: `Madinah Ziyarah`,
        },
        {
          plan_day: "Day 34",
          plan_description: `Mina Arafah Hazz day`,
        },
        {
          plan_day: "Day 35",
          plan_description: `Mina  Arafah  Muzdalifah (Hajj Day)`,
        },
        {
          plan_day: "Day 36",
          plan_description: `Mina  Jamarat  Mina`,
        },
        {
          plan_day: "Day 37",
          plan_description: `Mina  Jamarat  Shisha`,
        },
        {
          plan_day: "Day 38",
          plan_description: `Shisha`,
        },
        {
          plan_day: "Day 39",
          plan_description: `Shisha`,
        },
        {
          plan_day: "Day 40",
          plan_description: `Shisha - Jeddah - Dhaka`,
        },
      ],
    },
  ]);

  const HajjPackage1Included = JSON.stringify([
    `Hajj visa`,
    `Economy-class return air ticket with Saudia / Biman`,
    `Standard accommodation in Makkah - Approx 1500 meters`,
    `Economy accommodation in Madinah -  Approx 1500 meters`,
    `Bangladeshi Lunch, Dinner & Breakfast`,
    `Economy Moallem ( Air cooling Tent ) service in Mina-Arafat`,
    `Group Ziarah in Makkah & Madinah`,
    `Religious guide assistance during Hajj days`,
    `Bangladeshi service team support in Makkah & Madinah`,
  ]);
  const HajjPackage1NotIncluded = JSON.stringify([
    `Kurbani cost, amount SR 750 /person `,
    `Personal expenditures, like Bottled water, laundry service, etc...`,
    `Any item/service that is not stated here`,
    `Personal transport service`,
  ]);
  const HajjPackage1Terms = JSON.stringify([
    `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore aspernatur libero cum, consequuntur explicabo pariatur sapiente iure iusto labore ad laudantium reiciendis rem quis ipsa. Aliquid vero molestias facere porro voluptates nihil debitis iste praesentium repudiandae repellendus doloribus quia, minima sequi obcaecati id. Quod, necessitatibus eveniet provident iure ad sint dolorem dicta veniam dolores, rem enim sequi ratione incidunt eaque suscipit quos delectus ab molestias, ipsa aperiam. Accusamus doloremque totam sit eos aspernatur, aliquid rem et praesentium, quidem reprehenderit possimus voluptatem esse nostrum quibusdam nemo atque tenetur debitis perspiciatis laboriosam mollitia dicta unde iste saepe. Iste suscipit dolor facilis recusandae.`,
  ]);
  const HajjPackage1Other = JSON.stringify([
    `Emergency Medical Services, Group discussions, Experienced religious guides, and service assistants in Saudi Arabia, and our team is always ready 24/7 to fulfill your needs.`,
  ]);

  const HajjPackage1 = await prisma.tour_Package.upsert({
    where: { title: "40 Days Shifting Hajj Package 2024" },
    update: {},
    create: {
      title: "40 Days Shifting Hajj Package 2024",
      description: HajjPackage1Description,
      duration: "40 Days",
      start_datetime: "2024/05/02",
      end_datetime: "2024/05/07",
      price: "1000000",
      guests: 20,
      included: HajjPackage1Included,
      not_included: HajjPackage1NotIncluded,
      tour_type_id: tourType2.id,
      departure_location: "Hazrat Shahjalal International Airport, Dhaka",
      map_url: "",
      terms_conditions: HajjPackage1Terms,
      other_details: HajjPackage1Other,
      visa_Category_id: visaCategory3.id,
      location_id: location2.id,
    },
  });

  //   const location3 = await prisma.location.upsert({
  //     where: { name: "Phuket" },
  //     update: {},
  //     create: {
  //       name: "Phuket, Thailand",
  //       type: "",
  //     },
  //   });

  const tourType3 = await prisma.tour_Type.upsert({
    where: { title: "Umrah" },
    update: {},
    create: {
      title: "Umrah",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, nesciunt saepe reiciendis consectetur quaerat veniam magnam natus ipsum deserunt eius?",
    },
  });

  const umrahPackage1Description = JSON.stringify([
    {
      name: "Description",
      items: [
        `Umrah Package is not only offering you the best Umrah packages from Bangladesh but also ensures you perform your long desired journey to the two holy cities Makkah and Madinah.

        Our most knowledgeable and experienced Mu'allim will guide you towards the journey to the holiest sites in Islam.`,
      ],
    },
    {
      name: "Highlights:",
      items: [],
    },
    {
      name: "Plans",
      items: [
        {
          plan_day: "Day 1",
          plan_description: `Dhaka - Jeddah - Makkah (Umrah)`,
        },
        {
          plan_day: "Day 2",
          plan_description: `Makka Ziyarah`,
        },
        {
          plan_day: "Day 3 to 8",
          plan_description: `Makkah (Jummah)`,
        },
        {
          plan_day: "Day 9",
          plan_description: `Makkah Madinah`,
        },
        {
          plan_day: "Day 10",
          plan_description: `Madinah Ziyarah`,
        },
        {
          plan_day: "Day 11 to 13",
          plan_description: `Madinah Ziyarah`,
        },
        {
          plan_day: "Day 14",
          plan_description: `Madinah - Dhaka.`,
        },
      ],
    },
  ]);

  const umrahPackage1Included = JSON.stringify([
    "Umrah Visa with all charges",
    "Health insurance",
    "Return air tickets with Transit like (Saudia Airlines, Emirates, IndiGo, Vistara, Oman Air etc",
    "Meet & assist on arrival at Jeddah airport",
    "Accommodation in Makkah & Madinah",
    "Transportation from Makkah - Madinah - Madinah airport by Bus",
    "Bengali speaking Muallim/ guideline",
    "Makkah Hotel- Sarh Al Manamah -5 or Similar",
    "Madina Hotel- Rama Al Madinah or similar",
  ]);
  const umrahPackage1NotIncluded = JSON.stringify([
    "PCR Test before flight from Bangladesh & KSA (if require).",
    "Food (Breakfast/lunch/dinner) not included with the package price for Makkah / Madinah (where not specified), but available at hotel or restaurant (Approx. SR25/per lunch or dinner). Food Menu for Lunch & Dinner: Chicken / Fish, Vegetable / Vorta / Shak, Dall, Plain Rice.",
    "Any kinds of personal cost or others which are not mentioned above.",
  ]);
  const umrahPackage1Terms = JSON.stringify([
    `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore aspernatur libero cum, consequuntur explicabo pariatur sapiente iure iusto labore ad laudantium reiciendis rem quis ipsa. Aliquid vero molestias facere porro voluptates nihil debitis iste praesentium repudiandae repellendus doloribus quia, minima sequi obcaecati id. Quod, necessitatibus eveniet provident iure ad sint dolorem dicta veniam dolores, rem enim sequi ratione incidunt eaque suscipit quos delectus ab molestias, ipsa aperiam. Accusamus doloremque totam sit eos aspernatur, aliquid rem et praesentium, quidem reprehenderit possimus voluptatem esse nostrum quibusdam nemo atque tenetur debitis perspiciatis laboriosam mollitia dicta unde iste saepe. Iste suscipit dolor facilis recusandae.`,
  ]);

  const umrahPackage1Other = JSON.stringify([
    `Emergency Medical Services, Group discussions, Experienced religious guides, and service assistants in Saudi Arabia, and our team is always ready 24/7 to fulfill your needs.`,
  ]);

  const umrahPackage1 = await prisma.tour_Package.upsert({
    where: { title: "Umrah Package Economy" },
    update: {},
    create: {
      title: "Umrah Package Economy",
      description: umrahPackage1Description,
      duration: "14 Days",
      start_datetime: "2024/05/02",
      end_datetime: "2024/05/07",
      price: "10000",
      guests: 15,
      included: umrahPackage1Included,
      not_included: umrahPackage1NotIncluded,
      tour_type_id: tourType3.id,
      departure_location: "Hazrat Shahjalal International Airport, Dhaka",
      map_url: "",
      terms_conditions: umrahPackage1Terms,
      other_details: umrahPackage1Other,
      visa_Category_id: visaCategory3.id,
      location_id: location2.id,
    },
  });

  const airlines1 = await prisma.airlines.upsert({
    where: { name: "China Eastern Airlines" },
    update: {},
    create: {
      name: "China Eastern Airlines",
      iata_code: "MU",
      logo_url: "",
    },
  });
  const airlines2 = await prisma.airlines.upsert({
    where: { name: "Singapore Airlines" },
    update: {},
    create: {
      name: "Singapore Airlines",
      iata_code: "SQ",
      logo_url: "",
    },
  });
  const airlines3 = await prisma.airlines.upsert({
    where: { name: "Qatar Airways" },
    update: {},
    create: {
      name: "Qatar Airways",
      iata_code: "QR",
      logo_url: "",
    },
  });
  const airlines4 = await prisma.airlines.upsert({
    where: { name: "Malaysia Airlines" },
    update: {},
    create: {
      name: "Malaysia Airlines",
      iata_code: "MH",
      logo_url: "",
    },
  });
  const airlines5 = await prisma.airlines.upsert({
    where: { name: "Thai Airways International" },
    update: {},
    create: {
      name: "Thai Airways International",
      iata_code: "TG",
      logo_url: "",
    },
  });
  const airlines6 = await prisma.airlines.upsert({
    where: { name: "Biman Bangladesh Airlines" },
    update: {},
    create: {
      name: "Biman Bangladesh Airlines",
      iata_code: "BG",
      logo_url: "",
    },
  });
  const airlines7 = await prisma.airlines.upsert({
    where: { name: "Turkish Airlines" },
    update: {},
    create: {
      name: "Turkish Airlines",
      iata_code: "TK",
      logo_url: "",
    },
  });
  const airlines8 = await prisma.airlines.upsert({
    where: { name: "Emirates" },
    update: {},
    create: {
      name: "Emirates",
      iata_code: "EK",
      logo_url: "",
    },
  });

  const airport1 = await prisma.airports.upsert({
    where: { name: "Hazrat Shahjalal International Airport" },
    update: {},
    create: {
      name: "Hazrat Shahjalal International Airport",
      city: "Dhaka",
      country: "Bangladesh",
      iata_code: "DAC",
    },
  });

  const airport2 = await prisma.airports.upsert({
    where: { name: "Narita International Airport" },
    update: {},
    create: {
      name: "Narita International Airport",
      city: "Tokyo",
      country: "JAPAN",
      iata_code: "NRT",
    },
  });

  const airport3 = await prisma.airports.upsert({
    where: { name: "Kunming Changshui International Airport" },
    update: {},
    create: {
      name: "Kunming Changshui International Airport",
      city: "Kunming",
      country: "China",
      iata_code: "KMG",
    },
  });

  const airport4 = await prisma.airports.upsert({
    where: { name: "Shanghai Hongqiao International Airport" },
    update: {},
    create: {
      name: "Shanghai Hongqiao International Airport",
      city: "Shanghai",
      country: "China",
      iata_code: "SHA",
    },
  });

  const airport5 = await prisma.airports.upsert({
    where: { name: "Shanghai Pudong International Airport" },
    update: {},
    create: {
      name: "Shanghai Pudong International Airport",
      city: "Shanghai",
      country: "China",
      iata_code: "PVG",
    },
  });

  const airport6 = await prisma.airports.upsert({
    where: { name: "Singapore Changi Airport" },
    update: {},
    create: {
      name: "Singapore Changi Airport",
      city: "Metropolitan Area",
      country: "Singapore",
      iata_code: "SIN",
    },
  });

  const airport7 = await prisma.airports.upsert({
    where: { name: "Xiaoshan Intl" },
    update: {},
    create: {
      name: "Xiaoshan Intl",
      city: "Hangzhou",
      country: "China",
      iata_code: "HGH",
    },
  });

  const airport8 = await prisma.airports.upsert({
    where: { name: "Hamad International Airport" },
    update: {},
    create: {
      name: "Hamad International Airport",
      city: "Doha",
      country: "Qatar",
      iata_code: "DOH",
    },
  });

  const airport9 = await prisma.airports.upsert({
    where: { name: "Kuala Lumpur International Airport" },
    update: {},
    create: {
      name: "Kuala Lumpur International Airport",
      city: "Kuala Lumpur",
      country: "Malaysia",
      iata_code: "KUL",
    },
  });

  const airport10 = await prisma.airports.upsert({
    where: { name: "Suvarnabhumi Airport" },
    update: {},
    create: {
      name: "Suvarnabhumi Airport",
      city: "Bangkok",
      country: "Thailand",
      iata_code: "BKK",
    },
  });

  const airport11 = await prisma.airports.upsert({
    where: { name: "Incheon International Airport" },
    update: {},
    create: {
      name: "Incheon International Airport",
      city: "Seoul",
      country: "South Korea",
      iata_code: "ICN",
    },
  });

  const groupTicket1 = await prisma.group_ticket.create({
    data: {
      start_place: "Dhaka",
      end_place: "Tokyo",
      price: "66509",
      country:"Japan",
      show_price: true,
      food: true,
      baggage: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eius nostrum ea optio ipsam laudantium consequuntur incidunt rerum, accusamus dolorem delectus mollitia molestiae sed quod quisquam eligendi temporibus dolores, quibusdam deserunt necessitatibus animi doloremque modi. Velit fuga expedita incidunt eligendi eveniet non itaque repellendus saepe porro temporibus consectetur ea ipsa culpa repudiandae distinctio quae ad, nostrum omnis impedit commodi. Temporibus veritatis aut ipsum. Exercitationem, tenetur explicabo reprehenderit blanditiis neque nemo sed fugit quae modi minima ratione quasi inventore dolorum veritatis voluptas sit? Nulla, pariatur blanditiis voluptas dolorem in quam facere voluptate asperiores voluptatibus vel, quia minima cumque, ipsum quisquam beatae?`,
      policy: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eius nostrum ea optio ipsam laudantium consequuntur incidunt rerum, accusamus dolorem delectus mollitia molestiae sed quod quisquam eligendi temporibus dolores, quibusdam deserunt necessitatibus animi doloremque modi. Velit fuga expedita incidunt eligendi eveniet non itaque repellendus saepe porro temporibus consectetur ea ipsa culpa repudiandae distinctio quae ad, nostrum omnis impedit commodi. Temporibus veritatis aut ipsum. Exercitationem, tenetur explicabo reprehenderit blanditiis neque nemo sed fugit quae modi minima ratione quasi inventore dolorum veritatis voluptas sit? Nulla, pariatur blanditiis voluptas dolorem in quam facere voluptate asperiores voluptatibus vel, quia minima cumque, ipsum quisquam beatae?`,
    },
  });

  const ticketPath1_1 = await prisma.ticket_path.create({
    data: {
      group_ticket_id: groupTicket1.id,
      path_order:1,
      departure_place: "Dhaka",
      departure_airport: "Hazrat Shahjalal International Airport",
      airlines: "Singapore Airlines",
      aircraft: "",
      departure_datetime: "2024/02/28",
      arrival_place: "Singapore",
      arrival_airport: "Singapore Changi Airport",
      arrival_datetime: "2024/02/28",
    },
  });

  // const groupTicketOnPath1_1 = await prisma.group_ticket_on_path.create({
  //   data: {
  //     group_ticket_id: groupTicket1.id,
  //     ticket_path_id: ticketPath1_1.id,
  //     path_order: 1,
  //     path_way: "",
  //   },
  // });

  const ticketPath1_2 = await prisma.ticket_path.create({
    data: {
      group_ticket_id:groupTicket1.id,
      path_order:2,
      departure_place: "Singapore",
      departure_airport: "Singapore Changi Airport",
      airlines: "Singapore Airlines",
      aircraft: "",
      departure_datetime: "2024/02/28",
      arrival_place: "Tokyo",
      arrival_airport: "Narita International Airport",
      arrival_datetime: "2024/02/28",
    },
  });

  // const groupTicketOnPath1_2 = await prisma.group_ticket_on_path.create({
  //   data: {
  //     group_ticket_id: groupTicket1.id,
  //     ticket_path_id: ticketPath1_2.id,
  //     path_order: 2,
  //     path_way: "",
  //   },
  // });

  const groupTicket2 = await prisma.group_ticket.create({
    data: {
      start_place: "Dhaka",
      end_place: "New York",
      country:"United States of America",
      price: "66509",
      show_price: false,
      food: false,
      baggage: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eius nostrum ea optio ipsam laudantium consequuntur incidunt rerum, accusamus dolorem delectus mollitia molestiae sed quod quisquam eligendi temporibus dolores, quibusdam deserunt necessitatibus animi doloremque modi. Velit fuga expedita incidunt eligendi eveniet non itaque repellendus saepe porro temporibus consectetur ea ipsa culpa repudiandae distinctio quae ad, nostrum omnis impedit commodi. Temporibus veritatis aut ipsum. Exercitationem, tenetur explicabo reprehenderit blanditiis neque nemo sed fugit quae modi minima ratione quasi inventore dolorum veritatis voluptas sit? Nulla, pariatur blanditiis voluptas dolorem in quam facere voluptate asperiores voluptatibus vel, quia minima cumque, ipsum quisquam beatae?`,
      policy: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eius nostrum ea optio ipsam laudantium consequuntur incidunt rerum, accusamus dolorem delectus mollitia molestiae sed quod quisquam eligendi temporibus dolores, quibusdam deserunt necessitatibus animi doloremque modi. Velit fuga expedita incidunt eligendi eveniet non itaque repellendus saepe porro temporibus consectetur ea ipsa culpa repudiandae distinctio quae ad, nostrum omnis impedit commodi. Temporibus veritatis aut ipsum. Exercitationem, tenetur explicabo reprehenderit blanditiis neque nemo sed fugit quae modi minima ratione quasi inventore dolorum veritatis voluptas sit? Nulla, pariatur blanditiis voluptas dolorem in quam facere voluptate asperiores voluptatibus vel, quia minima cumque, ipsum quisquam beatae?`,
    },
  });

  const ticketPath2_1 = await prisma.ticket_path.create({
    data: {
      group_ticket_id:groupTicket2.id,
      path_order:1, 
      departure_place: "Dhaka",
      departure_airport: "Hazrat Shahjalal International Airport",
      airlines: "Qatar Airways",
      aircraft: "",
      departure_datetime: "2024/02/27",
      arrival_place: "Doha",
      arrival_airport: "Hamad International Airport",
      arrival_datetime: "2024/02/28",
    },
  });

  // const groupTicketOnPath2_1 = await prisma.group_ticket_on_path.create({
  //   data: {
  //     group_ticket_id: groupTicket2.id,
  //     ticket_path_id: ticketPath2_1.id,
  //     path_order: 1,
  //     path_way: "",
  //   },
  // });

  const ticketPath2_2 = await prisma.ticket_path.create({
    data: {
      group_ticket_id:groupTicket2.id,
      path_order:2, 
      departure_place: "DOHA",
      departure_airport: "Hamad International Airport",
      airlines: "Qatar Airways",
      aircraft: "",
      departure_datetime: "2024/02/27",
      arrival_place: "New York",
      arrival_airport: "John F. Kennedy International Airport",
      arrival_datetime: "2024/02/28",
    },
  });

  // const groupTicketOnPath2_2 = await prisma.group_ticket_on_path.create({
  //   data: {
  //     group_ticket_id: groupTicket2.id,
  //     ticket_path_id: ticketPath2_2.id,
  //     path_order: 2,
  //     path_way: "",
  //   },
  // });

  const countries = await prisma.country.createMany({
    data: [
      { name: "Afghanistan", iso_code: "AF" },
      { name: "Åland Islands", iso_code: "AX" },
      { name: "Albania", iso_code: "AL" },
      { name: "Algeria", iso_code: "DZ" },
      { name: "American Samoa", iso_code: "AS" },
      { name: "AndorrA", iso_code: "AD" },
      { name: "Angola", iso_code: "AO" },
      { name: "Anguilla", iso_code: "AI" },
      { name: "Antarctica", iso_code: "AQ" },
      { name: "Antigua and Barbuda", iso_code: "AG" },
      { name: "Argentina", iso_code: "AR" },
      { name: "Armenia", iso_code: "AM" },
      { name: "Aruba", iso_code: "AW" },
      { name: "Australia", iso_code: "AU" },
      { name: "Austria", iso_code: "AT" },
      { name: "Azerbaijan", iso_code: "AZ" },
      { name: "Bahamas", iso_code: "BS" },
      { name: "Bahrain", iso_code: "BH" },
      { name: "Bangladesh", iso_code: "BD" },
      { name: "Barbados", iso_code: "BB" },
      { name: "Belarus", iso_code: "BY" },
      { name: "Belgium", iso_code: "BE" },
      { name: "Belize", iso_code: "BZ" },
      { name: "Benin", iso_code: "BJ" },
      { name: "Bermuda", iso_code: "BM" },
      { name: "Bhutan", iso_code: "BT" },
      { name: "Bolivia", iso_code: "BO" },
      { name: "Bosnia and Herzegovina", iso_code: "BA" },
      { name: "Botswana", iso_code: "BW" },
      { name: "Bouvet Island", iso_code: "BV" },
      { name: "Brazil", iso_code: "BR" },
      { name: "British Indian Ocean Territory", iso_code: "IO" },
      { name: "Brunei Darussalam", iso_code: "BN" },
      { name: "Bulgaria", iso_code: "BG" },
      { name: "Burkina Faso", iso_code: "BF" },
      { name: "Burundi", iso_code: "BI" },
      { name: "Cambodia", iso_code: "KH" },
      { name: "Cameroon", iso_code: "CM" },
      { name: "Canada", iso_code: "CA" },
      { name: "Cape Verde", iso_code: "CV" },
      { name: "Cayman Islands", iso_code: "KY" },
      { name: "Central African Republic", iso_code: "CF" },
      { name: "Chad", iso_code: "TD" },
      { name: "Chile", iso_code: "CL" },
      { name: "China", iso_code: "CN" },
      { name: "Christmas Island", iso_code: "CX" },
      { name: "Cocos (Keeling) Islands", iso_code: "CC" },
      { name: "Colombia", iso_code: "CO" },
      { name: "Comoros", iso_code: "KM" },
      { name: "Congo", iso_code: "CG" },
      { name: "Congo, The Democratic Republic of the", iso_code: "CD" },
      { name: "Cook Islands", iso_code: "CK" },
      { name: "Costa Rica", iso_code: "CR" },
      { name: 'Cote D"Ivoire', iso_code: "CI" },
      { name: "Croatia", iso_code: "HR" },
      { name: "Cuba", iso_code: "CU" },
      { name: "Cyprus", iso_code: "CY" },
      { name: "Czech Republic", iso_code: "CZ" },
      { name: "Denmark", iso_code: "DK" },
      { name: "Djibouti", iso_code: "DJ" },
      { name: "Dominica", iso_code: "DM" },
      { name: "Dominican Republic", iso_code: "DO" },
      { name: "Ecuador", iso_code: "EC" },
      { name: "Egypt", iso_code: "EG" },
      { name: "El Salvador", iso_code: "SV" },
      { name: "Equatorial Guinea", iso_code: "GQ" },
      { name: "Eritrea", iso_code: "ER" },
      { name: "Estonia", iso_code: "EE" },
      { name: "Ethiopia", iso_code: "ET" },
      { name: "Falkland Islands (Malvinas)", iso_code: "FK" },
      { name: "Faroe Islands", iso_code: "FO" },
      { name: "Fiji", iso_code: "FJ" },
      { name: "Finland", iso_code: "FI" },
      { name: "France", iso_code: "FR" },
      { name: "French Guiana", iso_code: "GF" },
      { name: "French Polynesia", iso_code: "PF" },
      { name: "French Southern Territories", iso_code: "TF" },
      { name: "Gabon", iso_code: "GA" },
      { name: "Gambia", iso_code: "GM" },
      { name: "Georgia", iso_code: "GE" },
      { name: "Germany", iso_code: "DE" },
      { name: "Ghana", iso_code: "GH" },
      { name: "Gibraltar", iso_code: "GI" },
      { name: "Greece", iso_code: "GR" },
      { name: "Greenland", iso_code: "GL" },
      { name: "Grenada", iso_code: "GD" },
      { name: "Guadeloupe", iso_code: "GP" },
      { name: "Guam", iso_code: "GU" },
      { name: "Guatemala", iso_code: "GT" },
      { name: "Guernsey", iso_code: "GG" },
      { name: "Guinea", iso_code: "GN" },
      { name: "Guinea-Bissau", iso_code: "GW" },
      { name: "Guyana", iso_code: "GY" },
      { name: "Haiti", iso_code: "HT" },
      { name: "Heard Island and Mcdonald Islands", iso_code: "HM" },
      { name: "Holy See (Vatican City State)", iso_code: "VA" },
      { name: "Honduras", iso_code: "HN" },
      { name: "Hong Kong", iso_code: "HK" },
      { name: "Hungary", iso_code: "HU" },
      { name: "Iceland", iso_code: "IS" },
      { name: "India", iso_code: "IN" },
      { name: "Indonesia", iso_code: "ID" },
      { name: "Iran, Islamic Republic Of", iso_code: "IR" },
      { name: "Iraq", iso_code: "IQ" },
      { name: "Ireland", iso_code: "IE" },
      { name: "Isle of Man", iso_code: "IM" },
      { name: "Israel", iso_code: "IL" },
      { name: "Italy", iso_code: "IT" },
      { name: "Jamaica", iso_code: "JM" },
      { name: "Japan", iso_code: "JP" },
      { name: "Jersey", iso_code: "JE" },
      { name: "Jordan", iso_code: "JO" },
      { name: "Kazakhstan", iso_code: "KZ" },
      { name: "Kenya", iso_code: "KE" },
      { name: "Kiribati", iso_code: "KI" },
      { name: 'Korea, Democratic People"S Republic of', iso_code: "KP" },
      { name: "Korea, Republic of", iso_code: "KR" },
      { name: "Kuwait", iso_code: "KW" },
      { name: "Kyrgyzstan", iso_code: "KG" },
      { name: 'Lao People"S Democratic Republic', iso_code: "LA" },
      { name: "Latvia", iso_code: "LV" },
      { name: "Lebanon", iso_code: "LB" },
      { name: "Lesotho", iso_code: "LS" },
      { name: "Liberia", iso_code: "LR" },
      { name: "Libyan Arab Jamahiriya", iso_code: "LY" },
      { name: "Liechtenstein", iso_code: "LI" },
      { name: "Lithuania", iso_code: "LT" },
      { name: "Luxembourg", iso_code: "LU" },
      { name: "Macao", iso_code: "MO" },
      { name: "Macedonia, The Former Yugoslav Republic of", iso_code: "MK" },
      { name: "Madagascar", iso_code: "MG" },
      { name: "Malawi", iso_code: "MW" },
      { name: "Malaysia", iso_code: "MY" },
      { name: "Maldives", iso_code: "MV" },
      { name: "Mali", iso_code: "ML" },
      { name: "Malta", iso_code: "MT" },
      { name: "Marshall Islands", iso_code: "MH" },
      { name: "Martinique", iso_code: "MQ" },
      { name: "Mauritania", iso_code: "MR" },
      { name: "Mauritius", iso_code: "MU" },
      { name: "Mayotte", iso_code: "YT" },
      { name: "Mexico", iso_code: "MX" },
      { name: "Micronesia, Federated States of", iso_code: "FM" },
      { name: "Moldova, Republic of", iso_code: "MD" },
      { name: "Monaco", iso_code: "MC" },
      { name: "Mongolia", iso_code: "MN" },
      { name: "Montserrat", iso_code: "MS" },
      { name: "Morocco", iso_code: "MA" },
      { name: "Mozambique", iso_code: "MZ" },
      { name: "Myanmar", iso_code: "MM" },
      { name: "Namibia", iso_code: "NA" },
      { name: "Nauru", iso_code: "NR" },
      { name: "Nepal", iso_code: "NP" },
      { name: "Netherlands", iso_code: "NL" },
      { name: "Netherlands Antilles", iso_code: "AN" },
      { name: "New Caledonia", iso_code: "NC" },
      { name: "New Zealand", iso_code: "NZ" },
      { name: "Nicaragua", iso_code: "NI" },
      { name: "Niger", iso_code: "NE" },
      { name: "Nigeria", iso_code: "NG" },
      { name: "Niue", iso_code: "NU" },
      { name: "Norfolk Island", iso_code: "NF" },
      { name: "Northern Mariana Islands", iso_code: "MP" },
      { name: "Norway", iso_code: "NO" },
      { name: "Oman", iso_code: "OM" },
      { name: "Pakistan", iso_code: "PK" },
      { name: "Palau", iso_code: "PW" },
      { name: "Palestinian Territory, Occupied", iso_code: "PS" },
      { name: "Panama", iso_code: "PA" },
      { name: "Papua New Guinea", iso_code: "PG" },
      { name: "Paraguay", iso_code: "PY" },
      { name: "Peru", iso_code: "PE" },
      { name: "Philippines", iso_code: "PH" },
      { name: "Pitcairn", iso_code: "PN" },
      { name: "Poland", iso_code: "PL" },
      { name: "Portugal", iso_code: "PT" },
      { name: "Puerto Rico", iso_code: "PR" },
      { name: "Qatar", iso_code: "QA" },
      { name: "Reunion", iso_code: "RE" },
      { name: "Romania", iso_code: "RO" },
      { name: "Russian Federation", iso_code: "RU" },
      { name: "RWANDA", iso_code: "RW" },
      { name: "Saint Helena", iso_code: "SH" },
      { name: "Saint Kitts and Nevis", iso_code: "KN" },
      { name: "Saint Lucia", iso_code: "LC" },
      { name: "Saint Pierre and Miquelon", iso_code: "PM" },
      { name: "Saint Vincent and the Grenadines", iso_code: "VC" },
      { name: "Samoa", iso_code: "WS" },
      { name: "San Marino", iso_code: "SM" },
      { name: "Sao Tome and Principe", iso_code: "ST" },
      { name: "Saudi Arabia", iso_code: "SA" },
      { name: "Senegal", iso_code: "SN" },
      { name: "Serbia and Montenegro", iso_code: "CS" },
      { name: "Seychelles", iso_code: "SC" },
      { name: "Sierra Leone", iso_code: "SL" },
      { name: "Singapore", iso_code: "SG" },
      { name: "Slovakia", iso_code: "SK" },
      { name: "Slovenia", iso_code: "SI" },
      { name: "Solomon Islands", iso_code: "SB" },
      { name: "Somalia", iso_code: "SO" },
      { name: "South Africa", iso_code: "ZA" },
      { name: "South Georgia and the South Sandwich Islands", iso_code: "GS" },
      { name: "Spain", iso_code: "ES" },
      { name: "Sri Lanka", iso_code: "LK" },
      { name: "Sudan", iso_code: "SD" },
      { name: "Suriname", iso_code: "SR" },
      { name: "Svalbard and Jan Mayen", iso_code: "SJ" },
      { name: "Swaziland", iso_code: "SZ" },
      { name: "Sweden", iso_code: "SE" },
      { name: "Switzerland", iso_code: "CH" },
      { name: "Syrian Arab Republic", iso_code: "SY" },
      { name: "Taiwan", iso_code: "TW" },
      { name: "Tajikistan", iso_code: "TJ" },
      { name: "Tanzania, United Republic of", iso_code: "TZ" },
      { name: "Thailand", iso_code: "TH" },
      { name: "Timor-Leste", iso_code: "TL" },
      { name: "Togo", iso_code: "TG" },
      { name: "Tokelau", iso_code: "TK" },
      { name: "Tonga", iso_code: "TO" },
      { name: "Trinidad and Tobago", iso_code: "TT" },
      { name: "Tunisia", iso_code: "TN" },
      { name: "Turkey", iso_code: "TR" },
      { name: "Turkmenistan", iso_code: "TM" },
      { name: "Turks and Caicos Islands", iso_code: "TC" },
      { name: "Tuvalu", iso_code: "TV" },
      { name: "Uganda", iso_code: "UG" },
      { name: "Ukraine", iso_code: "UA" },
      { name: "United Arab Emirates", iso_code: "AE" },
      { name: "United Kingdom", iso_code: "GB" },
      { name: "United States", iso_code: "US" },
      { name: "United States Minor Outlying Islands", iso_code: "UM" },
      { name: "Uruguay", iso_code: "UY" },
      { name: "Uzbekistan", iso_code: "UZ" },
      { name: "Vanuatu", iso_code: "VU" },
      { name: "Venezuela", iso_code: "VE" },
      { name: "Viet Nam", iso_code: "VN" },
      { name: "Virgin Islands, British", iso_code: "VG" },
      { name: "Virgin Islands, U.S.", iso_code: "VI" },
      { name: "Wallis and Futuna", iso_code: "WF" },
      { name: "Western Sahara", iso_code: "EH" },
      { name: "Yemen", iso_code: "YE" },
      { name: "Zambia", iso_code: "ZM" },
      { name: "Zimbabwe", iso_code: "ZW" },
    ],
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
