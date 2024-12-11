const WIDTH = 1600;
const HEIGHT = 900;
const RADIUS = 100; // Радиус вписанной окружности
const POINT_COUNT = 30; // Число точек

const canvas = document.getElementById("voronoi");
const ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

const points = [];

// Вычисление расстояния между точками
function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// Генерация сетки шестиугольников
function generateHexagonalGrid() {
  const hexWidth = RADIUS * Math.sqrt(3); // Ширина шестиугольника (по горизонтали)
  const hexHeight = 2 * RADIUS; // Высота шестиугольника (по вертикали)

  const rows = Math.ceil(HEIGHT / hexHeight) + 1;
  const cols = Math.ceil(WIDTH / hexWidth) + 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexWidth;
      const y = row * hexHeight + (col % 2 === 0 ? 0 : RADIUS); // Смещение в ряду (через 1/2 высоты шестиугольника)

      if (x < WIDTH && y < HEIGHT) {
        // Случайный цвет для каждой точки
        const color = `hsl(${Math.random() * 360}, 80%, 70%)`;
        points.push({ x, y, color });
      }
    }
  }
}

// Построение диаграммы Вороного
function drawVoronoi() {
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      let closestPoint = null;
      let minDistance = Infinity;

      // Находим ближайшую точку для каждого пикселя
      for (let point of points) {
        const dist = distance({ x, y }, point);
        if (dist < minDistance) {
          minDistance = dist;
          closestPoint = point;
        }
      }

      if (closestPoint) {
        ctx.fillStyle = closestPoint.color;
        ctx.fillRect(x, y, 1, 1); // Рисуем пиксель
      }
    }
  }

  // Рисуем точки генераторов (центры шестиугольников)
  ctx.fillStyle = "black";
  for (let point of points) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
}

generateHexagonalGrid();
drawVoronoi();

// Обработчик зума
// function zoom(factor) {
//   // Изменение масштаба
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawVoronoi();
// }

// // Обработчик нажатий клавиш
// document.addEventListener("keydown", (e) => {
//   if (e.ctrlKey) {
//     if (e.key === "+" || e.key === "=") {
//       zoom(1.1); // Увеличиваем масштаб
//     } else if (e.key === "-") {
//       zoom(0.9); // Уменьшаем масштаб
//     }
//   }
// });

// Инициализация

