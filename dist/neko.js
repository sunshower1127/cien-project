// NEKO FOR JAVASCRIPT
// THIS SCRIPT CODE IS (C) 2004 GREGORY BELL, ALL RIGHTS RESERVED.
// ANYONE IS GRANTED THE RIGHT TO EXECUTE THIS PROGRAM BY LINKING TO IT
// IN THEIR WEB PAGE.
//
// THIS RIGHT DOES NOT EXTEND TO TAKING THE CODE AND HOSTING IT ON A DIFFERENT
// SERVER.
//
// I WORKED HARD TO MAKE THIS AND WOULD LIKE TO KEEP IT, SO PLEASE HAVE FUN
// BUT DON'T STEAL IT!
//
// THANK YOU
var layerSize = 32;

function gE(e, i) {
  if (l) {
    var o = (i = i || self).document.layers;
    if (o[e]) return o[e];
    for (var s = 0; s < o.length; ) t = gE(e, o[s++]);
    return t;
  }
  return d.all ? d.all[e] : d.getElementById(e);
}
function sE(e) {
  l ? (e.visibility = "show") : (e.style.visibility = "visible");
}
function hE(e) {
  l ? (e.visibility = "hide") : (e.style.visibility = "hidden");
}
function sZ(e, t) {
  l ? (e.zIndex = t) : (e.style.zIndex = t);
}
function sX(e, t) {
  l ? (e.left = t) : op ? (e.style.pixelLeft = t) : (e.style.left = t + px);
}
function sY(e, t) {
  l ? (e.top = t) : op ? (e.style.pixelTop = t) : (e.style.top = t + px);
}
function sW(e, t) {
  l ? (e.clip.width = t) : op ? (e.style.pixelWidth = t) : (e.style.width = t + px);
}
function sH(e, t) {
  l ? (e.clip.height = t) : op ? (e.style.pixelHeight = t) : (e.style.height = t + px);
}
function sC(e, t, i, o, s) {
  l ? ((X = e.clip), (X.top = t), (X.right = i), (X.bottom = o), (X.left = s)) : (e.style.clip = "rect(" + t + px + " " + i + px + " " + o + px + " " + s + px + ")");
}
function wH(e, t) {
  l && ((Y = e.document), Y.open(), Y.write(t), Y.close()), e.innerHTML && (e.innerHTML = t);
}
function cE(i) {
  l
    ? ((d.layers[i] = new Layer(0)), eval("document." + i + "=d.layers[i]"))
    : void 0 !== d.createElement &&
      ((X = "<div id='" + i + '\' style="position:absolute">&nbsp;</div>'),
      (Y = false) /*d.createElement("DIV")*/,
      Y ? ((Y.innerHTML = X), d.body.appendChild(Y)) : void 0 !== d.body.insertAdjacentHTML && d.body.insertAdjacentHTML("BeforeEnd", X));
}
function byName(e, t) {
  for (var i = 0; i < e.length; i++) if (e[i].name == t) return e[i];
  return null;
}
function createLayer(e, t, i, o, s, a) {
  cE(e);
  var r = gE(e);
  sC(r, 0, o, s, 0);
  sE(r);
  sX(r, t);
  r.myx = t;
  sY(r, i);
  r.myy = i;
  wH(r, a);
  sZ(r, 1e3);

  // 컨테이너가 설정되어 있으면, 기본 body에서 컨테이너로 이동
  if (nekoContainer && r.parentNode && r.parentNode !== nekoContainer) {
    r.parentNode.removeChild(r);
    nekoContainer.appendChild(r);
  }

  return r;
}
function Neko(x, y, active, imagedirectory) {
  (this.findHome = function () {
    (this.homeX = eval(this.homeXfn)), (this.homeY = eval(this.homeYfn));
  }),
    x || (x = 0),
    y || (y = 0),
    parseInt(x) != x ? ((this.homeXfn = x), (this.homeYfn = y), this.findHome(), (x = this.homeX), (y = this.homeY)) : ((x = parseInt(x)), (y = parseInt(y))),
    active || (active = !1),
    !imagedirectory && window.NekoType && (imagedirectory = window.NekoType),
    imagedirectory || (imagedirectory = "i"),
    window.remoteimages || (imagedirectory = "https://webneko.net/" + imagedirectory),
    (this.directory = imagedirectory);
  var aPreLoad = new Array(
    "alert",
    "still",
    "nrun1",
    "nrun2",
    "nerun1",
    "nerun2",
    "erun1",
    "erun2",
    "serun1",
    "serun2",
    "srun1",
    "srun2",
    "swrun1",
    "swrun2",
    "wrun1",
    "wrun2",
    "nwrun1",
    "nwrun2",
    "yawn",
    "sleep1",
    "sleep2",
    "itch1",
    "itch2",
    "nscratch1",
    "nscratch2",
    "escratch1",
    "escratch2",
    "sscratch1",
    "sscratch2",
    "wscratch1",
    "wscratch2",
  );
  this.aGifs = new Array();
  for (var i = 0; i < aPreLoad.length; i++) {
    var imgTemp = new Image();
    (imgTemp.src = this.directory + "/" + aPreLoad[i] + ".gif"), (this.aGifs[aPreLoad[i]] = imgTemp);
  }
  (this.whichNeko = aNekos.length),
    (aNekos[aNekos.length] = this),
    (this.a_resting = new Array("", 'this.SetBehavior("wakingup")', "this.chooseIdle()", "8", "1", "still")),
    (this.a_itching = new Array("", 'this.SetBehavior("wakingup")', 'this.SetBehavior("resting")', "6", ".5", "itch2", "itch1")),
    (this.a_scratching = new Array("", 'this.SetBehavior("wakingup")', 'this.SetBehavior("resting")', "4", "2", "scratch1", "scratch2")),
    (this.a_yawning = new Array("", 'this.SetBehavior("wakingup")', 'this.SetBehavior("resting2")', "5", "1", "yawn")),
    (this.a_resting2 = new Array("", 'this.SetBehavior("wakingup")', 'this.SetBehavior("sleeping")', "9", "1", "still")),
    (this.a_wakingup = new Array('this.SetBehavior("resting")', "", 'this.SetBehavior("chasing")', "1", "1", "alert", "still")),
    (this.a_chasing = new Array('this.SetBehavior("resting")', "", "", "0", "1", "run1", "run2")),
    (this.a_sleeping = new Array("", 'this.SetBehavior("wakingup")', "", "0", "1", "sleep1", "sleep1", "sleep1", "sleep2", "sleep2", "sleep2")),
    (this.behaviorRepetition = 0),
    (this.loopTimes = 0);
  var strLayer = "layerNeko" + this.whichNeko,
    strImage = "imageNeko" + this.whichNeko,
    strImageSrc = this.directory + "/still.gif",
    strNekoObj = "aNekos[" + this.whichNeko + "]",
    // a 태그 제거하고 img만 사용 (크기 설정 추가)
    strContent =
      "<img border='0' name='" +
      strImage +
      "' src='" +
      strImageSrc +
      "' style='width:" +
      layerSize +
      "px; height:" +
      layerSize +
      "px; image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: -o-crisp-edges; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;'>";
  (this.layer = createLayer(strLayer, x, y, layerSize, layerSize, strContent)),
    (this.layer.Neko = this),
    (this.homeX = this.layer.myx),
    (this.homeY = this.layer.myy),
    (this.doc = this.layer.document),
    this.doc || (this.doc = document),
    (this.image = byName(this.doc.images, strImage)),
    (this.image.Neko = this),
    window.delay && window.delay > 0 ? (this.delay = window.delay + Math.floor(nDelayVariance * Math.random() - 5)) : (this.delay = 250 + Math.floor(nDelayVariance * Math.random() - 5)),
    (this.delayMultiplier = 1),
    // 스텝 사이즈를 적당하게 조정 (24 -> 18)
    window.stepsize && window.stepsize > 0 ? (this.stepsize = window.stepsize) : (this.stepsize = 18),
    // 항상 활성화 상태로 시작 (사용자 클릭 불필요)
    (this.active = true),
    this.SetBehavior("resting"),
    (this.frame = nFirstRealFrame),
    (this.direction = ""),
    (this.looseDirection = ""),
    (this.endx = 0),
    this.endy,
    this.distx,
    this.disty,
    this.steps,
    (this.caught = !0),
    this.dx,
    this.dy,
    (this.boardX = -1),
    (this.boardY = -1),
    (this.eccX = Math.floor(checkerboardEccentricity * Math.random() - checkerboardEccentricity / 2)),
    (this.eccY = Math.floor(checkerboardEccentricity * Math.random() - checkerboardEccentricity / 2)),
    this.Think();
}
function NekoMessage() {
  // 상태 메시지 제거
  window.status = "";
}
function NekoTargetMouse() {
  var e = mouse.x + 4,
    t = mouse.y - 20;
  (this.endx = e), (this.endy = t), box.setBoard(this.whichNeko, this.endx, this.endy);
}
function NekoShow() {
  sE(this.layer);
}
function NekoHide() {
  hE(this.layer);
}
function NekoTargetHome() {
  (this.endx = this.homeX), (this.endy = this.homeY);
}

