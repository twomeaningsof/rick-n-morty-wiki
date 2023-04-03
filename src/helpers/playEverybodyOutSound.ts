export default function playEverybodyOutSound(): void {
  const everybodyOutSound = new Audio("/everybody-out.mp3");
  everybodyOutSound.volume = 0.03;
  everybodyOutSound.play();
}
