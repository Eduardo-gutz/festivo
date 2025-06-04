interface IconButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

export default function IconButton({ icon, label, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-24 flex-col items-center gap-1 rounded-lg border border-primary bg-background px-4 py-3 transition-all hover:border-secondary"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
} 