import type { Car } from "@/types/car";
import type { Service } from "@/types/service";

// ВНИМАНИЕ: это демонстрационные данные для показа макета, пока не подключена
// база. Машины и характеристики взяты из макета дизайна и реальным
// автомобилям не соответствуют. Как только в Supabase появятся настоящие
// объявления, приложение начнёт показывать их вместо этих, а этот файл
// можно удалить вместе с фоллбэком в src/lib/data.ts.

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
    photos: [],
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
    photos: [],
    status: "available",
  },
];

export const demoServices: Service[] = [
  {
    id: "demo-inspection",
    title: "Прохождение техосмотра",
    description: "Подготовим автомобиль и пройдём техосмотр за вас.",
    price: null,
    duration: null,
    photo: null,
  },
  {
    id: "demo-cleaning",
    title: "Химчистка авто",
    description: "Глубокая чистка салона: сиденья, потолок, ковролин.",
    price: null,
    duration: null,
    photo: null,
  },
];
