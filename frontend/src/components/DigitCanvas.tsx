import { useRef, useState, useEffect } from "react";

const CANVAS_SIZE = 280; // Display size (bigger for better UX)
const GRID_SIZE = 28; // Actual model input size
const SCALE = CANVAS_SIZE / GRID_SIZE; // Scale factor

export default function DigitCanvas({ onImageReady, clearPrediction }: { onImageReady: (image: Blob) => void, clearPrediction: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Get correct touch/mouse position
    const getPosition = (e: MouseEvent | TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if ("touches" in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as MouseEvent).clientX;
            clientY = (e as MouseEvent).clientY;
        }

        return {
            x: Math.floor((clientX - rect.left) / SCALE) * SCALE,
            y: Math.floor((clientY - rect.top) / SCALE) * SCALE
        };
    };

    // Draw function
    const draw = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        e.preventDefault(); // Stop weird scrolling behavior
        const { x, y } = getPosition(e);
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, SCALE * 2, SCALE * 2);
    };

    // Start drawing
    const startDrawing = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setIsDrawing(true);
        draw(e);
    };

    // Stop drawing
    const stopDrawing = (e?: MouseEvent | TouchEvent) => {
        e?.preventDefault();
        setIsDrawing(false);
    };

    // Convert canvas to 28x28 PNG
    const processImage = async () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = GRID_SIZE;
        tempCanvas.height = GRID_SIZE;
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;
        tempCtx.drawImage(canvasRef.current, 0, 0, GRID_SIZE, GRID_SIZE);

        tempCanvas.toBlob(async (blob) => {
            if (blob) {
                console.log("Image processed, sending to API...");
                onImageReady(blob);
            } else {
                console.error("Failed to create image blob");
            }
        }, "image/png");
    };

    // Clear canvas
    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        clearPrediction();
    };

    // Attach & remove event listeners (fix for touch issues)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleTouchMove = (e: TouchEvent) => draw(e);
        const handleMouseMove = (e: MouseEvent) => draw(e);
        
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("touchmove", handleTouchMove);
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("touchstart", startDrawing);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("touchend", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);

        return () => {
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("touchmove", handleTouchMove);
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("touchstart", startDrawing);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("touchend", stopDrawing);
            canvas.removeEventListener("mouseleave", stopDrawing);
        };
    }, [isDrawing]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                style={{ border: "2px solid black", background: "white", touchAction: "none" }} // Prevents scrolling on touch devices
            />
            <button onClick={processImage}>Classify</button>
            <button onClick={clearCanvas}>Clear</button>
        </div>
    );
}
