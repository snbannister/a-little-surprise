// --- Popup ---
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close');
const popupInner = document.getElementById('popup-inner');

function openPopup(contentHTML) {
  popupInner.innerHTML = contentHTML;
  popup.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => popup.classList.add('hidden'));


// --- Nintendo Switch (TicTacToe) ---
const switchBtn = document.getElementById('switch');

switchBtn.addEventListener('click', () => {
  openPopup(`
    <div class="popup-title">tic tac toe</div>
    <div>
      <button id="mode-2p">play against me :D</button>
      <button id="mode-bot">play against minimax bot >:D</button>
    </div>

    <div id="tictactoe-board" style="display:none;">
      ${[...Array(9).keys()].map(i => `<div class="cell" data-index="${i}"></div>`).join('')}
    </div>

    <button id="reset" style="display:none;">Reset</button>
  `);

  const boardEl = document.getElementById('tictactoe-board');
  const resetBtn = document.getElementById('reset');
  const mode2p = document.getElementById('mode-2p');
  const modeBot = document.getElementById('mode-bot');

  let board = Array(9).fill('');
  let turn = 'X';
  let botEnabled = false;

  function checkWin(p) {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return wins.some(w => w.every(i => board[i] === p));
  }

  function resetGame() {
    board = Array(9).fill('');
    turn = 'X';
    boardEl.querySelectorAll('.cell').forEach(c => c.textContent = '');
    boardEl.style.display = 'none';
    resetBtn.style.display = 'none';
    mode2p.style.display = 'inline-block';
    modeBot.style.display = 'inline-block';
  }

  function makeBotMove() {
    // winning move
    for (let i=0;i<9;i++){
      if(board[i]===''){
        board[i]='O';
        if(checkWin('O')){
          boardEl.children[i].textContent='O';
          alert('Bot wins!');
          resetGame();
          return;
        }
        board[i]='';
      }
    }

    // block player
    for (let i=0;i<9;i++){
      if(board[i]===''){
        board[i]='X';
        if(checkWin('X')){
          board[i]='O';
          boardEl.children[i].textContent='O';
          turn='X';
          return;
        }
        board[i]='';
      }
    }

    // center
    if(board[4]===''){
      board[4]='O';
      boardEl.children[4].textContent='O';
      turn='X';
      return;
    }

    // corner
    const corners=[0,2,6,8].filter(i=>board[i]==='');
    if(corners.length){
      const move=corners[Math.floor(Math.random()*corners.length)];
      board[move]='O';
      boardEl.children[move].textContent='O';
      turn='X';
      return;
    }

    // random
    const empty=board.map((v,i)=>v===''?i:null).filter(v=>v!==null);
    if(empty.length){
      const move=empty[Math.floor(Math.random()*empty.length)];
      board[move]='O';
      boardEl.children[move].textContent='O';
      turn='X';
    }
  }

  function startGame(bot=false) {
    botEnabled = bot;
    boardEl.style.display = 'grid';
    resetBtn.style.display = 'inline-block';
    mode2p.style.display = 'none';
    modeBot.style.display = 'none';
    turn='X';

    const cells = boardEl.querySelectorAll('.cell');
    cells.forEach(cell => {
    cell.textContent = ''; // clear
    cell.onclick = () => {
        const idx = cell.dataset.index;
        if(board[idx] !== '' || (botEnabled && turn === 'O')) return;

        board[idx] = turn;
        cell.textContent = turn; // X or O appears inside the cell

        if(checkWin(turn)){
        alert(turn + ' wins!');
        resetGame();
        return;
        }

        turn = turn === 'X' ? 'O' : 'X';

        if(botEnabled && turn === 'O'){
        setTimeout(makeBotMove, 300);
        }
    };
    });
  }

  mode2p.onclick = () => startGame(false);
  modeBot.onclick = () => startGame(true);
  resetBtn.onclick = resetGame;
});


// --- TENNIS BALL ---
const tennisBall = document.getElementById('tennisball');
const boing = new Audio('assets/sounds/boing.mp3');

tennisBall.addEventListener('click', () => {
  tennisBall.classList.remove('bounce');
  void tennisBall.offsetWidth;
  tennisBall.classList.add('bounce');
  boing.play();
});


// --- SCRAPBOOK ---
const scrapbook = document.getElementById('scrapbook');