// 랜덤 위치 생성 함수 추가
function NekoTargetRandom() {
  var maxWidth = box.width() - 50;
  var maxHeight = box.height() - 50;

  var randomX = Math.floor(Math.random() * maxWidth);
  var randomY = Math.floor(Math.random() * maxHeight);

  this.endx = randomX;
  this.endy = randomY;
  box.setBoard(this.whichNeko, this.endx, this.endy);
}

function NekoCalculateDistance() {
  (this.distx = this.endx - this.layer.myx),
    (this.disty = this.endy - this.layer.myy),
    (this.steps = Math.sqrt(Math.pow(this.distx, 2) + Math.pow(this.disty, 2)) / this.stepsize),
    this.steps >= 1 ? (this.caught && eval(this.onUnCaught), (this.caught = !1)) : (this.caught || eval(this.onCaught), (this.caught = !0)),
    (this.dx = this.distx / this.steps),
    (this.dy = this.disty / this.steps);
}
function NekoSetBehavior(strNewBehavior) {
  (this.behavior = strNewBehavior), (this.frame = nFirstRealFrame);
  var paImages = eval("aNekos[" + this.whichNeko + "].a_" + this.behavior);
  (this.onCaught = paImages[0]), (this.onUnCaught = paImages[1]), (this.onLoopEnd = paImages[2]), (this.loopTimes = paImages[3]), (this.delayMultiplier = paImages[4]);
}
function NekoUpdateImage() {
  var paImages = eval("aNekos[" + this.whichNeko + "].a_" + this.behavior);
  if (this.frame >= paImages.length)
    if ((this.behaviorRepetition++, 0 != this.loopTimes && this.behaviorRepetition >= this.loopTimes)) {
      (this.behaviorRepetition = 0), eval(this.onLoopEnd);
      var paImages = eval("aNekos[" + this.whichNeko + "].a_" + this.behavior);
    } else this.frame = nFirstRealFrame;
  if (this.aGifs[this.direction + paImages[this.frame]]) {
    var strImage = this.aGifs[this.direction + paImages[this.frame]].src;
    this.image.src = strImage;
  } else if (this.aGifs[paImages[this.frame]]) {
    var strImage = this.aGifs[paImages[this.frame]].src;
    this.image.src = strImage;
  } else if (this.looseDirection + this.aGifs[paImages[this.frame]]) {
    var strImage = this.aGifs[this.looseDirection + paImages[this.frame]].src;
    this.image.src = strImage;
  } else this.image.src = this.aGifs.alert.src;
  this.frame++;
}
function NekoMoveAStep() {
  this.steps >= 1 ? ((this.layer.myx += this.dx), (this.layer.myy += this.dy)) : ((this.layer.myx = this.endx), (this.layer.myy = this.endy)),
    box.checkBoard(this.whichNeko, this.layer.myx, this.layer.myy) && ((this.layer.myx += this.eccX), (this.layer.myy += this.eccY)),
    sX(this.layer, this.layer.myx),
    sY(this.layer, this.layer.myy),
    box.setBoard(this.whichNeko, this.layer.myx, this.layer.myy);
}
function NekoFindDirection() {
  if (0 != t || 0 != e) {
    var e = -1 * this.dy,
      t = this.dx,
      i = Math.abs(t),
      o = "",
      s = "",
      a = Math.abs(e) / i,
      r = a < 0.41421,
      h = a > 2.4142;
    e > 0 ? r || (o = "n") : r || (o = "s"), t > 0 ? h || (s = "e") : h || (s = "w"), (this.looseDirection = "" != s ? s : o), (this.direction = o + s);
  } else this.direction = "";
}
function NekoThink() {
  // 항상 랜덤 이동 시스템 사용
  // 이동과 정지 상태 관리
  if (this.caught) {
    // 정지 상태에서는 일정 시간 후 이동 상태로 변경
    if (Math.random() < 0.02) {
      // 낮은 확률로 이동 시작 (약 10~20초 정지 효과)
      // 새로운 랜덤 위치 설정
      this.TargetRandom();
      this.SetBehavior("chasing"); // 이동 행동 설정
    }
  } else {
    // 이동 완료 시 정지 상태로 전환
    if (this.steps < 1) {
      // 이동이 완료됨 - 정지 행동 설정
      this.SetBehavior("sleeping");
      this.caught = true;
    }
  }

  this.CalculateDistance();
  this.FindDirection();
  this.UpdateImage();

  if ("chasing" == this.behavior) {
    this.MoveAStep();
  }

  // 항상 일정한 애니메이션 속도 유지
  var nextThinkTime = Math.floor((this.delay * this.delayMultiplier) / nekoSpeedFactor);
  setTimeout("try{aNekos[" + this.whichNeko + "].Think()}catch(e){}", nextThinkTime);
}
function nekoChooseIdle() {
  var e = new Array("resting", "yawning", "itching", "scratching"),
    t = Math.floor(Math.random() * e.length);
  this.SetBehavior(e[t]);
}
function startANeko() {
  var e = 0,
    t = 0;
  window.startNekoX && (e = window.startNekoX),
    window.startNekoY && (t = window.startNekoY),
    parseInt(e) != e &&
      (window.onresize = function () {
        for (var e = 0; e < aNekos.length; e++) aNekos[e].homeXfn && aNekos[e].findHome();
      });

  // 애니메이션 관련 설정
  window.delay = 250; // 기본 딜레이
  window.stepsize = 18; // 적당한 이동 속도
  nDelayVariance = 50;

  // 초기 속도 설정
  nekoSpeedFactor = window.initialNekoSpeed || 1.0;

  // 고양이 생성 (항상 활성화 상태)
  if (window.autoCreateNeko !== false) {
    // addNeko();
  }
  window.onloadOriginal();
}
function mouse() {
  (this.x = 0), (this.y = 0);
}
function box() {
  (this.width = function () {
    return window.innerWidth ? window.innerWidth : document.body.clientWidth;
  }),
    (this.height = function () {
      return window.innerHeight ? window.innerHeight : document.body.clientHeight;
    }),
    (this.xoffset = function () {
      return void 0 !== window.pageXOffset ? window.pageXOffset : document.body.scrollLeft;
    }),
    (this.yoffset = function () {
      return void 0 !== window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
    });
}
function boxBoundWidth(e) {
  0 == e || e || (e = this.width());
  var t = this.width() - 36;
  return e < 0 && (e = 0), e > t && (e = t), e;
}
function boxBoundHeight(e) {
  0 == e || e || (e = this.height());
  var t = this.height() - 12;
  return e < 20 && (e = 20), e > t && (e = t), e;
}
function boxSetBoard(e, t, i) {
  var o = Math.floor((t / this.width()) * checkerboardScale),
    s = Math.floor((i / this.height()) * checkerboardScale);
  o < 0 && (o = 0), o >= checkerboardScale && (o = checkerboardScale - 1), s < 0 && (s = 0), s >= checkerboardScale && (s = checkerboardScale - 1);
  var a = aNekos[e];
  return (
    (a.boardX == o && a.boardY == s) || (-1 != a.boardX && checkerboard[a.boardX][a.boardY]--, checkerboard[o][s]++, (a.boardX = o), (a.boardY = s)),
    0 == checkerboard[o][s] ? 0 : checkerboard[o][s] - 1
  );
}
function boxCheckBoard(e, t, i) {
  var o = Math.floor((t / this.width()) * checkerboardScale),
    s = Math.floor((i / this.height()) * checkerboardScale);
  o < 0 && (o = 0), o >= checkerboardScale && (o = checkerboardScale - 1), s < 0 && (s = 0), s >= checkerboardScale && (s = checkerboardScale - 1);
  var a = aNekos[e],
    r = 0;
  return a.boardX == o && a.boardY == s && (r = 1), checkerboard[o][s] - r;
}
(d = document), (l = d.layers), (op = -1 != navigator.userAgent.indexOf("Opera")), (px = "px") /*, document.write('<style type="text/css">#nl{display:none;}</style>')*/;
document.write('<style type="text/css">[id^="layerNeko"] img { image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges; }</style>');
var checkerboardEccentricity = 10,
  checkerboardScale = 20,
  nDelayVariance = 50, // 애니메이션 일관성을 위해 감소
  nFirstRealFrame = 5,
  // 메시지 비움
  sNekoMessage = "",
  sNekoMessageCaught = "",
  aNekos = new Array();
