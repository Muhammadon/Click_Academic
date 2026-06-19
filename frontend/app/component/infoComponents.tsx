import { RiCheckboxCircleLine, RiErrorWarningLine } from "@remixicon/react";

interface Props {
  message : string,
  isSuccess : boolean,
}


export function StatusComponent ({message , isSuccess} : Props){

  return <>
  {message && (
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
            )}



  </>


}

