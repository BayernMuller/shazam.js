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

    // 메모리 할당
    const dataPtr = Module._malloc(rawwav.length);

    // Uint8Array 데이터를 Emscripten의 힙 메모리에 복사
    Module.HEAPU8.set(rawwav, dataPtr);

    // Emscripten을 통해 정의된 함수 호출
    const signaturePtr = Module.ccall(
        'GetSignature',    // C 함수 이름
        'string',          // 반환 타입
        ['number', 'number'], // 인자 타입
        [dataPtr, rawwav.length] // 실제 인자
    ) as string;

    // 메모리 해제
    Module._free(dataPtr);

    // 결과 반환
    return signaturePtr;
  }
}

