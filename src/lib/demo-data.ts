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
    body_type: "Хэтчбек",
    color: "Чёрный",
    description:
      "Демонстрационное описание. Реальный текст о состоянии и комплектации добавит владелец при публикации объявления.",
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
    transmission: "Механика",
    body_type: "Хэтчбек",
    color: "Серый",
    description:
      "Демонстрационное описание. Реальный текст о состоянии и комплектации добавит владелец при публикации объявления.",
    photos: ["/demo/vw-golf.jpg"],
    status: "available",
  },
];

export const demoServices: Service[] = [
  {
    id: "demo-sourcing",
    title: "Подбор автомобиля",
    description:
      "Найдём и проверим автомобиль под ваш запрос и бюджет — от поиска объявлений до сделки.",
    price: null,
    duration: null,
    photo: "/demo/service-sourcing.jpg",
    contact: null,
    location: null,
    status: "active",
  },
  {
    id: "demo-inspection",
    title: "Проверка перед покупкой",
    description:
      "Осмотрим автомобиль, который вы собираетесь купить: техническое состояние, юридическая чистота, реальный пробег.",
    price: null,
    duration: null,
    photo: "/demo/service-inspection.jpg",
    contact: null,
    location: null,
    status: "active",
  },
];
