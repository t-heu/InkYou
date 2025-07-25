import * as tf from '@tensorflow/tfjs';
import * as tfc from '@tensorflow/tfjs-converter';

declare global {
  interface Window {
    tf: typeof tf;
    tfc: typeof tfc;
    progress: number;
    bytesUsed: number;
    mirrorPadFunc?: (input: tf.Tensor, pad_arr: number[][]) => tf.Tensor;
  }
}

let start: number = 0;

if (typeof window !== 'undefined') {
  window.tf = tf;
  window.tfc = tfc;
  window.progress = 0;
  window.bytesUsed = 0;

  tf.enableProdMode();
}

function mirrorPadFunc(input: tf.Tensor, pad_arr: number[][]): tf.Tensor {
  return tf.tidy(() => {
    for (let i = 0; i < 4; i++) {
      if (pad_arr[i][0] !== 0 || pad_arr[i][1] !== 0) {
        let slice_size = [-1, -1, -1, -1];
        slice_size[i] = pad_arr[i][0];
        let slice_begin = [0, 0, 0, 0];

        const padding_left = input.slice(slice_begin, slice_size);

        slice_size = [-1, -1, -1, -1];
        slice_size[i] = pad_arr[i][1];
        slice_begin = [0, 0, 0, 0];
        slice_begin[i] = input.shape[i] - pad_arr[i][1];

        const padding_right = input.slice(slice_begin, slice_size);

        input = tf.concat([padding_left, input, padding_right], i);
      }

      if (pad_arr[i][0] > 1 || pad_arr[i][1] > 1) {
        throw new Error(
          "Only input with no more than length one in padding is supported. We have: " +
          JSON.stringify(pad_arr)
        );
      }
    }
    return input;
  });
}

if (typeof window !== 'undefined') {
  window.mirrorPadFunc = mirrorPadFunc;
}

const progressesList: number[] = [
  0.00023367749587460492, 0.054088046653978504, 0.1804816724673639, 0.18052037621199904,
  0.2528568019649621, 0.37458444400475477, 0.39315031021211105, 0.39319017797911254,
  0.4444196766347441, 0.5207431700988491, 0.550593651422125, 0.5542242372745627,
  0.5605664132978859, 0.5806242652109398, 0.5927784050567816, 0.5962346785553008,
  0.5981026434950807, 0.5989430676647844, 0.6435568450337933, 0.6676838282371483,
  0.6684442258671517, 0.7463103400111626, 0.9019785470675509, 0.95
];

let num_called = 0;

const mirrorPad = async (node: tfc.GraphNode): Promise<tf.Tensor> => {
  let progress: number = 0.9 * (performance.now() - start) / 15463.61999999499;

  if (num_called >= progressesList.length) {
    progress = 0.95;
  } else {
    progress = progressesList[num_called];
  }
  num_called += 1;

  window.progress = progress;

  const memoryInfo = tf.memory();
  window.bytesUsed = memoryInfo.numBytes;

  await tf.nextFrame();

  if (node.attrs.mode !== "reflect") {
    throw new Error("Only reflect mode is supported. Mode: " + node.attrs.mode);
  }

  const pad_tensor = node.inputs[1];
  const input_tensor = node.inputs[0];

  if (input_tensor.shape.length === 4) {
    const pad_arr: number[][] = await pad_tensor.array() as number[][];
    return mirrorPadFunc(input_tensor, pad_arr);
  } else {
    throw new Error("Only input of rank 4 is supported. We have: " + JSON.stringify(pad_tensor.arraySync()));
  }
};

tfc.registerOp('MirrorPad', mirrorPad);

const preHeat = (): void => {
  if (typeof window === 'undefined') return;

  const model_load_start = performance.now();
  const MODEL_URL = window.location.origin + '/models/cartoon/model.json';

  tfc.loadGraphModel(MODEL_URL).then((model) => {
    //console.log("Model Loaded");
    const model_load_end = performance.now();
    //console.log(`Took ${(model_load_end - model_load_start) / 1000} s to load the model`);
    model.dispose();
  });
};

const generateImageWithTensor = async (
  resize: "s" | "m" | "l" | "full",
  fp16: boolean,
  imgTensor: tf.Tensor3D,
  modelUrl: string
): Promise<any> => {
  tf.env().set('WEBGL_FORCE_F16_TEXTURES', fp16);

  // Define tamanho alvo para redimensionamento
  let long_side_scale_size: number;
  switch (resize) {
    case "s": long_side_scale_size = 100; break;
    case "m": long_side_scale_size = 250; break;
    case "l": long_side_scale_size = 500; break;
    default: long_side_scale_size = -1;
  }

  // Carrega o modelo
  const model_load_start = performance.now();
  //const model = await tfc.loadGraphModel(MODEL_URL);
  const model = await tfc.loadGraphModel(modelUrl);

  const model_load_end = performance.now();
  //console.log("Model Loaded");
  //console.log(`Took ${(model_load_end - model_load_start) / 1000} s to load the model`);

  // Redimensiona imagem se necessário
  let inputTensor: tf.Tensor4D;
  if (long_side_scale_size !== -1) {
    const [h, w] = imgTensor.shape;
    const scale = Math.max(h, w) / long_side_scale_size;
    const newSize: [number, number] = [Math.round(h / scale), Math.round(w / scale)];
    inputTensor = tf.tidy(() => tf.image.resizeBilinear(imgTensor, newSize).expandDims(0).div(255));
  } else {
    inputTensor = tf.tidy(() => imgTensor.expandDims(0).div(255));
  }

  const start = performance.now();

  const generated = await model.executeAsync({ test: inputTensor }) as tf.Tensor;

  const end = performance.now();
  //console.log("Image Generated");
  //console.log(`Took ${(end - start) / 1000} s to generate the image`);

  inputTensor.dispose();

  // Processa o resultado
  const squeezed = generated.squeeze([0]) as tf.Tensor3D;

  // Normaliza valores [-1, 1] → [0, 1]
  const normalized = tf.tidy(() => squeezed.add(1).div(2));

  // Ajusta tamanho do canvas de saída
  squeezed.dispose();
  generated.dispose();
  window.progress = 1.0;

  return normalized
};

const base64ToTensor = (base64: string): Promise<tf.Tensor3D> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(tf.browser.fromPixels(canvas));
    };

    img.onerror = (err) => reject(err);
  });
};

export { preHeat, generateImageWithTensor, base64ToTensor };
