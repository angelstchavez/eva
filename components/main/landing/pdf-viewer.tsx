"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Presentation,
} from "lucide-react";

import { cn } from "@/lib/utils";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfViewerProps = {
  src: string;
  title?: string;
};

export function PdfViewer({ src, title }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [requestedPage, setRequestedPage] = useState(1);

  const [layerAPage, setLayerAPage] = useState(1);
  const [layerBPage, setLayerBPage] = useState(1);
  const [layerAReady, setLayerAReady] = useState(false);
  const [layerBReady, setLayerBReady] = useState(false);
  const [activeLayer, setActiveLayer] = useState("a");

  const targetPageRef = useRef(1);

  const updateSize = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      setPageWidth(width);
      setPageHeight((width * 9) / 16);
    }
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  const navigateTo = useCallback(
    (target: number) => {
      if (target < 1 || target > numPages) return;
      if (target === targetPageRef.current) return;

      targetPageRef.current = target;
      setRequestedPage(target);

      if (activeLayer === "a") {
        setLayerBReady(false);
        setLayerBPage(target);
      } else {
        setLayerAReady(false);
        setLayerAPage(target);
      }
    },
    [activeLayer, numPages],
  );

  const goToPrev = useCallback(() => {
    navigateTo(targetPageRef.current - 1);
  }, [navigateTo]);

  const goToNext = useCallback(() => {
    navigateTo(targetPageRef.current + 1);
  }, [navigateTo]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToPrev, goToNext]);

  function onDocumentLoadSuccess(info: { numPages: number }) {
    setNumPages(info.numPages);
    setRequestedPage(1);
    targetPageRef.current = 1;
    setLayerAPage(1);
    setLayerBPage(1);
    setLayerAReady(false);
    setLayerBReady(false);
    setActiveLayer("a");
    setLoading(false);
    setError(false);
    updateSize();
  }

  function onDocumentLoadError() {
    setLoading(false);
    setError(true);
  }

  function handleLayerARendered() {
    setLayerAReady(true);
    if (layerAPage === targetPageRef.current) {
      setActiveLayer("a");
    }
  }

  function handleLayerBRendered() {
    setLayerBReady(true);
    if (layerBPage === targetPageRef.current) {
      setActiveLayer("b");
    }
  }

  const progress = numPages > 0 ? (requestedPage / numPages) * 100 : 0;
  const showDotNav = numPages > 0 && numPages <= 24;
  const canShowPages = pageWidth > 0 && pageHeight > 0;

  return (
    <div className="space-y-4">
      {title ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-sans text-sm font-bold text-gold">
            <FileText className="h-4 w-4 shrink-0" aria-hidden />
            {title}
          </div>
          {numPages > 0 && !error ? (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-gold/10 px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-gold">
              <Presentation className="h-3.5 w-3.5" aria-hidden />
              Modo diapositivas
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className="overflow-hidden rounded-md border border-gold/25 bg-night-deep/60"
        role="region"
        aria-roledescription="presentación"
        aria-label={title ? title : "Visor de PDF"}
      >
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden bg-white"
          style={{
            height: pageHeight > 0 ? pageHeight : undefined,
            aspectRatio: "16 / 9",
          }}
        >
          {loading && !error ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-night-deep/90">
              <Loader2 className="h-8 w-8 animate-spin text-gold" aria-hidden />
              <p className="font-serif text-sm text-sky/70">
                Preparando diapositivas…
              </p>
            </div>
          ) : null}

          {error ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <FileText className="h-10 w-10 text-sky/40" aria-hidden />
              <p className="font-serif text-base text-sky/70">
                No se pudo cargar el PDF. Puedes abrirlo en una pestaña nueva:
              </p>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gold px-5 py-2 font-sans text-sm font-bold text-night"
              >
                Abrir PDF
              </a>
            </div>
          ) : null}

          {!error && canShowPages ? (
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
              className="h-full w-full"
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out"
                  style={{
                    opacity: activeLayer === "a" && layerAReady ? 1 : 0,
                    pointerEvents: activeLayer === "a" ? "auto" : "none",
                  }}
                >
                  <Page
                    pageNumber={layerAPage}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    height={pageHeight}
                    loading={null}
                    className="select-none"
                    onRenderSuccess={handleLayerARendered}
                  />
                </div>

                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out"
                  style={{
                    opacity: activeLayer === "b" && layerBReady ? 1 : 0,
                    pointerEvents: activeLayer === "b" ? "auto" : "none",
                  }}
                >
                  <Page
                    pageNumber={layerBPage}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    height={pageHeight}
                    loading={null}
                    className="select-none"
                    onRenderSuccess={handleLayerBRendered}
                  />
                </div>

                <motion.div
                  className="absolute inset-0 touch-pan-y"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) {
                      goToNext();
                    } else if (info.offset.x > 60) {
                      goToPrev();
                    }
                  }}
                />
              </div>
            </Document>
          ) : null}

          {numPages > 0 && !error && !loading ? (
            <>
              <button
                type="button"
                onClick={goToPrev}
                disabled={requestedPage <= 1}
                aria-label="Diapositiva anterior"
                className={cn(
                  "absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border transition-colors sm:left-3 sm:h-10 sm:w-10",
                  requestedPage <= 1
                    ? "cursor-not-allowed border-gold/10 bg-night/40 text-sky/25"
                    : "border-gold/30 bg-gold/15 text-gold hover:bg-gold/25",
                )}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>

              <button
                type="button"
                onClick={goToNext}
                disabled={requestedPage >= numPages}
                aria-label="Diapositiva siguiente"
                className={cn(
                  "absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border transition-colors sm:right-3 sm:h-10 sm:w-10",
                  requestedPage >= numPages
                    ? "cursor-not-allowed border-gold/10 bg-night/40 text-sky/25"
                    : "border-gold/30 bg-gold/15 text-gold hover:bg-gold/25",
                )}
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </>
          ) : null}
        </div>

        {numPages > 0 && !error ? (
          <div className="border-t border-gold/15 bg-night-deep/95 px-4 py-4 sm:px-6">
            <div className="flex flex-col items-center gap-4">
              <p className="font-serif text-sm text-sky/80">
                Diapositiva{" "}
                <span className="font-bold text-gold">{requestedPage}</span> de{" "}
                <span className="font-bold text-gold">{numPages}</span>
              </p>

              <div
                className="flex max-w-full flex-wrap items-center justify-center gap-2"
                role="tablist"
                aria-label="Ir a diapositiva"
              >
                {showDotNav
                  ? Array.from({ length: numPages }, (_, i) => {
                      const slide = i + 1;
                      const isActive = slide === requestedPage;

                      return (
                        <button
                          key={slide}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`Ir a diapositiva ${slide}`}
                          onClick={() => navigateTo(slide)}
                          className={cn(
                            "h-2 rounded-sm transition-all",
                            isActive
                              ? "w-8 bg-gold"
                              : "w-2 bg-gold/25 hover:bg-gold/50",
                          )}
                        />
                      );
                    })
                  : (
                    <div className="h-2 w-full max-w-md overflow-hidden rounded-sm bg-gold/15">
                      <div
                        className="h-full rounded-sm bg-gold transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
              </div>

              <p className="font-serif text-xs text-sky/50">
                Usa las flechas, desliza o las teclas de dirección del teclado
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}