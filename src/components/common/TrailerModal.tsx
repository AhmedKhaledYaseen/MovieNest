import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface TrailerModalProps {
  videoKey: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TrailerModal({ videoKey, isOpen, onClose }: TrailerModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] sm:w-full p-0 bg-black border-0 overflow-hidden" aria-describedby={undefined}>
        <DialogTitle className="sr-only">Video Trailer</DialogTitle>
        <DialogDescription className="sr-only">YouTube video player</DialogDescription>
        <div className="relative pt-[56.25%] w-full">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
