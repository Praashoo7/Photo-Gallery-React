import './App.css';

function App() {
    
  let currentIndex = 0;

  const imagesi = importAll(require.context('../public/images/', false, /\.(png|jpe?g|svg)$/));

  console.log(imagesi);

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

  function importAll(r) {
    return r.keys().filter(key => key !== './Invalid_Image52164895.png').map(key => key.replace('./', ''));
  }

  function openGallery() {
    const galleryOverlay = document.getElementById('galleryOverlay');
    const galleryContainer = document.querySelector('.gallery-container');
    const main = document.querySelector('.main');

    showImage(currentIndex);
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

  function showImage(n) {
    const imgElement = document.getElementById('expandedImg');
    const galleryContainer = document.querySelector('.gallery-container');
    const gallerytext = document.querySelector('.gallerytext');
  
    gallerytext.style.opacity = 1;
    gallerytext.textContent = 'Loading...';

    setTimeout(() => {
    gallerytext.style.opacity = 1;

    imgElement.onload = () => {
      galleryContainer.style.opacity = 1;
      gallerytext.style.opacity = 0;
    };

    imgElement.onerror = () => {
        imgElement.src = process.env.PUBLIC_URL + '/images/Invalid_Image52164895.png';
        galleryContainer.style.opacity = 1;
        gallerytext.style.opacity = 0;
      };

    imgElement.src = process.env.PUBLIC_URL + `/images/${imagesi[n]}`;
  }, 300);
  galleryContainer.style.opacity = 0;
  }
  

  function changeImage(n) {
    currentIndex = (currentIndex + n + imagesi.length) % imagesi.length;
    showImage(currentIndex);
  }

  const openGit = () => {
    window.open('https://github.com/Praashoo7/Photo-Gallery-React', '_blank');
  };

  return (
    <div>
      <div className="main">
        <div className="main_photo" onClick={() => openGallery()}>
          <img id="main_image" alt='main_image' src={process.env.PUBLIC_URL + `/images/${imagesi[0]}`} />
          <span className="main_text">
            <span>Explore</span><span>My</span><span>Photography</span>
          </span>
        </div>
        <button className='git_star' onClick={openGit}>Star on GitHub 
          <svg id='star' aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star mr-1" >
          <defs>
              <filter id="sofGlow" height="300%" width="300%" x="-75%" y="-75%">
                <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="thicken" />
                <feGaussianBlur in="thicken" stdDeviation="7" result="blurred" />
                <feFlood flood-color="rgb(255,255,0)" result="glowColor" />
                <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
                <feMerge>
                  <feMergeNode in="softGlow_colored"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>

              </filter>

            </defs>
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
          </svg>
        </button>
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
