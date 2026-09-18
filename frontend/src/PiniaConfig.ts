import { createPinia } from 'pinia';

export default class PiniaConfig {
  public static init() {
    return createPinia();
  }
}
