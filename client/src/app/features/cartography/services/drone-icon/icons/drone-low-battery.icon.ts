export function droneLowBatteryIcon(droneColor: string, secondaryColor: string): string {
  return (
    '<svg id="drone-low-battery-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 1120">' +
      '<g id="battery">' +
        '<path id="battery-stroke" style="fill: black" d="M1120.33,915.62c0-26.1-17.56-43.68-43.65-43.73h-5.76V850.71c0-27.58-17.19-44.71-44.8-44.71H622.76c-27.7,0-44.9,17.29-44.9,45.11v222.83c0,28.55,17,45.59,45.48,45.59H1027.7l2.34,0c22.91-.7,40.47-18.45,40.84-41.28.1-6.58.08-13.14.06-19.49,0-1.69,0-3.38,0-5.07l5.87,0c26-.1,43.53-17.71,43.54-43.82Q1120.36,962.73,1120.33,915.62Z"/>' +
        `<g id="battery-fill" style="fill: ${secondaryColor}">` +
          '<path id="battery-fill-2" d="M1095.33,915.64c0-12.24-6.49-18.73-18.7-18.75-10.07,0-20.15,0-30.71,0V850.72c0-13.61-6.15-19.72-19.8-19.72H622.76c-14,0-19.9,6-19.9,20.11q0,111.42,0,222.83c0,14.74,5.82,20.59,20.48,20.59h402.33c1.2,0,2.4,0,3.6,0,9.61-.29,16.45-7,16.61-16.69.15-9.09,0-18.19,0-27.28v-21.24a6,6,0,0,1,1.45-.57q14.66-.06,29.33-.09c12.21-.05,18.62-6.5,18.63-18.83Q1095.36,962.72,1095.33,915.64Zm-82.77,145.59H636v-197h376.52Z"/>' +
          '<path id="battery-fill-1" d="M738.31,901.59c-2.14-8.67-7.2-12.62-16.19-12.65-13.69,0-27.38,0-41.07,0-11.07,0-16.85,5.73-16.86,16.71q0,28.61,0,57.22,0,28.38,0,56.76c0,11.26,5.76,17,17.06,17q35.29,0,70.61,0c11.45,0,17.76-7.95,15-19.17Q752.63,959.51,738.31,901.59Z"/>' +
        '</g>' +
      '</g>' +
      '<g id="drone">' +
        '<path id="drone-stroke" style="fill: black" d="M1016,100.89A195.55,195.55,0,0,0,895.58,46.14,194.06,194.06,0,0,0,694.15,187.08c-10.74,38.32-9.32,79.57,3.9,113.17l6.41,16.29Q690.26,328.39,676,340.22c-69.65,57.88-163.29,57.55-233-.81L441.35,338l-25.21-21.09L422.41,300c13.45-36.33,14.13-78.17,1.9-117.83-13.41-43.51-40.77-79.83-79.11-105a193.53,193.53,0,0,0-245.07,27.65A193.15,193.15,0,0,0,81.52,351.52,193.52,193.52,0,0,0,239.08,433c21.57,0,42.56-3.71,61.16-11.08l16.23-6.42,6.09,7.3,15.81,19c59.9,71.85,60,164.6.18,236.28Q328,690.69,317.43,703.32l-1.25,1.5-15.64-6.46c-32.08-13.24-72.31-15.1-110.37-5.1a191.77,191.77,0,0,0-107,73,193.67,193.67,0,0,0,140.23,307.43q8,.67,16,.67A193.7,193.7,0,0,0,426.3,931.15c10.42-38.4,8.74-79.07-4.61-111.59l-6.52-15.9q14.56-12.07,29.15-24.1c40.8-33.59,85.66-47.07,137.14-41.2,36.55,4.17,70.27,19.94,103.08,48.22,12,10.36,24.88,21.23,40.44,34.21l7,5.8H904l-33.07-40.76c-24.59-30.29-50-60.65-74.54-90L780.58,677c-58.48-70-58.54-164-.15-233.8l10.28-12.3q6.19-7.39,12.43-14.87l17.07,6.34A174.34,174.34,0,0,0,880.92,433a193.86,193.86,0,0,0,161.91-87.93C1093.41,267.73,1082.12,165,1016,100.89Z"/>' +
        `<g id="drone-fill" style="fill: ${droneColor}">` +
          '<path id="drone-fill-8" d="M741.58,274.42c6.33-4.28,6.45-9.37,6.06-16.18-.78-13.57-1.73-27.45.16-40.81,9.56-67.51,72.42-117,142-112.84,67.49,4.08,123.57,61.64,125.7,129,2.71,85.62-69.67,150.44-155.14,139.13-3.5-.47-8.6-.51-10.61,1.55-7.4,7.59-13.81,16.14-20.87,24.67,61.43,22.83,146.75,3.22,193-67.52,44-67.36,34.16-156.82-23.34-212.57C939.44,61.5,849.7,54.42,783,101.87c-68.5,48.72-83.61,133.42-61.65,189.23C728.57,285,734.66,279.11,741.58,274.42Z"/>' +
          '<path id="drone-fill-7" d="M981.84,239.81c.2-56.58-46.17-102.39-102.91-101.64-55.16.73-101.1,47.93-99.08,102.7,38.1-21.74,66.69-22.65,91-.53,32.86,29.88,32.2,64.15,8.18,99.85C934.88,341.76,981.63,295.58,981.84,239.81Z"/>' +
          '<path id="drone-fill-6" d="M291,398.67c-5.49-6.62-11.2-12.74-16-19.5-4.4-6.21-9.35-7.52-16.9-6.88-13.18,1.11-26.74,1.85-39.76,0-74.89-10.52-125.86-83.63-111.58-159,13.91-73.42,88.8-122.47,161.49-105.78,69.84,16,114.14,80.34,104.33,151.21-.49,3.58-1,8.82,1,10.77,7.79,7.71,16.57,14.42,25.37,21.82C421.42,230.7,402.89,145,331.47,98.05,264.23,53.86,174.16,64,118.14,122.15,61.46,181,54.69,270.72,101.88,337,150.51,405.33,235.33,420.72,291,398.67Z"/>' +
          '<path id="drone-fill-5" d="M610.59,560a50.59,50.59,0,1,0-51.12,50.6A50.72,50.72,0,0,0,610.59,560Z"/>' +
          '<path id="drone-fill-4" d="M584.29,713.52c44.88,5.12,82.7,24.94,116.57,54.12q19.9,17.16,40.13,34H851.47C821.84,765.08,791.55,729.1,761.39,693c-66.12-79.14-66.18-186.86-.15-265.86,30.2-36.13,60.47-72.22,90.24-108.7a48.48,48.48,0,0,0,9.87-20.41c2.89-14.75-4.53-28.41-17.16-35.51-13.38-7.51-28.31-6.12-41.16,4.52-37.09,30.7-74,61.62-111,92.39-78.67,65.37-186.4,64.95-265-.87-36.11-30.23-72.22-60.46-108.72-90.21a47.67,47.67,0,0,0-20.44-9.75c-14.81-2.8-28.3,4.67-35.36,17.41-7.27,13.13-6.08,27.91,4.13,40.28q45.3,54.88,91,109.44c67.51,81,67.57,187.48.17,268.3-30.39,36.43-60.91,72.76-91,109.45-16.92,20.64-8.48,49.56,16.28,57,13.19,3.95,24.75.32,35.22-8.45Q373.19,806,428.43,760.26C473.78,722.92,525.65,706.84,584.29,713.52ZM475.66,560.18a84.34,84.34,0,1,1,168.68.14c-.14,46.45-38.38,84.28-84.94,84C513.41,644.08,475.73,606.22,475.66,560.18Z"/>' +
          '<path id="drone-fill-3" d="M378.19,845.83c-5.71,4.07-6.38,8.63-5.94,15.26.89,13.56,1.88,27.45,0,40.81-10.5,74.72-84.2,125.86-159.2,111.22C139.43,998.75,90.8,924.21,107.59,851.46,123.66,781.8,188,737.66,259,747.3c4,.54,9.58-.13,12.12-2.6,7.23-7,13.26-15.28,19.91-23.23C239.08,700,153.57,712.32,103.31,781a168.24,168.24,0,0,0,16.76,218.86c58.21,58.35,150.4,66,217.18,18.12,69.68-49.93,83-136.06,61.32-188.91C391.7,834.78,385.29,840.79,378.19,845.83Z"/>' +
          '<path id="drone-fill-2" d="M138.19,883c1.06,57.36,51.34,102.86,108.91,98.57,53.08-4,99-54.61,92.39-101.88-41.72,22.32-70.94,20.88-95.77-4.7-24.62-25.36-25.72-56.16-2.78-95.13C184.78,777.45,137.14,825.71,138.19,883Z"/>' +
          '<path id="drone-fill-1" d="M246.36,242.42c25.62-23.48,57.2-24.16,93.52-1.42,3.81-53.65-43.88-102.43-99.59-102.84-58.68-.43-105.24,48.75-102,107.71,3,53.12,53.22,99.38,101.9,93.78C218,295.79,219.79,266.76,246.36,242.42Z"/>' +
        '</g>' +
      '</g>' +
    '</svg>'
  );
}