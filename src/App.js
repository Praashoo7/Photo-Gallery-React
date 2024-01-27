import './App.css';

function App() {

let currentIndex = 1;
const totalImages = 28;
const supportedExtensions = ['jpg', 'png', 'gif'];

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (event.key === 'ArrowRight') {
        changeImage(1);
    } else if (event.key === 'Escape') {
        closeGallery();
    } else if (event.key === 'Enter') {
        openGallery();
    }
});

function openGallery() {
    const galleryOverlay = document.getElementById('galleryOverlay');
    const galleryContainer = document.querySelector('.gallery-container');
    const main = document.querySelector('.main');

    showImage(currentIndex, supportedExtensions);
    galleryContainer.classList.add('show');
    galleryOverlay.style.display = 'flex';
    main.style.display = 'none';


    setTimeout(() => {
        galleryContainer.style.opacity = 1;
    }, 50);
}

function closeGallery() {
    const galleryOverlay = document.getElementById('galleryOverlay');
    const galleryContainer = document.querySelector('.gallery-container');
    const main = document.querySelector('.main');

    galleryContainer.style.opacity = 0;
    main.style.display = 'flex';

    setTimeout(() => {
        galleryOverlay.style.display = 'none';
        galleryContainer.classList.remove('show');
    }, 300);
}

function showImage(n, extensions) {
    if (n > totalImages) {
        currentIndex = 1;
    } else if (n < 1) {
        currentIndex = totalImages;
    }

    const imgElement = document.getElementById('expandedImg');
    const galleryContainer = document.querySelector('.gallery-container');
    const gallerytext = document.querySelector('.gallerytext');
    let errorOccurred = false;

    gallerytext.style.opacity = 1;
    gallerytext.textContent = 'Loading...';

    const loadNextImage = function (index) {
        if (index >= extensions.length) {
            if (!errorOccurred) {
                displayErrorMessage();
            }
            return;
        }

        const newImg = new Image();
        newImg.onload = function () {
            imgElement.src = newImg.src;

            setTimeout(() => {
                galleryContainer.style.opacity = 1;
                setTimeout(() => {
                    gallerytext.style.opacity = 0;
                }, 50);
            }, 50);
            errorOccurred = false;
        };

        newImg.onerror = function () {
            loadNextImage(index + 1);
        };

        newImg.src = process.env.PUBLIC_URL + `/images/${currentIndex}.${extensions[index]}`;
    };

    const displayErrorMessage = function () {
        imgElement.src = process.env.PUBLIC_URL + '/images/Invalid_Image.png';
        gallerytext.style.opacity = 0;

        setTimeout(() => {
            galleryContainer.style.opacity = 1;
            errorOccurred = true;
        }, 50);
    };

    loadNextImage(0);

    galleryContainer.style.opacity = 0;
}

function changeImage(n) {
    showImage(currentIndex += n, supportedExtensions);
}


  return (
    <div>
      <div className="main">
        <div className="main_photo" onClick={() => openGallery()}>
            <img id="main_image" src={process.env.PUBLIC_URL + '/images/1.jpg'} />
            <span className="main_text">
                <span>Explore</span><span>My</span><span>Photography</span>
            </span>
        </div>
      </div>

      <div className="gallery-overlay" id="galleryOverlay">
          <div className="gallerytext">Loading..</div>
          <div className="gallery-container">
              <span className="prev" onClick={() => changeImage(-1)}>&#10094;</span>
              <img id="expandedImg" />
              <span className="next" onClick={() => changeImage(1)}>&#10095;</span>
              <span className="close" onClick={() => closeGallery()}>&times;</span>
          </div>
      </div>
    </div>
  );
}

export default App;
