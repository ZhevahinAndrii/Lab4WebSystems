import http from 'k6/http';
import { sleep } from 'k6';

// Настройки нагрузки
export let options = {
  scenarios: {
    constant_load: {
      executor: 'constant-vus', // Постоянное число пользователей
      vus: 10,                 // Количество виртуальных пользователей
      duration: '30s',         // Время выполнения теста
    },
    ramping_load: {
      executor: 'ramping-vus', // Постепенное увеличение нагрузки
      startVUs: 1,             // Начальное число пользователей
      stages: [
        { duration: '30s', target: 20 }, // За 30 секунд увеличиваем до 20 пользователей
        { duration: '1m', target: 0 },   // За 1 минуту плавно снижаем до 0
      ],
      gracefulRampDown: '10s', // Время завершения нагрузки
    },
    constant_rate: {
      executor: 'constant-arrival-rate', // Стабильная частота запросов
      rate: 5,                          // 5 запросов в секунду
      timeUnit: '1s',
      duration: '1m',                    // Длительность нагрузки 1 минута
      preAllocatedVUs: 50,               // Резерв пользователей
      maxVUs: 100,                       // Максимальное количество пользователей
    },
  },
};
function getRandomInt(min, max) {
    min = Math.ceil(min); // Округляем нижнюю границу вверх
    max = Math.floor(max); // Округляем верхнюю границу вниз
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Основной тестовый сценарий
export default function () {
  http.get(`http://localhost:8000/products/${getRandomInt(1,1000)}`); // Ваш эндпоинт
  sleep(Math.random()*2+1); // Задержка между запросами
}
