import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { Loader2, FileText, AlertCircle } from 'lucide-react';

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const PdfThumbnail = ({ url }) => {
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let renderTask = null;
        let loadingTask = null;

        const renderThumbnail = async () => {
            if (!url) return;
            setLoading(true);
            setError(false);

            try {
                loadingTask = pdfjsLib.getDocument({
                    url: url,
                    // Security and compatibility settings
                    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/cmaps/',
                    cMapPacked: true,
                    standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.624/standard_fonts/',
                    // This can help with some CORS issues in specific browser configs
                    isEvalSupported: false,
                });

                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);

                const viewport = page.getViewport({ scale: 1.0 });
                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext('2d', { alpha: false });

                // Optimized scale for grid display
                const width = 600;
                const scale = width / viewport.width;
                const scaledViewport = page.getViewport({ scale });

                canvas.width = scaledViewport.width;
                canvas.height = scaledViewport.height;

                if (isMounted) {
                    renderTask = page.render({
                        canvasContext: context,
                        viewport: scaledViewport,
                    });

                    await renderTask.promise;
                    if (isMounted) setLoading(false);
                }
            } catch (err) {
                console.error('PDF Thumbnail Error:', err);
                if (isMounted) {
                    setError(true);
                    setLoading(false);
                }
            }
        };

        renderThumbnail();

        return () => {
            isMounted = false;
            if (renderTask) renderTask.cancel();
            if (loadingTask) loadingTask.destroy();
        };
    }, [url]);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-slate-50 overflow-hidden group">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm z-10 transition-opacity">
                    <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
                </div>
            )}

            {error ? (
                <div className="flex flex-col items-center gap-3 text-slate-300 p-8 text-center animate-in fade-in duration-500">
                    <div className="p-4 bg-slate-100 rounded-full">
                        <AlertCircle className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                        <span className="block text-xs font-black uppercase tracking-widest text-slate-400">Preview Failed</span>
                        <span className="block text-[10px] text-slate-400 font-medium">Document might be protected or server blocked access</span>
                    </div>
                </div>
            ) : (
                <canvas
                    ref={canvasRef}
                    className={`w-full h-full object-cover transition-all duration-1000 ${loading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0 shadow-2xl'}`}
                />
            )}
        </div>
    );
};
