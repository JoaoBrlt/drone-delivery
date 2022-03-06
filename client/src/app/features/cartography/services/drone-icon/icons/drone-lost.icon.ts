export function droneLostIcon(droneColor: string, secondaryColor: string): string {
  return (
    '<svg id="drone-lost-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 1120">' +
      '<g id="map">' +
        '<path id="map-stroke" style="fill: black" d="M1083.51,702.51l-38.18-9.39-63.2-15.53c-6.22-1.53-12.55-3-18.67-4.46l-8.63-2-18-4.28-4.57-1.08-8.2,1.64L748.38,702.51l-12-3.68c-.52-.16-1-.31-1.48-.47-1.4-.45-3-1-4.85-1.43l-5-1.27Q670.3,681.79,615.56,668c-20.2-5.1-33.43.84-41,6.72s-16.5,17.18-16.5,37.83v322.34c0,25.81,12.21,41.35,37.33,47.5q24,5.88,47.9,11.8l39.05,9.62c9.27,2.28,18.55,4.52,27.94,6.79l17.34,4.21,13.64,3.3,6,1.45,6.81-1.37L929.66,1083l47.87,12.17c28.6,7.28,57,14.5,85.39,21.68a54.33,54.33,0,0,0,13.39,1.73,43.14,43.14,0,0,0,26.88-8.95c10.88-8.47,16.88-21.7,16.88-37.25q0-161.72,0-323.45C1120.07,724.44,1107.43,708.39,1083.51,702.51Z"/>' +
        `<g id="map-fill" style="fill: ${secondaryColor}">` +
          '<path id="map-fill-3" d="M729.05,1091.37c-13.8-3.35-27.27-6.58-40.72-9.89q-43.49-10.68-87-21.42c-14-3.42-18.28-8.83-18.28-23.22V714.5c0-17.09,9.63-24.54,26.36-20.32q57.24,14.46,114.47,29c1.64.41,3.24,1,5.14,1.56Z"/>' +
          '<path id="map-fill-2" d="M949.05,1064.15V697.41c9.22,2.19,18.19,4.27,27.13,6.46q50.69,12.43,101.37,24.92c12.8,3.14,17.52,9.06,17.52,22.15q0,161.73,0,323.45c0,15.84-10.62,24.13-26,20.24C1029.24,1084.56,989.44,1074.41,949.05,1064.15Z"/>' +
          '<path id="map-fill-1" d="M766.28,726.43l145.54-29.12v365.78L766.28,1092.2Z"/>' +
        '</g>' +
      '</g>' +
      '<g id="drone">' +
        '<path id="drone-stroke" style="fill: black" d="M1016,100.89A195.55,195.55,0,0,0,895.58,46.14,194.06,194.06,0,0,0,694.15,187.08c-10.74,38.32-9.32,79.57,3.9,113.17l6.41,16.29Q690.26,328.39,676,340.22c-69.65,57.88-163.29,57.55-233-.81L441.35,338l-25.21-21.09L422.41,300c13.45-36.33,14.13-78.17,1.9-117.83-13.41-43.51-40.77-79.83-79.11-105a193.53,193.53,0,0,0-245.07,27.65A193.15,193.15,0,0,0,81.52,351.52,193.52,193.52,0,0,0,239.08,433c21.57,0,42.56-3.71,61.16-11.08l16.23-6.42,6.09,7.3,15.81,19c59.9,71.85,60,164.6.18,236.28Q328,690.69,317.43,703.32l-1.25,1.5-15.64-6.46c-32.08-13.24-72.31-15.1-110.37-5.1a191.77,191.77,0,0,0-107,73,193.67,193.67,0,0,0,140.23,307.43q8,.67,16,.67A193.7,193.7,0,0,0,426.3,931.15c10.42-38.4,8.74-79.07-4.61-111.59l-6.52-15.9q14.56-12.07,29.15-24.1c33.38-27.48,69.19-41.36,109.5-42.44l22.26-.59,2-22.18c1.05-11.9,6.3-18.31,10.51-21.59h0c4.91-3.82,13.78-7.62,28.1-4q55,13.89,109.94,27.84l4.54,1.15c1.4.35,2.69.77,4,1.17l.16.05,1.5.48,15.63,4.79,58-11.6L780.58,677c-58.48-70-58.54-164-.15-233.8l10.28-12.3q6.19-7.39,12.43-14.87l17.07,6.34A174.34,174.34,0,0,0,880.92,433a193.86,193.86,0,0,0,161.91-87.93C1093.41,267.73,1082.12,165,1016,100.89Z"/>' +
        `<g id="drone-fill" style="fill: ${droneColor}">` +
          '<path id="drone-fill-8" d="M291,398.67c-5.49-6.62-11.2-12.74-16-19.5-4.4-6.21-9.35-7.52-16.9-6.88-13.18,1.11-26.74,1.85-39.76,0-74.89-10.52-125.86-83.63-111.58-159,13.91-73.42,88.8-122.47,161.49-105.78,69.84,16,114.14,80.34,104.33,151.21-.49,3.58-1,8.82,1,10.77,7.79,7.71,16.57,14.42,25.37,21.82C421.42,230.7,402.89,145,331.47,98.05,264.23,53.86,174.16,64,118.14,122.15,61.46,181,54.69,270.72,101.88,337,150.51,405.33,235.33,420.72,291,398.67Z"/>' +
          '<path id="drone-fill-7" d="M246.36,242.42c25.62-23.48,57.2-24.16,93.52-1.42,3.81-53.65-43.88-102.43-99.59-102.84-58.68-.43-105.24,48.75-102,107.71,3,53.12,53.22,99.38,101.9,93.78C218,295.79,219.79,266.76,246.36,242.42Z"/>' +
          '<path id="drone-fill-6" d="M981.84,239.81c.2-56.58-46.17-102.39-102.91-101.64-55.16.73-101.1,47.93-99.08,102.7,38.1-21.74,66.69-22.65,91-.53,32.86,29.88,32.2,64.15,8.18,99.85C934.88,341.76,981.63,295.58,981.84,239.81Z"/>' +
          '<path id="drone-fill-5" d="M741.58,274.42c6.33-4.28,6.45-9.37,6.06-16.18-.78-13.57-1.73-27.45.16-40.81,9.56-67.51,72.42-117,142-112.84,67.49,4.08,123.57,61.64,125.7,129,2.71,85.62-69.67,150.44-155.14,139.13-3.5-.47-8.6-.51-10.61,1.55-7.4,7.59-13.81,16.14-20.87,24.67,61.43,22.83,146.75,3.22,193-67.52,44-67.36,34.16-156.82-23.34-212.57C939.44,61.5,849.7,54.42,783,101.87c-68.5,48.72-83.61,133.42-61.65,189.23C728.57,285,734.66,279.11,741.58,274.42Z"/>' +
          '<path id="drone-fill-4" d="M138.19,883c1.06,57.36,51.34,102.86,108.91,98.57,53.08-4,99-54.61,92.39-101.88-41.72,22.32-70.94,20.88-95.77-4.7-24.62-25.36-25.72-56.16-2.78-95.13C184.78,777.45,137.14,825.71,138.19,883Z"/>' +
          '<path id="drone-fill-3" d="M573.21,673c7.62-5.93,24.2-14.93,49.58-8.53q56,14.14,111.93,28.34l2.57.66c2.15.54,4,1.12,5.44,1.6l1.36.43,9.59,2.94,10.51-2.11c-.93-1.11-1.86-2.23-2.8-3.34-66.12-79.14-66.18-186.86-.15-265.86,30.2-36.13,60.47-72.22,90.24-108.7a48.48,48.48,0,0,0,9.87-20.41c2.89-14.75-4.53-28.41-17.16-35.51-13.38-7.51-28.31-6.12-41.16,4.52-37.09,30.7-74,61.62-111,92.39-78.67,65.37-186.4,64.95-265-.87-36.11-30.23-72.22-60.46-108.72-90.21a47.67,47.67,0,0,0-20.44-9.75c-14.81-2.8-28.3,4.67-35.36,17.41-7.27,13.13-6.08,27.91,4.13,40.28q45.3,54.88,91,109.44c67.51,81,67.57,187.48.17,268.3-30.39,36.43-60.91,72.76-91,109.45-16.92,20.64-8.48,49.56,16.28,57,13.19,3.95,24.75.32,35.22-8.45Q373.19,806,428.43,760.26c37.15-30.59,78.68-46.9,124.72-48.13C555.09,690.38,566.28,678.43,573.21,673ZM560.06,475.66a84.54,84.54,0,0,1,84.28,84.66c-.14,46.45-38.38,84.28-84.94,84-46-.26-83.67-38.12-83.74-84.16A84.54,84.54,0,0,1,560.06,475.66Z"/>' +
          '<path id="drone-fill-2" d="M559.47,610.59A50.6,50.6,0,1,0,509.41,560,50.75,50.75,0,0,0,559.47,610.59Z"/>' +
          '<path id="drone-fill-1" d="M378.19,845.83c-5.71,4.07-6.38,8.63-5.94,15.26.89,13.56,1.88,27.45,0,40.81-10.5,74.72-84.2,125.86-159.2,111.22C139.43,998.75,90.8,924.21,107.59,851.46,123.66,781.8,188,737.66,259,747.3c4,.54,9.58-.13,12.12-2.6,7.23-7,13.26-15.28,19.91-23.23C239.08,700,153.57,712.32,103.31,781a168.24,168.24,0,0,0,16.76,218.86c58.21,58.35,150.4,66,217.18,18.12,69.68-49.93,83-136.06,61.32-188.91C391.7,834.78,385.29,840.79,378.19,845.83Z"/>' +
        '</g>' +
      '</g>' +
    '</svg>'
  );
}
