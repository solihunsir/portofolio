import { useState, useEffect } from "react";

const PreLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  return (
    loading && (
      <div className="w-screen h-screen fixed flex flex-col items-center justify-center bg-white z-50">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          
          <span className="text-xl font-bold text-navy">Portofolio Sholihun<span className="text-blue-600">.</span></span>
        </div>

        {/* Spinner */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin"></div>
        </div>

        <p className="mt-4 text-sm text-slate-400 font-medium">Memuat...</p>
      </div>
    )
  );
};

export default PreLoader;
