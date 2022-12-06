export type FabiconProps = {
  onClick?: () => void;
};

export default function FabIcon({ onClick }: FabiconProps) {
  return (
    <button
      type="button"
      className="fixed z-90 bottom-10 right-8 bg-gray-800 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-gray-900 hover:drop-shadow-2xl"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-11 h-11"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
}
