
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nftName?: string;
  mode?: 'success' | 'confirm';
  nftNumber?: number;
  totalNfts?: number;
  costPerNft?: number;
  isProcessing?: boolean;
  onConfirm?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ 
  open, 
  onOpenChange, 
  nftName,
  mode = 'success',
  nftNumber = 1,
  totalNfts = 1,
  costPerNft = 0,
  isProcessing = false,
  onConfirm
}) => {
  if (mode === 'confirm') {
    return (
      <Dialog open={open} onOpenChange={() => !isProcessing && onOpenChange(false)}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-green-400 text-xl">
              Confirm Mint #{nftNumber} of {totalNfts}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4 space-y-4">
            <img
              src="https://blinkyonsol.com/wp-content/uploads/2025/04/Blinky-OG-VIP-4K-1.png"
              alt="Blinky OG VIP"
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div className="text-center space-y-2">
              <p className="text-green-400">
                Ready to mint NFT #{nftNumber}
              </p>
              <p className="text-white text-sm">
                Cost: {costPerNft} BLINKY tokens
              </p>
              <p className="text-gray-400 text-sm">
                This will be sent immediately after confirmation
              </p>
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={onConfirm}
                disabled={isProcessing}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                {isProcessing ? 'Processing...' : 'Confirm Mint'}
              </Button>
              <Button 
                onClick={() => onOpenChange(false)}
                disabled={isProcessing}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-green-400 text-xl">
            NFT Minted Successfully!
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <video
            src="https://gateway.irys.xyz/NGY5Uo_lDb4F4PBHoMN8WsYwh0A6n7FMElVJh6P9mL4?ext=mp4"
            autoPlay
            loop
            muted
            className="w-48 h-auto rounded-lg mb-4"
          />
          <p className="text-green-400 text-center">
            Congratulations! You've minted a {nftName}!
          </p>
          <Button 
            className="mt-4 bg-green-500 hover:bg-green-600 text-white"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;