scrapbook.addEventListener('click', () => {
  openPopup(`
    <div class="popup-title">12 months of us (⁀ᗢ⁀)</div>
    <div class="book" id="book">
    <div class="page" id="page0"><img src="assets/images/scrapbook/photo1.jpg"></div>
    <div class="page" id="page1"><img src="assets/images/scrapbook/photo2.jpg"></div>
    <div class="page" id="page2"><img src="assets/images/scrapbook/photo3.jpg"></div>
    <div class="page" id="page3"><img src="assets/images/scrapbook/photo4.jpg"></div>
    <div class="page" id="page4"><img src="assets/images/scrapbook/photo5.jpg"></div>
    </div>

    <div class="page-controls">
        <button id="prev-page" class="arrow-btn">〈</button>
        <button id="next-page" class="arrow-btn">〉</button>
    </div>

  `);

  const pages = document.querySelectorAll('#book .page');
  let current = 0;

  pages.forEach((page, i) => page.style.zIndex = pages.length - i);

  document.getElementById('next-page').onclick = () => {
    if (current < pages.length - 1) {
      pages[current].classList.add('page-flip');
      current++;
    }
  };

  document.getElementById('prev-page').onclick = () => {
    if (current > 0) {
      current--;
      pages[current].classList.remove('page-flip');
    }
  };
});


// --- CANDLE FLICKER ---
const candle = document.getElementById('candle');
let frame = 1;

setInterval(() => {
  frame = frame === 3 ? 1 : frame + 1;
  candle.src = `assets/images/candle${frame}.png`;
}, 120); // flicker every 120ms

// --- CAMERA (Photobooth) ---
const cameraBtn = document.getElementById('camera');

