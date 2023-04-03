export default function playGameClickSound(): void {
  const gameClickSound = new Audio("/game-click.wav");
  gameClickSound.volume = 0.03;
  gameClickSound.play();
}
