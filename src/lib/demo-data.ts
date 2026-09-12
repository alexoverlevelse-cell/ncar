import type { Car } from "@/types/car";
import type { Service } from "@/types/service";

// ВНИМАНИЕ: это демонстрационные данные для показа макета, пока не подключена
// база. Машины и характеристики взяты из макета дизайна и реальным
// автомобилям не соответствуют. Как только в Supabase появятся настоящие
// объявления, приложение начнёт показывать их вместо этих, а этот файл
// можно удалить вместе с фоллбэком в src/lib/data.ts.
//
// Фото в public/demo/ — стоковые снимки с Unsplash (лицензия Unsplash:
// свободное использование, в том числе коммерческое, без атрибуции).
// Это чужие машины той же модели, а не автомобили на продажу.

export const demoCars: Car[] = [
  {
    id: "demo-audi-a3",
    brand: "Audi",
    model: "A3 Sportback",
    price: 129900,
    year: 2018,
    mileage: 154000,
    fuel_type: "Дизель",
    transmission: "Автомат",
    body_type: "Хетчбек",
    color: "Чорний",
    description:
      "Демонстраційний опис. Реальний текст про стан і комплектацію додасть власник під час публікації оголошення.",
    photos: ["/demo/audi-a3.jpg"],
    status: "available",
  },
  {
    id: "demo-vw-golf",
    brand: "Volkswagen",
    model: "Golf",
    price: 149900,
    year: 2019,
    mileage: 98000,
    fuel_type: "Бензин",
    transmission: "Механіка",
    body_type: "Хетчбек",
    color: "Сірий",
    description:
      "Демонстраційний опис. Реальний текст про стан і комплектацію додасть власник під час публікації оголошення.",
    photos: ["/demo/vw-golf.jpg"],
    status: "available",
  },
];

export const demoServices: Service[] = [
  {
    id: "demo-sourcing",
    title: "Підбір автомобіля",
    description:
      "Знайдемо та перевіримо автомобіль під ваш запит і бюджет — від пошуку оголошень до угоди.",
    price: null,
    duration: null,
    photo: "/demo/service-sourcing.jpg",
    contact: null,
    location: null,
    status: "active",
  },
  {
    id: "demo-inspection",
    title: "Перевірка перед покупкою",
    description:
      "Оглянемо автомобіль, який ви збираєтеся купити: технічний стан, юридична чистота, реальний пробіг.",
    price: null,
    duration: null,
    photo: "/demo/service-inspection.jpg",
    contact: null,
    location: null,
    status: "active",
  },
];
