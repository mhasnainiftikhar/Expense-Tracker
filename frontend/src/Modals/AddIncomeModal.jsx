import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

const AddIncomeModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    emoji: "💰",
    title: "",
    amount: "",
    date: "",
  });

  const [emojiOpen, setEmojiOpen] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEmojiSelect = (event, emojiObject) => {
    const chosen = emojiObject?.emoji ?? event?.emoji ?? "";
    setForm((prev) => ({ ...prev, emoji: chosen }));
    setEmojiOpen(false);
  };

  const handleSubmit = () => {
    if (!form.title || !form.amount || !form.date) {
      alert("Please fill all fields");
      return;
    }

    onSubmit({
      title: form.title,
      emoji: form.emoji,
      amount: Number(form.amount),
      date: form.date,
    });

    // Reset
    setForm({ emoji: "💰", title: "", amount: "", date: "" });
  };

  if (!open) return null;

  return (
    <>
      {/* PORTRAIT MODAL BACKGROUND */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl animate-fadeIn">

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <BsEmojiSmile className="text-xl text-gray-600" />
            <h2 className="text-xl font-semibold">Add Income</h2>
          </div>

          {/* Emoji Picker */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Icon</label>
            <div className="flex items-center gap-3">
              <div className="text-4xl">{form.emoji}</div>
              <button
                onClick={() => setEmojiOpen(true)}
                className="px-3 py-2 bg-gray-100 rounded-lg border"
              >
                Select an Emoji
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">

            <div>
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Salary"
                className="w-full border rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="e.g. 5000"
                className="w-full border rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-200">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-green-600 text-white"
            >
              Add Income
            </button>
          </div>

        </div>
      </div>

      {/* EMOJI POPUP */}
      {emojiOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-60 px-4">
          <div className="bg-white rounded-2xl p-3 shadow-xl">
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              height={350}
              width={320}
            />
            <div className="mt-2 text-right">
              <button
                onClick={() => setEmojiOpen(false)}
                className="px-3 py-2 bg-gray-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddIncomeModal;
