// Update time in menu bar
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

// Window management
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
    const windowWidth = 400; // Default width
    const windowHeight = 300; // Default height
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
            return `<h2>My Resume</h2>
                    <p>Education: Third-Year Student at Georgia Tech</p>`;
        case 'projects':
            return `<h2>My Projects</h2>`;
        case 'about':
            return `<h2>About Me</h2>
                    <p>Ronojoy Dutta</p>`;
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