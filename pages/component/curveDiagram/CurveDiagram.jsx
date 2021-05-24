import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import {
  drawAxis,
  drawPoint,
  handleClick,
  handleMove,
  canvasInit,
  drawingLine,
} from '../../utils/curveDiagram';
export default function Curvediagram() {
  const [canvasState, setCanvasState] = useState(null);
  const [ctxState, setCtxState] = useState(null);
  const [pointCollection, setPointCollection] = useState([]);
  const [ctxObj, setCtxObj] = useState(null);
  const [config, setConfig] = useState({
    origin: {
      x: 10,
      y: 290,
    },
    xAxis: {
      length: 480,
      gap: 10,
      calibrationHeight: 5,
    },
    yAxis: {
      length: 200,
      gap: 10,
      calibrationHeight: 5,
    },
  });
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    setCanvasState(canvas);
    setCtxState(ctx);
    setCtxObj(ctx);
  }, []);
  useEffect(() => {
    if (canvasState && ctxObj) {
      canvasInit(ctxObj, config, pointCollection, canvasState);
    }
  }, [canvasState, ctxObj]);

  useEffect(() => {
    if (!ctxObj) return;
    canvasInit(ctxObj, config, pointCollection, canvasState);
  }, [pointCollection]);
  return (
    <div>
      <Canvas
        onClick={(e) => {
          const point = handleClick(e, canvasState, ctxState);
          setPointCollection([...pointCollection, point]);
        }}
        onMouseMove={(e) => {
          const point = handleMove(
            e,
            pointCollection,
            canvasState,
            ctxState,
            config,
            setPointCollection
          );
          setPointCollection(point);
        }}
        id="canvas"
        width="500px"
        height="300px"
      ></Canvas>
    </div>
  );
}

const Canvas = styled.canvas`
  border: 1px solid greenyellow;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
`;
