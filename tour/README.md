# 골드스파사우나 · 360 가상투어

## 폴더 구조
```
goldspa-tour/
├─ tour.html            ← 투어 페이지 (여기 SCENES 배열만 편집)
├─ lib/
│   ├─ pannellum.js      ← 360 뷰어 라이브러리 (수정 불필요)
│   └─ pannellum.css
└─ images/
    ├─ 01-restarea.jpg   ← 휴게실 (안마의자)
    └─ 02-kidszone.jpg   ← 키즈존
```

## 바로 실행해서 보기
사진을 파일로 불러오기 때문에 `tour.html`을 더블클릭(file://)하면 브라우저 보안 때문에
사진이 안 뜹니다. 반드시 간단한 로컬 서버로 열어주세요.

```bash
# 이 폴더 안에서
python3 -m http.server 8000
```
그다음 브라우저에서 → http://localhost:8000/tour.html

## 지점(사진) 추가하는 법
1. 찍은 360 사진(equirectangular, 가로:세로 = 2:1)을 `images/` 폴더에 넣습니다.
   예: `images/02-main.jpg`
2. `tour.html` 상단의 `SCENES` 배열에 블록을 하나 추가합니다.
   ```js
   {
     id: "main",                 // 고유 이름(겹치면 안 됨)
     name: "장수탕",              // 화면에 뜰 이름
     image: "images/02-main.jpg",
     yaw: 0, pitch: -5,          // 처음 바라볼 방향
     hotSpots: [
       { type:"move", yaw:180, pitch:-12, to:"entrance", text:"입구로" }
     ]
   }
   ```
3. 두 지점을 서로 잇고 싶으면 각 씬의 hotSpots에 `type:"move"` 핫스팟을 넣고
   `to`에 상대 씬의 id를 적습니다.

## 핫스팟 위치(yaw/pitch) 쉽게 잡기
좌표를 손으로 계산할 필요 없습니다. 뷰어를 띄운 뒤 브라우저 개발자도구(F12) 콘솔에
아래를 붙여넣고, 화면에서 원하는 지점을 클릭하면 `[pitch, yaw]` 값이 찍힙니다.
```js
viewer.on('mousedown', e => console.log(viewer.mouseEventToCoords(e)));
```
그 값을 그대로 hotSpots에 넣으세요.

## 사이트에 이식
- 정적 사이트: 이 `goldspa-tour` 폴더를 통째로 사이트에 올리고 `/goldspa-tour/tour.html`로 링크하거나 iframe으로 삽입.
  ```html
  <iframe src="/goldspa-tour/tour.html" style="width:100%;height:600px;border:0"></iframe>
  ```
- React(Next.js 등): 이 폴더를 `public/`에 넣으면 위 iframe이 그대로 동작합니다.
  컴포넌트로 감싸고 싶으면 tour.html의 로직을 React 컴포넌트로 옮기면 됩니다.

## 사진 최적화 팁
- 원본이 8000×4000처럼 크면 로딩이 느립니다. 4096×2048 정도로 리사이즈하면
  화질 손해 거의 없이 훨씬 가볍습니다. (현재 넣어둔 샘플은 4096×2048)

라이브러리: Pannellum (MIT License) — https://pannellum.org
