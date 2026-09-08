export const roomBounds = { x: 5.7, z: 4.7 };
export const arrivalPoints = {
  about: [-3.6, 1.7, -2.8],
  projects: [-1.05, 1.65, -1.4],
  experience: [3.5, 1.7, -2.8],
  certificates: [3.6, 1.7, -0.3],
  skills: [-2, 1.7, 2.75],
  arcade: [-2.8, 1.65, -0.15],
  contact: [3.2, 1.65, 0.9],
};
export function canOccupy(x, z, colliders) {
  return Math.abs(x) < roomBounds.x && Math.abs(z) < roomBounds.z &&
    !colliders.some(b => Math.abs(x - b.x) < b.w && Math.abs(z - b.z) < b.d);
}
export function walkingDelta(forward, strafe, yaw, dt, speed = 2.6) {
  const scale = speed * Math.min(Math.max(dt, 0), 0.04) / (Math.hypot(forward, strafe) || 1);
  return {
    x: (-Math.sin(yaw) * forward + Math.cos(yaw) * strafe) * scale,
    z: (-Math.cos(yaw) * forward - Math.sin(yaw) * strafe) * scale,
  };
}
export function lookAngles(from, to) {
  const dx = to[0] - from[0], dy = to[1] - from[1], dz = to[2] - from[2];
  return { yaw: Math.atan2(-dx, -dz), pitch: Math.atan2(dy, Math.hypot(dx, dz)) };
}
