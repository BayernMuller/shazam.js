import EventEmitter from 'events';
import Module from './vibra'

export class Vibra extends EventEmitter {
  public initialized = false;

  constructor() {
    super();
    Module.onRuntimeInitialized = () => {
      this.initialized = true;
      this.emit('initialized');
    };
  }

  getSignature(rawwav: Uint8Array): string {
    if (!this.initialized) {
      throw new Error('Vibra not initialized');
    }

    const dataPtr = Module._malloc(rawwav.length);
    Module.HEAPU8.set(rawwav, dataPtr);

    const signaturePtr = Module.ccall(
        'GetSignature',
        'string',
        ['number', 'number'],
        [dataPtr, rawwav.length]
    ) as string;

    Module._free(dataPtr);
    return signaturePtr;
  }
}

