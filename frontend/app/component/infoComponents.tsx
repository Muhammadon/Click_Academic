import { RiCheckboxCircleLine, RiErrorWarningLine } from "@remixicon/react";
import { useEffect, useState } from "react";

interface Props {
  message : string,
  isSuccess : boolean,
  timers? : number;
}


export default function StatusComponent({ message, isSuccess, timers = 5000 }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Jika ada message masuk, munculkan komponen alert
    if (message) {
      setIsVisible(true);

      // Jalankan hitung mundur untuk menyembunyikan alert otomatis
      const timerId = setTimeout(() => {
        setIsVisible(false);
      }, timers);

      // ⚠️ CLEANUP FUNCTION: Menghapus timer jika komponen diunmount atau message berubah mendadak
      return () => clearTimeout(timerId);
    }
  }, [message, timers]);

  // Jika kondisi isVisible salah atau message kosong, jangan rendir apa-apa (null)
  if (!isVisible || !message) return null;

  return (
    <div
      className={`mb-6 flex items-start gap-3 rounded-2xl p-4 text-sm font-semibold border transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
        isSuccess
          ? "bg-emerald-50 text-hijau-botol border-emerald-200"
          : "bg-rose-50 text-terracotta border-rose-200"
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {isSuccess ? (
          <RiCheckboxCircleLine
            size={20}
            className="text-hijau-zamrud"
          />
        ) : (
          <RiErrorWarningLine size={20} className="text-terracotta" />
        )}
      </div>
      <div>{message}</div>
    </div>
  );
}
