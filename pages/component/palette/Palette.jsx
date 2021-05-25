import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { draw } from '../../utils/palette';
export default function Palette() {
  const divRef = useRef(null);
  const canvasRef = useRef(null);
  const [canvasWidthHeight, setCanvasWidthHeight] = useState({
    width: 300,
    height: 150,
  });
  const ctxRef = useRef(null);
  useEffect(() => {
    const { width, height } = divRef.current.getBoundingClientRect();
    if (!ctxRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d');
    }
    setCanvasWidthHeight({ width, height });
    window.addEventListener('resize', () => {
      const { width, height } = divRef.current.getBoundingClientRect();
      setCanvasWidthHeight({ width, height });
    });
  }, []);
  useEffect(() => {
    draw(
      ctxRef.current,
      canvasWidthHeight.width / 6,
      canvasWidthHeight.height / 6
    );
  }, [canvasWidthHeight]);
  return (
    <Div ref={divRef}>
      <canvas
        ref={canvasRef}
        width={canvasWidthHeight.width}
        height={canvasWidthHeight.height}
      ></canvas>
    </Div>
  );
}

const Div = styled.div`
  width: 100vw;
  height: 100vh;
`;
