export default function playSciFiSound(): void {
  const sciFiSound = new Audio("/sci-fi.wav");
  sciFiSound.volume = 0.03;
  sciFiSound.play();
}
