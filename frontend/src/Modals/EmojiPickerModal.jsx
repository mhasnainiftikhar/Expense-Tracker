import React from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerModal = ({ open, onClose, onSelect }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-4 shadow-xl">
        <EmojiPicker
          height={350}
          width={300}
          onEmojiClick={(emoji) => {
            onSelect(emoji.emoji);
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default EmojiPickerModal;
