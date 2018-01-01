// 100000 => 100
// 500 000 000 => 100 v40

// 500 000 000 => 100 particules v5

const flowParams = (
  value,
  maxRef = 50000000,
  minParticles = 5,
  maxParticles = 100,
  minSpeed = 1,
  maxSpeed = 4
) => {
  let nbParticles = 0;
  let speed = 1;
  if (value < maxRef / maxSpeed) {
    speed = minSpeed;
    nbParticles = Math.round(
      minParticles + (maxParticles - minParticles) * maxSpeed * value / maxRef
    );
  } else {
    nbParticles = maxParticles;
    speed = minSpeed + maxSpeed * value / maxRef - 1 / (maxSpeed - minSpeed);
  }

  return {
    speed,
    nbParticles
  };
};

export default flowParams;
