interface WeatherData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

const changeBg = (imagePath: string, color: string) => {
  document.documentElement.style.setProperty('--accent', `var(--${color})`);
  document.body.style.background = `url(${imagePath}) no-repeat center center`;
  document.body.style.backgroundSize = 'cover';
}

const changeDefaultBg = () => {
  const defaultBg = localStorage.getItem('defaultBg') || '4';
  if (Number(defaultBg) == -1) {
    const newDefaultBg = Math.floor(Math.random() * 6).toString();
    localStorage.setItem('defaultBg', newDefaultBg);
  }
  const imagePath = `./img/default/img${defaultBg}.jpg`;
  const color = `img${defaultBg}`

  changeBg(imagePath, color)
}

const changeDynamicBg = (data: WeatherData) => {
  let imagePath, color;
  let status = localStorage.getItem('dynamicBg') || 'ON';
  if(status === 'OFF') return;

  let dynamicBg = data.weather[0].main.toLowerCase();
  let day_night = data.weather[0].icon[2];

  if(
    dynamicBg === 'clear' ||
    dynamicBg === 'clouds' ||
    dynamicBg === 'rain' ||
    dynamicBg === 'snow'
  ) {
    imagePath = `./img/weather/${day_night}-${dynamicBg}.jpg`;
    color = `${day_night}-${dynamicBg}`;
  } else {
    if(dynamicBg == 'sand' || dynamicBg == 'ash') 
      dynamicBg = 'dust';
    
    imagePath = `./img/weather/${dynamicBg}.jpg`;
    color = `${dynamicBg}`;
  }
  changeBg(imagePath, color);
}

export { changeDefaultBg, changeDynamicBg }