(Neko.prototype.message = NekoMessage),
  (Neko.prototype.TargetRandom = NekoTargetRandom), // 랜덤 이동 메소드 추가
  (Neko.prototype.TargetMouse = NekoTargetMouse),
  (Neko.prototype.Show = NekoShow),
  (Neko.prototype.Hide = NekoHide),
  (Neko.prototype.TargetHome = NekoTargetHome),
  (Neko.prototype.CalculateDistance = NekoCalculateDistance),
  (Neko.prototype.SetBehavior = NekoSetBehavior),
  (Neko.prototype.UpdateImage = NekoUpdateImage),
  (Neko.prototype.MoveAStep = NekoMoveAStep),
  (Neko.prototype.FindDirection = NekoFindDirection),
  (Neko.prototype.Think = NekoThink),
  (Neko.prototype.chooseIdle = nekoChooseIdle),
  (window.onloadOriginal = new Function()),
  window.onload && (window.onloadOriginal = window.onload),
  window.NekoNoDefault || (window.onload = startANeko),
  (mouse = new mouse()),
  (box.prototype.boundWidth = boxBoundWidth),
  (box.prototype.boundHeight = boxBoundHeight),
  (box.prototype.setBoard = boxSetBoard),
  (box.prototype.checkBoard = boxCheckBoard),
  (box = new box()),
  (document.onmousemove = function (e) {
    var t = e ? e.pageX : event.x + document.body.scrollLeft,
      i = e ? e.pageY : event.y + document.body.scrollTop;
    (mouse.x = box.boundWidth(t)), (mouse.y = box.boundHeight(i));
  }),
  document.captureEvents && document.captureEvents(Event.MOUSEMOVE);
