import { useState, useImperativeHandle, forwardRef } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";



const SpinnerModal = forwardRef((_, ref) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [hasError, setError] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        startLoading: () => {
          setLoading(true);
          setOpen(true);
        },
        stopLoading: (resultHasError:boolean)=>{
            setError(resultHasError);
            setLoading(false);
            setTimeout(()=>{setOpen(false)},1500);
        }
      }));

  return (
    <>
    {isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        {isLoading && (
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        )}

       {!isLoading && !hasError && (
          <CheckCircleIcon className="h-10 w-10 text-green-500" />
        )}
        {!isLoading && hasError && (
          <XCircleIcon className="h-10 w-10 text-red-500" />
        )}
        <p className="mt-4 text-lg font-medium">
          {isLoading ? "Processing..." : !hasError ? "Success!" : "Failed!"}
        </p>
      </div>
    </div>)}
    </>
  );
});

export default SpinnerModal;
