# web_based_image_processing_app
Web-Based Image Processing Application
Live Deployment Link: https://mikespecs.github.io/web_based_image_processing_app/

Description
    This interactive web application allows users to upload images and apply a variety of real time transformations using adjustable sliders and controls. It displays both the original and processed images side by side for easy comparison.

Designed for whoever is learning or experimenting with image processing techniques in the browser.

Target Audience / Use Case
    Computer science students building frontend/backend image tools

    Developers prototyping browser based image filters

    To any educators demonstrating digital image manipulation concepts

Features
Upload and preview JPEG/PNG images

Apply and adjust six image transformations:

Blur (Gaussian or Box)

Posterize Effect

Edge Detection (Sobel, Prewitt, or Canny)

Emboss Effect 
 
Noise Reduction 

Shadow Enhancement

Download processed images (eventually)

Responsive, intuitive UI

GitHub Actions CI/CD for automated deployment

Technologies & Dependencies
Languages:

JavaScript

HTML/CSS

Frameworks & Libraries:

React (v18+)

Node.js (v18+)

Canvas API

[Optional] OpenCV.js (will be used for advanced filters in later iterations)

Key Dependencies from package.json:

react

react-dom

react-scripts

gh-pages (if deploying via GitHub Pages)

Setup Instructions
1. Clone the Repository
bash
git clone https://github.com/your-username/image-processing-app.git  
cd image-processing-app

2. Install Node.Js
Website Link: https://nodejs.org/en/download

3. Install Dependencies
npm install

4. Run Locally
npm start

File Structure
Folder/File	Purpose

public/	

     Static assets and index.html

src/	

    React components, filter logic, and styling

.github/workflows/	

    GitHub Actions CI/CD pipeline configuration

package.json	

    Project metadata and dependencies

README.md	

    Project overview and setup guide

.gitignore	

    Specifies files to exclude from version control

build/	Production-ready output (auto-generated with yml)

