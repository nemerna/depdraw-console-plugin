import React from 'react';
import './example.css';
// import CanvasPage from '../containers/CanvasPage';
const CanvasPage = React.lazy(() => import('../containers/CanvasPage'));
export default function ExamplePage() {
  // Define static width and height values
  const canvasWidth = '100%';
  const canvasHeight = '100%';

  // Define the style for the container div
  const containerStyle = {
    width: canvasWidth,
    height: canvasHeight,
  };

  return (
    <div style={containerStyle}>
      {/* Render the Canvas component inside the container div */}
      <CanvasPage />
    </div>
  );
}
