export default function playSwitchSound(): void {
  const switchSound = new Audio("/switch.mp3");
  switchSound.volume = 0.03;
  switchSound.play();
}