for (var checkerboard = new Array(checkerboardScale), i = 0; i < checkerboardScale; i++) {
  checkerboard[i] = new Array(checkerboardScale);
  for (var j = 0; j < checkerboardScale; j++) checkerboard[i][j] = 0;
}

// 전역 변수로 네코 컨테이너 요소를 저장
var nekoContainer = null;
// 전역 애니메이션 속도 설정 (기본값: 1.0)
var nekoSpeedFactor = 1.0;
// 전역 사이즈 설정 (기본값: 1.0)
var nekoSizeFactor = 1.0;

// 네코 생성 함수
function addNeko(nekoType = "white") {
  // 랜덤 위치 계산
  var x = Math.floor(Math.random() * (box.width() - 100));
  var y = Math.floor(Math.random() * (box.height() - 100));

  // 네코 생성
  window.NekoType = nekoType;
  var newNeko = new Neko(x, y, true);

  // 생성된 네코를 컨테이너에 추가
  if (nekoContainer) {
    // 레이어를 컨테이너로 이동
    var nekoLayer = document.getElementById("layerNeko" + (aNekos.length - 1));
    if (nekoLayer && nekoLayer.parentNode) {
      nekoLayer.parentNode.removeChild(nekoLayer);
      nekoContainer.appendChild(nekoLayer);
    }
  }

  // 현재 설정된 크기 적용
  if (nekoSizeFactor !== 1.0) {
    applyNekoSizeToElement(newNeko, nekoSizeFactor);
  }
  setNekoImageRendering();

  return newNeko;
}

