import NPC from './NPC.jsx'
import { Vector3 } from 'three'

export default class Guide extends NPC {
  constructor(scene) {
    super(scene, new Vector3(-2, 0.75, -2), 'pink')
  }
}
