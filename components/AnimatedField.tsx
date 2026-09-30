"use client";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
};

// Border ki chaar lines. Focus par: upar, phir dayen, phir neeche, phir bayen.
// Blur par delay ulta hota hai, isliye wapas simatte waqt bhi smooth lagta hai.
const line =
  "pointer-events-none absolute bg-sky transition-transform duration-200 ease-out";

export default function AnimatedField({
  id, label, value, onChange, onBlur, error, type = "text", multiline, autoComplete,
}: Props) {
  const common = {
    id,
    name: id,
    value,
    placeholder: " ", // label float ke liye zaroori
    autoComplete,
    onBlur,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
  };

  const base =
    "peer block w-full bg-transparent px-5 pb-2 pt-7 text-base leading-6 text-moon placeholder-transparent outline-none focus-visible:outline-none";

  return (
    <div>
      <div
        className={`group relative overflow-hidden rounded-2xl border transition-colors ${
          error ? "border-red-500/70" : "border-moon/20"
        }`}
      >
        {multiline ? (
          <textarea rows={5} {...common} className={`${base} resize-none`} />
        ) : (
          <input type={type} {...common} className={base} />
        )}

        {/* Label: input ke baad likha hai taake peer kaam kare */}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-5 top-7 origin-left text-base leading-6 text-moon/60 transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-sky peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-75"
        >
          {label}
        </label>

        {/* Animated border */}
        <span aria-hidden="true" className={`${line} left-0 top-0 h-0.5 w-full origin-left scale-x-0 delay-[450ms] group-focus-within:scale-x-100 group-focus-within:delay-0`} />
        <span aria-hidden="true" className={`${line} right-0 top-0 h-full w-0.5 origin-top scale-y-0 delay-300 group-focus-within:scale-y-100 group-focus-within:delay-150`} />
        <span aria-hidden="true" className={`${line} bottom-0 right-0 h-0.5 w-full origin-right scale-x-0 delay-150 group-focus-within:scale-x-100 group-focus-within:delay-300`} />
        <span aria-hidden="true" className={`${line} bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 delay-0 group-focus-within:scale-y-100 group-focus-within:delay-[450ms]`} />
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 px-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}