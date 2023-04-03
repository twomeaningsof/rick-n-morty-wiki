export default function playWelcomeSound(): void {
  const welcomeSound = new Audio("/hey-everybody.mp3");
  welcomeSound.volume = 0.03;
  welcomeSound.play();
}