// 네코 제거 함수
function removeNeko() {
  if (aNekos.length > 0) {
    // 마지막으로 추가된 네코 제거
    var lastIndex = aNekos.length - 1;
    var lastNeko = aNekos[lastIndex];

    // DOM에서 레이어 제거
    var layerId = "layerNeko" + lastIndex;
    var layer = document.getElementById(layerId);
    if (layer && layer.parentNode) {
      layer.parentNode.removeChild(layer);
    }

    // 배열에서 제거
    aNekos.pop();

    return true;
  }

  return false; // 제거할 네코가 없음
}

// 네코 개수 반환 함수
function getNekoLength() {
  return aNekos.length;
}

// 네코 컨테이너 설정 함수
function setNekoContainer(element) {
  if (typeof element === "string") {
    // ID로 요소 찾기
    nekoContainer = document.getElementById(element);
  } else if (element && element.nodeType) {
    // DOM 요소 직접 사용
    nekoContainer = element;
  } else {
    // 기본값: 문서 body
    nekoContainer = document.body;
  }

  // 기존 네코들을 새 컨테이너로 이동
  for (var i = 0; i < aNekos.length; i++) {
    var nekoLayer = document.getElementById("layerNeko" + i);
    if (nekoLayer && nekoLayer.parentNode) {
      nekoLayer.parentNode.removeChild(nekoLayer);
      nekoContainer.appendChild(nekoLayer);
    }
  }

  return nekoContainer;
}

