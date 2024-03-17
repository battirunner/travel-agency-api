import { PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

const fetchData = async () => {
  try {
    const res = await axios.get(
      "https://fahimmohip.pythonanywhere.com/iata-airports-list"
    );

    var data: any = [];

    Object.keys(res.data).forEach(async function (key, index) {
      // const res3 = await prisma.country.findFirst({
      //   where: { iso_code: { contains: res.data[key].country as string } },
      // });
      // //@ts-ignore
      // console.log("country: ", res3.name);
      data.push({
        iata_code: res.data[key].iata,
        name: res.data[key].name,
        city: res.data[key].city,
        //@ts-ignore
        country: res.data[key].country,
      });
      // console.log("data: ", data);
      //@ts-ignore

      //   if (res3){
      //     const res2 = await prisma.airports.create({ data: {
      //       iata_code: res.data[key].iata,
      //    name: res.data[key].name,
      //    city: res.data[key].city,
      //    //@ts-ignore
      //    country: res3.name ? res3.name : "",
      //  } });
      //   }
    });
    data = data.filter(
      (value:any, index:any, self:any) =>
        index === self.findIndex((t:any) => t.name === value.name)
    );
    // const res2 = await prisma.airports.createMany({ data: data });
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const airportLists: any = fetchData();

console.log(airportLists);

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
