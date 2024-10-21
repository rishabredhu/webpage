// geometry-utils.d.ts
declare module "three/examples/jsm/utils/GeometryUtils" {
  export function hilbert3D(
    origin: THREE.Vector3,
    size: number,
    iterations: number,
    ...args: any[]
  ): THREE.Vector3[];
}
