import './App.css';
import { useRef, useEffect, useState } from "react";

function App() {
  const processedCanvasRef = useRef(null);
  const [blur, setBlur] = useState(0);
  const [edge, setEdge] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };

  function boxBlur(imageData, width, height, radius) {
    if (radius <= 0) return imageData;
    const src = imageData.data;
    const output = new Uint8ClampedArray(src.length);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0, count = 0;

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const idx = (ny * width + nx) * 4;
              r += src[idx];
              g += src[idx + 1];
              b += src[idx + 2];
              count++;
            }
          }
        }

        const i = (y * width + x) * 4;
        output[i] = r / count;
        output[i + 1] = g / count;
        output[i + 2] = b / count;
        output[i + 3] = src[i + 3]; 
      }
    }

    return new ImageData(output, width, height);
  }

  useEffect(() => {
    if (imageSrc && processedCanvasRef.current) {
      const canvas = processedCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        if (blur > 0) {
          imageData = boxBlur(imageData, canvas.width, canvas.height, parseInt(blur));
        }

        if (edge === "1") {
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i+1] + data[i+2]) / 3;
            const edgeVal = avg > 128 ? 255 : 0;
            data[i] = data[i+1] = data[i+2] = edgeVal;
          }
        }

        ctx.putImageData(imageData, 0, 0);
      };
    }
  }, [imageSrc, blur, edge]);

  return (
    <div className="App">
      <div>
        <h2>Web Based Image Processing App</h2>
        <p>Transfrom images with blur and edge detection filter sliders!</p>
        <p style={{color: "green"}}>Disclaimer: No AI tools were used in this implementation</p>
        <p>Documentation Link: <a target='_blank' rel="noreferrer" href='https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas'>MDN Web Docs</a></p>
        <input type="file" accept="image/*" onChange={handleFileChange}/>
        <div style={{backgroundColor: "yellow"}}>
          {imageSrc && 
          <>
            <div style={{backgroundColor: "transparent", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "20px"}}>
              <div>            
                <h4>Original Image Upload</h4>
                <img id='imported_image' src={imageSrc}/>   
              </div>
              <div>
                <h4>Processed Image</h4>
                 <div style={{position: "relative", backgroundColor: 'white', borderRadius: "10px", padding: "10px"}}>
                  <label>
                    Blur:
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={blur}
                      onChange={(e) => setBlur(e.target.value)}
                    />
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    Edge Detection:
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="1"
                      value={edge}
                      onChange={(e) => setEdge(e.target.value)}
                    />
                  </label>
                </div>
                <canvas
                  id="processed_canvas"
                  ref={processedCanvasRef}
                  style={{border: "1px solid black", maxWidth: "500px", marginTop: "10px"}}
                />
               
              </div>
            </div>
          </>     
          }              
        </div>
      </div>
    </div>
  );
}

export default App;
