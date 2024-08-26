// Update time in menu bar
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

/* Add fade-in effect when webpage loads for the first time
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});
*/

// Handling window management
let zIndex = 1;

function openWindow(contentType) {
    const window = document.createElement('div');
    window.className = 'window';
    window.style.zIndex = ++zIndex;

    const header = document.createElement('div');
    header.className = 'window-header';
    header.innerHTML = `
        <div class="window-buttons">
            <div class="window-button close" onclick="closeWindow(this)"></div>
            <div class="window-button minimize"></div>
            <div class="window-button maximize"></div>
        </div>
        <div class="window-title">${contentType.charAt(0).toUpperCase() + contentType.slice(1)}</div>
    `;

    const content = document.createElement('div');
    content.className = 'window-content';
    content.innerHTML = getWindowContent(contentType);

    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';

    window.appendChild(header);
    window.appendChild(content);
    window.appendChild(resizeHandle);

    document.body.appendChild(window);

    // Center the window
    const windowWidth = 600; // Default width
    const windowHeight = 400; // Default height
    window.style.width = `${windowWidth}px`;
    window.style.height = `${windowHeight}px`;
    window.style.left = `${(document.body.clientWidth - windowWidth) / 2}px`;
    window.style.top = `${(document.body.clientHeight - windowHeight) / 2}px`;

    makeDraggable(window);
    makeResizable(window);
    addClickToFront(window);
}

function closeWindow(closeButton) {
    closeButton.closest('.window').remove();
}

function getWindowContent(contentType) {
    switch(contentType) {
        case 'resume':
            return `<div class="experience">
                        <div class="job-title">General Motors (GM), Roswell, GA — Information & Digital Technology Intern</div>
                        <div class="date-range">MAY 2024 - PRESENT</div>
                        <ul class="responsibilities">
                            <li class="responsibility">Implemented automated CI/CD pipelines using GitHub Actions (Bash scripts), streamlining build, test, and deployment processes for a mission-critical manufacturing application, reducing deployment time by nearly 40%.</li>
                            <li class="responsibility">Supported TomEE server migration by implementing SSH functionality for remote production server access and configuring servers according to team specifications.</li>
                        </ul>
                    </div>

                    <div class="experience">
                        <div class="job-title">General Motors (GM), Roswell, GA — Software Development Intern</div>
                        <div class="date-range">MAY 2023 - AUG 2023</div>
                        <ul class="responsibilities">
                            <li class="responsibility">Developed a Typescript-based game application integrating augmented reality (AR) and social networking features to enhance employee engagement within the company.</li>
                            <li class="responsibility">Implemented key user functionalities, including secure authentication, profile management, leaderboard ranking with points algorithm, and search, using Angular and Ionic for the frontend, and NoSQL databases with web APIs for the backend.</li>
                            <li class="responsibility">Collaborated in Agile design sprints, utilizing Figma to design and prototype application features, ensuring alignment with project’s software architecture and development goals.</li>
                        </ul>
                    </div>

                    <div class="experience">
                        <div class="job-title">Richmond Public Defender’s Office, Richmond, VA — Web Dev. Intern</div>
                        <div class="date-range">JUN 2021 - AUG 2021</div>
                        <ul class="responsibilities">
                            <li class="responsibility">Developed a new website for the Public Defender’s office in collaboration with the Chief Public Defender and her team, leading weekly Scrum meetings to gather requirements and ensure alignment with end-user needs.</li>
                            <li class="responsibility">Redesigned the website with a modern user experience using Bootstrap, and optimized hiring and data collection processes through PHP-based web forms.</li>
                            <li class="responsibility">Implemented strategies to enhance website functionality, including a custom video interface, and streamlined access to social services and employment opportunities.</li>
                        </ul>
                    </div>

                    <div class="experience">
                        <div class="job-title">Virginia Commonwealth University, Richmond, VA — Research Intern</div>
                        <div class="date-range">JUN 2019 - JUN 2021</div>
                        <ul class="responsibilities">
                            <li class="responsibility">Co-authored 6 published research papers on COVID-19, leveraging Python and advanced machine learning techniques to analyze epidemiological data and inform public health strategies.</li>
                            <li class="responsibility">Utilized Python for extensive web scraping from 50+ sources and performed robust data preprocessing.</li>
                            <li class="responsibility">Developed a Python-based linear optimization algorithm for simulating COVID-19 vaccine allocation, optimizing resource distribution across diverse regional parameters, resulting in more efficient distribution strategies.</li>
                            <li class="responsibility">Implemented a reinforcement learning model in Python to inform policy decisions during COVID-19 lockdowns, balancing public safety measures with economic recovery efforts effectively.</li>
                        </ul>
                    </div>`;
        case 'projects':
            return `<h2>My Projects</h2>`;
        case 'about':
            return `<h2>About Me</h2>`;
        default:
            return 'Content not found';
    }
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.querySelector('.window-header').onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        bringToFront(element);
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        const newTop = element.offsetTop - pos2;
        const newLeft = element.offsetLeft - pos1;
        element.style.top = `${Math.max(0, Math.min(newTop, window.innerHeight - element.offsetHeight))}px`;
        element.style.left = `${Math.max(0, Math.min(newLeft, window.innerWidth - element.offsetWidth))}px`;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function makeResizable(element) {
    const resizeHandle = element.querySelector('.resize-handle');
    resizeHandle.addEventListener('mousedown', initResize, false);

    function initResize(e) {
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
    }

    function resize(e) {
        e.preventDefault();
        const newWidth = e.clientX - element.offsetLeft;
        const newHeight = e.clientY - element.offsetTop;
        element.style.width = `${Math.max(300, newWidth)}px`;
        element.style.height = `${Math.max(200, newHeight)}px`;
    }

    function stopResize(e) {
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }
}

function addClickToFront(element) {
    element.addEventListener('mousedown', function() {
        bringToFront(element);
    });
}

function bringToFront(element) {
    element.style.zIndex = ++zIndex;
}

// Sticky Note functionality
function closeStickyNote() {
    document.getElementById('sticky-note').style.display = 'none';
}

// Make sticky note draggable
makeDraggable(document.getElementById('sticky-note'));