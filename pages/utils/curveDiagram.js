import _ from 'lodash';
// 参数说明
// origin:远点
// xAxis x轴配置
// yAxis y轴配置
export const drawAxis = (ctx, config) => {
  const { origin, xAxis, yAxis } = config;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'orange';
  // 绘制X轴刻度
  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(origin.x + xAxis.length, origin.y);
  ctx.stroke();
  ctx.closePath();
  drawomhCalibrationX(origin, ctx, xAxis);
  // 绘制Y轴
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(origin.x, origin.y - yAxis.length);
  ctx.stroke();
  ctx.closePath();
  // 绘制Y轴刻度
  drawomhCalibrationY(origin, ctx, yAxis);
  drawArrowX(origin, ctx, xAxis);
  drawArrowY(origin, ctx, yAxis);
  ctx.restore();
};

// 绘制刻度X
const drawomhCalibrationX = (origin, ctx, xAxis) => {
  for (let i = 0; i < xAxis.length / xAxis.gap; i++) {
    ctx.beginPath();
    ctx.moveTo(origin.x + i * xAxis.gap, origin.y + xAxis.calibrationHeight);
    ctx.lineTo(origin.x + i * xAxis.gap, origin.y);
    ctx.stroke();
    ctx.closePath();
  }
};

// 绘制刻度Y
const drawomhCalibrationY = (origin, ctx, yAxis) => {
  for (let i = 0; i < yAxis.length / yAxis.gap; i++) {
    ctx.beginPath();
    ctx.moveTo(origin.x - yAxis.calibrationHeight, origin.y - i * yAxis.gap);
    ctx.lineTo(origin.x, origin.y - i * yAxis.gap);
    ctx.stroke();
    ctx.closePath();
  }
};

// 绘制X轴箭头
const drawArrowX = (origin, ctx, xAxis) => {
  ctx.beginPath();
  ctx.moveTo(origin.x + xAxis.length - 5, origin.y - 5);
  ctx.lineTo(origin.x + xAxis.length, origin.y);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(origin.x + xAxis.length - 5, origin.y + 5);
  ctx.lineTo(origin.x + xAxis.length, origin.y);
  ctx.stroke();
  ctx.closePath();
};

// 绘制Y轴箭头
const drawArrowY = (origin, ctx, yAxis) => {
  ctx.beginPath();
  ctx.moveTo(origin.x - 5, origin.y - yAxis.length + 5);
  ctx.lineTo(origin.x, origin.y - yAxis.length);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(origin.x + 5, origin.y - yAxis.length + 5);
  ctx.lineTo(origin.x, origin.y - yAxis.length);
  ctx.stroke();
  ctx.closePath();
};

// 绘制画点
// cx 圆的中心x
// cy 圆的中心y
// r 圆的半径
export const drawPoint = (ctx, cx, cy, r) => {
  ctx.save();
  ctx.lineWidth = 1;
  ctx.moveTo(cx, cy);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.strokeStyle = 'blue';
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};

// 点击显显示小点
export const handleClick = (e, canvasState, ctx) => {
  const { left, top } = canvasState.getBoundingClientRect();
  const clickPosition = {
    x: e.clientX,
    y: e.clientY,
  };
  drawPoint(ctx, clickPosition.x - left, clickPosition.y - top);
  return {
    x: clickPosition.x - left,
    y: clickPosition.y - top,
    r: 5,
  };
};

// 鼠标移入小点园变大
export const handleMove = (
  e,
  pointCollection,
  canvasState,
  ctx,
  config,
  setPointCollection
) => {
  canvasState.style.cursor = '';
  const mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };
  const { left, top } = canvasState.getBoundingClientRect();
  const canvasOffset = {
    left,
    top,
  };
  const canvasMovePosition = {
    x: mousePosition.x - canvasOffset.left,
    y: mousePosition.y - canvasOffset.top,
  };
  const arrPointCollection = _.cloneDeep(pointCollection);
  for (let i = 0; i < pointCollection.length; i++) {
    let ifInCircle = inCircle(
      canvasMovePosition,
      pointCollection[i].x,
      pointCollection[i].y,
      5
    );
    if (ifInCircle) {
      canvasState.style.cursor = 'pointer';
      arrPointCollection[i].r = 8;
    } else {
      arrPointCollection[i].r = 5;
    }
  }
  return arrPointCollection;
};

const inCircle = (p, cx, cy, r) => {
  const distance = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
  if (distance <= r) return true;
  return false;
};

// 画布初始化

export const canvasInit = (ctx, config, pointCollection, canvasState) => {
  ctx.clearRect(0, 0, canvasState.width, canvasState.height);
  drawAxis(ctx, config);
  if (pointCollection.length >= 2) {
    // for (let i = 0; i < pointCollection.length - 1; i++) {
    //   drawingLine(ctx, pointCollection[i], pointCollection[i + 1]);
    // }
    drwaSmoothLines(ctx, pointCollection);
  }
  for (let i = 0; i < pointCollection.length; i++) {
    drawPoint(
      ctx,
      pointCollection[i].x,
      pointCollection[i].y,
      pointCollection[i].r
    );
  }
};

export const drawingLine = (ctx, p1, p2) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};

const drwaSmoothLines = (ctx, points) => {
  if (points.length < 2) return;
  const f = 0.5; // 平滑相关系数
  const t = 0.9; // 平滑相关系数
  ctx.save();
  ctx.beginPath();
  // 移到第一个点的位置
  ctx.moveTo(points[0].x, points[0].y);
  let g = 0; // 斜率的系数，默认是0
  let dx1 = 0; // 第一个控制点的偏移量x
  let dy1 = 0; // 第一个控制点的偏移量y
  let dx2 = 0; // 第二点控制点的偏移量x
  let dy2 = 0; // 第二个控制点的偏移量y
  let prePoint = points[0]; // 默认的前一个点
  let nextPoint = null; // 默认的后一个点
  for (let i = 0; i < points.length - 1; i++) {
    let curPoint = points[i + 1]; // 当前点
    nextPoint = points[i + 2]; // 后一个点
    if (nextPoint) {
      g = gradient(prePoint, curPoint); // 计算连个点的斜率
      dx2 = (curPoint.x - prePoint.x) * -f;
      // dy2 = dy2 * g * t;
      dy2 = (curPoint.y - prePoint.y) * g * t;
    } else {
      dx2 = 0;
      dy2 = 0;
    }
    ctx.bezierCurveTo(
      prePoint.x - dx1,
      prePoint.y - dy1,
      curPoint.x + dx2,
      curPoint.y + dy2,
      curPoint.x,
      curPoint.y
    );
    dx1 = dx2;
    dy1 = dy2;
    prePoint = curPoint;
  }
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};

// 计算a，b两点斜率的方法
const gradient = (a, b) => {
  return (b.y - a.y) / (b.x - a.x);
};
