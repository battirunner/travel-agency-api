import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

import xlsx from "xlsx";

const fetchData = async () => {
  try {
    const res = await axios.get(
      "https://fahimmohip.pythonanywhere.com/iata-airports-list"
    );

    var data: any = [];

    // Object.keys(res.data).forEach(async function (key, index) {
    //   const res3 = await prisma.country.findFirst({
    //     where: { iso_code: { contains: res.data[key].country as string } },
    //   });
    //   // //@ts-ignore
    //   // console.log("country: ", res3.name);
    //   data.push({
    //     iata_code: res.data[key].iata,
    //     name: res.data[key].name,
    //     city: res.data[key].city,
    //     //@ts-ignore
    //     country: res.data[key].country,
    //   });
    //   // console.log("data: ", data);
    //   //@ts-ignore

    //   if (res3) {
    //     const res2 = await prisma.airports.create({
    //       data: {
    //         iata_code: res.data[key].iata ? res.data[key].iata : "",
    //         name: res.data[key].name,
    //         city: res.data[key].city ? res.data[key].city : "",
    //         //@ts-ignore
    //         country: res3.name ? res3.name : "",
    //       },
    //     });
    //   }
    // });

    // const res2 = await prisma.airports.createMany({
    //   data: data,
    //   skipDuplicates: true,
    // });
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// const airportLists: any = fetchData().then((data) => {
//   return data;
// }).catch((error) => {console.log(error);});

// console.log(airportLists);

// console.log(airportLists);

// let data: any = [];

// Object.keys(airportLists).forEach(async function (key, index) {
//   const res3 = await prisma.country.findFirst({
//     where: { iso_code: { contains: airportLists[key].country as string } },
//   });
//   // //@ts-ignore
//   // console.log("country: ", res3.name);
//   data.push({
//     iata_code: airportLists[key].iata,
//     name: airportLists[key].name,
//     city: airportLists[key].city,
//     //@ts-ignore
//     country: res3.name ? res3.name : "",
//   });
//   console.log("data: ", data);
// });
// // console.log("data: ", data);

// const dbInsert = async () => {
//   const res2 = await prisma.airports.createMany({ data: data });
// };
// dbInsert();

const parse = (filename: string) => {
  const excelData = xlsx.readFile(filename);
  return Object.keys(excelData.Sheets).map((name) => ({
    name,
    data: xlsx.utils.sheet_to_json(excelData.Sheets[name]),
  }));
};

// console.log(parse(`${__dirname}/Airport_Codes.xlsx`));
parse(`${__dirname}/Airport_Codes.xlsx`).forEach((element) => {
  element.data.forEach((e) => console.log(e));
  // prisma.airports.upsert({
  //   where: { name: element.data[0].iata_code },
  //   update: element.data[0],
  //   create: element.data[0],
  // })
});