cameraBtn.addEventListener('click', async () => {
    openPopup(`
    <div class="popup-title">let's take a pic!!!!!</div>
    <div id="camera-screen">
        <video id="cameraStream" autoplay></video>
        <div id="countdown"></div>
        <div id="flash"></div>
    </div>
    `);


  const video = document.getElementById('cameraStream');
  const countdownEl = document.getElementById('countdown');

  // Access camera
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  const photos = [];
  let current = 0;

  function takePhotoSequence() {
    if (current >= 4) {
      showStrip();
      return;
    }

    let count = 3;
    countdownEl.textContent = count;

    const interval = setInterval(() => {
      count--;
      countdownEl.textContent = count;
      if (count <= 0) {
        clearInterval(interval);
        flash();
        capturePhoto();
      }
    }, 1000);
  }

    function capturePhoto() {
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        const canvas = document.createElement('canvas');
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        const ctx = canvas.getContext('2d');

        // APPLY YOUR EXACT VINTAGE FILTER HERE
        ctx.filter =
        "grayscale(100%) " +
        "brightness(92%) " +
        "contrast(125%) " +
        "sepia(10%) " +
        "blur(0.2px)";

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // NOW the filtered pixels are baked in
        photos.push(canvas.toDataURL('image/png'));

        current++;
        takePhotoSequence();
    }



    function flash() {
        const flashEl = document.getElementById('flash');
        flashEl.style.opacity = '1';
        setTimeout(() => flashEl.style.opacity = '0', 150);
    }




// function showStrip() {
//   // Stop camera
//   stream.getTracks().forEach(track => track.stop());

//   const inner = document.getElementById('popup-inner');
//   inner.innerHTML = '';

//   // Photostrip
//   const strip = document.createElement('div');
//   strip.id = 'finalStrip';

//   photos.forEach(p => {
//     const img = document.createElement('img');
//     img.src = p;
//     strip.appendChild(img);
//   });

//   inner.appendChild(strip);

// //   // Email + Save input
// //   const emailInput = document.createElement('input');
// //   emailInput.id = 'emailInput';
// //   emailInput.placeholder = 'send to an email';

// //   const messageInput = document.createElement('textarea');
// //   messageInput.id = 'emailMessage';
// //   messageInput.placeholder = 'add a message? (if you don\'t i have a message for you)';

//   inner.appendChild(emailInput);
//   inner.appendChild(messageInput);

//   // Buttons container
//   const btnContainer = document.createElement('div');
//   btnContainer.id = 'sendSaveContainer';

// //   const sendBtn = document.createElement('button');
// //   sendBtn.id = 'sendStrip';
// //   sendBtn.textContent = 'Email Photo Strip';
// //   sendBtn.onclick = () => sendPhoto(strip, emailInput.value, messageInput.value);

//   const saveBtn = document.createElement('button');
//   saveBtn.id = 'saveStrip';
//   saveBtn.textContent = 'Save Photo Strip';
//   saveBtn.onclick = () => saveStrip(strip);

//   btnContainer.appendChild(sendBtn);
//   btnContainer.appendChild(saveBtn);
//   inner.appendChild(btnContainer);

//   // Retake button below
//   const retakeBtn = document.createElement('button');
//   retakeBtn.id = 'retake';
//   retakeBtn.textContent = 'Retake';
//   retakeBtn.onclick = () => cameraBtn.click();
//   inner.appendChild(retakeBtn);
// }

function showStrip() {
  const inner = document.getElementById('popup-inner');
  inner.innerHTML = '';

  const layout = document.createElement('div');
  layout.id = 'finalStripLayout';

  const strip = document.createElement('div');
  strip.id = 'finalStrip';
  strip.classList.add("vintage-preview");


  photos.forEach(p => {
    const img = document.createElement('img');
    img.src = p;
    strip.appendChild(img);
  });

  layout.appendChild(strip);

  // Actions container
  const actions = document.createElement('div');
  actions.id = 'stripActions';

  const saveBtn = document.createElement('button');
  saveBtn.id = 'saveStrip';
  saveBtn.textContent = 'Save Photo Strip';
  saveBtn.onclick = () => saveStrip(strip);

  const retakeBtn = document.createElement('button');
  retakeBtn.id = 'retake';
  retakeBtn.textContent = 'Retake';
  retakeBtn.onclick = () => cameraBtn.click();

  actions.appendChild(saveBtn);
  actions.appendChild(retakeBtn);

  layout.appendChild(actions);
  inner.appendChild(layout);
}


// Send via EmailJS
async function stripToSmallDataURL(stripDiv, maxWidth = 300) {
  const canvas = document.createElement('canvas');
  const width = maxWidth;
  const height = (stripDiv.offsetHeight / stripDiv.offsetWidth) * width;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.filter = 'sepia(80%) contrast(120%) grayscale(80%)';

  const imgs = stripDiv.querySelectorAll('img');
  let loaded = 0;

  return new Promise(resolve => {
    imgs.forEach((img, i) => {
      const temp = new Image();
      temp.src = img.src;
      temp.onload = () => {
        ctx.drawImage(temp, 0, i * (height / imgs.length), width, height / imgs.length);
        loaded++;
        if (loaded === imgs.length) resolve(canvas.toDataURL('image/png'));
      }
    });
  });
}


async function sendPhoto(stripDiv, email, message) {
  if (!email) return alert('Please enter an email address!');

  const dataURL = await stripToSmallDataURL(stripDiv, 300); // smaller version
  const emailMessage = message || 'Here is your vintage photo strip! 💗';

  emailjs.send('service_ahr1h8g', 'template_pk9q2vd', {
    to_email: email,
    photo_url: dataURL,
    custom_message: emailMessage
  }).then(() => alert('Email sent! 💌'), err => alert('Error: ' + JSON.stringify(err)));
}



  takePhotoSequence();
});

function saveStrip(stripDiv) { 
    const canvas = document.createElement('canvas');
    const width = stripDiv.offsetWidth;
    const height = stripDiv.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // MATCH CSS FILTER (drop-shadow removed because canvas can't use it)
    ctx.filter =
        "grayscale(100%) " +
        "brightness(92%) " +
        "contrast(125%) " +
        "sepia(10%) " +
        "blur(0.2px)";

    const imgs = Array.from(stripDiv.querySelectorAll("img"));

    // WAIT UNTIL ALL <img> ARE FULLY LOADED
    Promise.all(
        imgs.map(img => {
            return new Promise(resolve => {
                if (img.complete) return resolve();
                img.onload = resolve;
            });
        })
    ).then(() => {
        const imgHeight = height / imgs.length;

        imgs.forEach((img, i) => {
            ctx.drawImage(img, 0, i * imgHeight, width, imgHeight);
        });

        const link = document.createElement("a");
        link.download = "photo-strip.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}







// document.getElementById('popup-content').style.background = 'red';
// document.getElementById('popup-content').style.width = '4000px';
// document.getElementById('popup-content').style.height = '3000px';
