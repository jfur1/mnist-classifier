import { useRef, useState } from "react";

const CANVAS_SIZE = 280; // Display size (scaled up for easier drawing)
const GRID_SIZE = 28; // The actual input size for the model
const SCALE = CANVAS_SIZE / GRID_SIZE; // Scale factor

export default function DigitCanvas({ onImageReady }: { onImageReady: (image: Blob) => void }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [drawing, setDrawing] = useState(false);

    // Start drawing
    const startDrawing = (e: React.MouseEvent) => {
        setDrawing(true);
        draw(e);
    };

    // Stop drawing
    const stopDrawing = () => setDrawing(false);

    // Draw on the canvas
    const draw = (e: React.MouseEvent) => {
        if (!drawing || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "black"; // Draw in black
        ctx.fillRect(
            Math.floor(e.nativeEvent.offsetX / SCALE) * SCALE,
            Math.floor(e.nativeEvent.offsetY / SCALE) * SCALE,
            SCALE * 2,  // Make brush size thicker
            SCALE * 2
        );
    };

    // Convert canvas to PNG and send to parent component
    const processImage = async () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
    
        // Resize the drawn image to 28x28
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = GRID_SIZE;
        tempCanvas.height = GRID_SIZE;
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;
        tempCtx.drawImage(canvasRef.current, 0, 0, GRID_SIZE, GRID_SIZE);
    
        // Convert to PNG asynchronously
        tempCanvas.toBlob(async (blob) => {
            if (blob) {
                console.log("Image processing complete, sending to API...");
                onImageReady(blob); // Send image to API
            } else {
                console.error("Failed to generate image blob");
            }
        }, "image/png");
    };
    

    // Clear canvas
    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                style={{ border: "2px solid black", background: "white" }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <button onClick={processImage}>Classify</button>
            <button onClick={clearCanvas}>Clear</button>
        </div>
    );
}