// 네코 애니메이션 속도 조절 함수
function setNekoSpeed(speedFactor) {
  // 속도는 0.1(매우 느림)부터 5.0(매우 빠름)까지 제한
  if (speedFactor < 0.1) {
    speedFactor = 0.1;
  } else if (speedFactor > 5.0) {
    speedFactor = 5.0;
  }

  nekoSpeedFactor = speedFactor;

  // 모든 네코의 속도 관련 속성 업데이트
  for (var i = 0; i < aNekos.length; i++) {
    // 이동 속도 조절 (빠를수록 큰 값)
    aNekos[i].stepsize = 18 * speedFactor;

    // 기존 베이스 딜레이 저장 또는 복원
    if (!aNekos[i].baseDelay) {
      aNekos[i].baseDelay = aNekos[i].delay;
    }

    // 딜레이 시간 조절 (빠를수록 작은 값)
    aNekos[i].delay = Math.floor(aNekos[i].baseDelay / speedFactor);
  }

  return nekoSpeedFactor;
}

// 개별 네코의 크기 적용 함수 (내부용)
function applyNekoSizeToElement(neko, sizeFactor) {
  if (!neko || !neko.layer) return;

  // 기본 이미지 크기는 32x32
  var baseSize = 32;
  var newSize = Math.floor(baseSize * sizeFactor);

  // 레이어 크기 조정
  sW(neko.layer, newSize);
  sH(neko.layer, newSize);

  // 클리핑 영역 조정
  sC(neko.layer, 0, newSize, newSize, 0);

  // 이미지 크기와 렌더링 스타일 조정
  if (neko.image) {
    neko.image.width = newSize;
    neko.image.height = newSize;
    neko.image.style.width = newSize + "px";
    neko.image.style.height = newSize + "px";
    // 이미지 렌더링 스타일 설정
    neko.image.style.imageRendering = "pixelated"; // 모던 브라우저용
    neko.image.style.imageRendering = "-moz-crisp-edges"; // Firefox용
    neko.image.style.imageRendering = "-o-crisp-edges"; // Opera용
    neko.image.style.imageRendering = "-webkit-optimize-contrast"; // 구형 Chrome용
    neko.image.style.imageRendering = "crisp-edges"; // 표준 속성
  }
}

// 네코 크기 조절 함수
function setNekoSize(sizeFactor) {
  // 크기는 0.3(매우 작게)부터 5.0(매우 크게)까지 제한
  if (sizeFactor < 0.3) {
    sizeFactor = 0.3;
  } else if (sizeFactor > 5.0) {
    sizeFactor = 5.0;
  }

  nekoSizeFactor = sizeFactor;

  // 모든 네코의 크기 업데이트
  for (var i = 0; i < aNekos.length; i++) {
    applyNekoSizeToElement(aNekos[i], sizeFactor);
  }

  return nekoSizeFactor;
}

// 이미지 선명도 조절 함수 추가 (대화형 조절 원할 경우)
function setNekoImageRendering(renderingStyle) {
  var validStyles = ["auto", "pixelated", "crisp-edges", "-webkit-optimize-contrast"];

  // 기본값 또는 잘못된 값 처리
  if (!renderingStyle || validStyles.indexOf(renderingStyle) === -1) {
    renderingStyle = "pixelated"; // 기본값: 픽셀화 (선명함)
  }

  // 모든 네코 이미지에 렌더링 스타일 적용
  for (var i = 0; i < aNekos.length; i++) {
    if (aNekos[i].image) {
      aNekos[i].image.style.imageRendering = renderingStyle;

      // 브라우저 호환성을 위한 추가 속성들
      if (renderingStyle === "pixelated" || renderingStyle === "crisp-edges") {
        aNekos[i].image.style.imageRendering = "-moz-crisp-edges";
        aNekos[i].image.style.imageRendering = "-o-crisp-edges";
        aNekos[i].image.style.imageRendering = "-webkit-optimize-contrast";
        aNekos[i].image.style.imageRendering = renderingStyle;
      }
    }
  }
}
