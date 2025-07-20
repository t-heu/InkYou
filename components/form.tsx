"use client"

import * as tf from '@tensorflow/tfjs';
import { useTranslations } from 'next-intl'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { generateImageWithTensor, base64ToTensor } from "../helpers/generateImage";
import { modelExists } from "../helpers/modelExist";

import { styles } from "../constants/styles";

enum GenerationStatus {
  Idle = 0,
  Generating = 1,
  Done = 2
}

export default function Form() {
  const t = useTranslations();

  const [uploadedImageURL, setUploadedImageURL] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  );
  const [uploaded, setUploaded] = useState(false);
  const [fp16, setFp16] = useState(0);
  const [resize, setResize] = useState("none");
  const [generationStatus, setGenerationStatus] = useState<any>(GenerationStatus.Idle);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [bytesUsed, setBytesUsed] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('cartoon');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImageURL(reader.result as string);
      setUploaded(true);
    };
    reader.readAsDataURL(file);
  };

  const generate = async () => {
    if (generationStatus !== GenerationStatus.Idle) return;

    if (!uploaded) {
      alert("Please upload an image.");
      return;
    }

    if (resize === "none") {
      alert("Please select a resize method.");
      return;
    }

    const updateInterval = setInterval(() => {
      setGenerationProgress((window as any).progress * 100);
      setBytesUsed((window as any).bytesUsed);

      if (generationStatus !== 1) {
        clearInterval(updateInterval);
      }
    }, 500);

    setGenerationStatus(GenerationStatus.Generating); // status = 1
    try {
      const imgTensor = await base64ToTensor(uploadedImageURL);

      const baseModelUrl = window.location.origin + `/models/${selectedStyle}/model.json`;

      await modelExists(baseModelUrl);

      await new Promise((resolve) => requestAnimationFrame(resolve));

      const outputTensor = await generateImageWithTensor(
        resize as "s" | "m" | "l" | "full", 
        fp16 === 1, 
        imgTensor,
        baseModelUrl
      );

      imgTensor.dispose();

      // ✅ Agora marcamos como "Done", liberando a exibição do canvas
      setGenerationStatus(GenerationStatus.Done);

      // ✅ Esperamos a renderização do canvas
      await new Promise((resolve) => requestAnimationFrame(resolve));

      // ✅ Agora o canvas está visível, podemos desenhar nele
      const outputCanvas = document.getElementById("output") as HTMLCanvasElement;
      if (!outputCanvas) {
        throw new Error("Canvas com id 'output' não encontrado no DOM.");
      }

      outputCanvas.width = outputTensor.shape[1];
      outputCanvas.height = outputTensor.shape[0];

      await tf.browser.toPixels(outputTensor, outputCanvas);

      outputTensor.dispose();
    } catch (error) {
      let message = "Erro desconhecido.";
  
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else if (error && typeof error === "object" && "message" in error) {
        message = String((error as any).message);
      }

      alert("Error encountered while generating image: " + message);
      setGenerationStatus(GenerationStatus.Idle);
    } finally {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  return (
    <section id="upload" className="w-full py-12 md:py-32 bg-veo-bg">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
            {t('form_title')}
          </h2>
          <p className="text-gray-400 text-lg">
            {t('form_desc')}
          </p>
        </div>

        {generationStatus === 0 && (
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              generate();
            }}
          >
            <input
              id="picture"
              type="file"
              accept="image/*"
              onChange={onUpload}
              className="w-full bg-veo-card text-white border border-gray-700 placeholder:text-gray-400 rounded-lg h-14 py-2 px-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90 file:cursor-pointer"
            />

            {uploaded && (
              <img
                id="uploaded-image"
                src={uploadedImageURL}
                alt="Uploaded preview"
                className="w-full max-w-md mx-auto my-4 rounded shadow"
              />
            )}

            <div className="my-4 text-left">
              <label className="block mb-2 font-medium text-white">
                {t('form_opt_resize')}
              </label>
              <select
                className="p-2 border rounded w-full text-black"
                value={resize}
                onChange={(e) => setResize(e.target.value)}
              >
                <option value="none" disabled>
                  {t('form_opt_resize_op_default')}
                </option>
                <option value="s">{t('form_opt_resize_op_s')}</option>
                <option value="m">{t('form_opt_resize_op_m')}</option>
                <option value="l">{t('form_opt_resize_op_l')}</option>
                <option value="original">{t('form_opt_resize_op_orign')}</option>
              </select>
            </div>

            <div className="my-4 text-left">
              <label className="block mb-2 font-medium text-white">
                {t('form_opt_fp16')}
              </label>
              <select
                className="p-2 border rounded w-full text-black"
                value={fp16}
                onChange={(e) => setFp16(parseInt(e.target.value))}
              >
                <option value={0}>{t('form_opt_fp16_1')}</option>
                <option value={1}>{t('form_opt_fp16_2')}</option>
              </select>
            </div>

            <select
              className="p-2 border rounded w-full text-black"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              {styles.map((style) => (
                <option key={style.link} value={style.type}>
                  {t(style.name)} - {t(style.desc)}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-lg h-12 text-base font-medium transition-colors duration-200"
              disabled={!uploaded}
            >
              {t('form_btn')}
            </button>
          </form>
        )}

        {generationStatus === 1 && (
          <div className="mt-10 w-full max-w-xl text-center text-white">
            <div className="w-full bg-gray-300 rounded h-6 overflow-hidden">
              <div
                className="bg-primary h-6"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <p className="mt-2">Gerando imagem...</p>
            <p className="text-sm text-gray-300">
              Isso pode levar 15–30 segundos. Memória usada:{" "}
              {(bytesUsed / 1000000).toFixed(2)} MB
            </p>
          </div>
        )}

        {generationStatus === 2 && (
          <div className="mt-10 text-center text-white">
            <canvas
              id="output"
              className="mx-auto border-2 rounded shadow border-primary"
              width={512}
              height={512}
            />
            <div className="mt-6">
              <p>{t('form_save_p')}</p>
              <button
                className="mt-4 bg-gray-800 text-white hover:bg-gray-800/60 px-4 py-2 rounded"
                onClick={() => {
                  setGenerationStatus(0);
                  setUploaded(false);
                  setUploadedImageURL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
                  setResize("none");
                  setFp16(0);
                  setGenerationProgress(0);
                  setBytesUsed(0);
                }}
              >
                {t('form_reset_btn')}
              </button>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-8">
          {t('form_terms')}{" "}
          <Link href="/terms" className="text-primary hover:text-primary/80 underline">
            {t('footer_terms')}
          </Link>
        </p>
      </div>
    </section>
  );
}
