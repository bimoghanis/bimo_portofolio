import test from 'node:test';
import assert from 'node:assert/strict';
import { Euler, Vector3 } from 'three';
import { walkingDelta, canOccupy, lookAngles, arrivalPoints } from './navigation.js';

const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} should be ${expected}`);

test('diagonal walking does not move faster than forward walking', () => {
  for (const yaw of [0, Math.PI / 2, -2.3]) {
    const forward = walkingDelta(1, 0, yaw, 1 / 60);
    const diagonal = walkingDelta(1, 1, yaw, 1 / 60);
    near(Math.hypot(forward.x, forward.z), Math.hypot(diagonal.x, diagonal.z));
  }
});

test('movement stays camera-relative and a slow frame cannot cause a long jump', () => {
  const facingEast = walkingDelta(1, 0, -Math.PI / 2, 1 / 60);
  assert.ok(facingEast.x > 0); near(facingEast.z, 0);
  const stalledFrame = walkingDelta(1, 1, 0, 4, 4.2);
  assert.ok(Math.hypot(stalledFrame.x, stalledFrame.z) <= 0.168 + 1e-8);
  near(walkingDelta(0, 0, 0, 1).x, 0);
});

test('walls and furniture stop movement while clear side paths stay usable', () => {
  const furniture = [{ x: 0, z: -3.5, w: 2.38, d: 0.955 }];
  assert.equal(canOccupy(0, -3.5, furniture), false);
  assert.equal(canOccupy(0, -2.4, furniture), true);
  assert.equal(canOccupy(2.5, -3.5, furniture), true);
  for (const [x, z] of [[5.7, 0], [-5.7, 0], [0, 4.7], [0, -4.7]]) assert.equal(canOccupy(x, z, furniture), false);
  let position = { x: 0, z: 0 };
  for (let frame = 0; frame < 300; frame++) {
    const delta = walkingDelta(1, 0, 0, 1 / 60);
    if (canOccupy(position.x, position.z + delta.z, furniture)) position.z += delta.z;
  }
  assert.ok(position.z >= -2.545, 'cannot pass through the desk');
});

test('travel orientations actually point Three.js cameras at the destination', () => {
  const target = [0.2, 2.2, -3];
  for (const arrival of Object.values(arrivalPoints)) {
    assert.equal(canOccupy(arrival[0], arrival[2], []), true);
    const { yaw, pitch } = lookAngles(arrival, target);
    const direction = new Vector3(0, 0, -1).applyEuler(new Euler(pitch, yaw, 0, 'YXZ'));
    const expected = new Vector3(...target).sub(new Vector3(...arrival)).normalize();
    near(direction.dot(expected), 1);
  }
});
